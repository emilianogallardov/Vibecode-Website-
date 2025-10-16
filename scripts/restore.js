#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const backupsDir = path.join(projectRoot, '.backups');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function restoreCheckpoint() {
  try {
    // Check if backups directory exists
    if (!existsSync(backupsDir)) {
      console.log(`${colors.yellow}No checkpoints found.${colors.reset}`);
      console.log(`${colors.gray}Create one with: npm run checkpoint${colors.reset}`);
      process.exit(0);
    }

    // Get list of checkpoints
    const files = await readdir(backupsDir);
    const checkpoints = files
      .filter(f => f.endsWith('.zip'))
      .sort()
      .reverse();

    if (checkpoints.length === 0) {
      console.log(`${colors.yellow}No checkpoints found.${colors.reset}`);
      console.log(`${colors.gray}Create one with: npm run checkpoint${colors.reset}`);
      process.exit(0);
    }

    // Display available checkpoints
    console.log(`${colors.blue}${colors.bright}📂 Available checkpoints:${colors.reset}\n`);
    
    for (let i = 0; i < checkpoints.length; i++) {
      const checkpoint = checkpoints[i];
      const metadataPath = path.join(backupsDir, `${checkpoint}.json`);
      
      let metadata = { date: 'Unknown', size: 'Unknown' };
      if (existsSync(metadataPath)) {
        const metadataContent = await readFile(metadataPath, 'utf-8');
        metadata = JSON.parse(metadataContent);
      }
      
      console.log(`  ${colors.cyan}${i + 1}.${colors.reset} ${checkpoint}`);
      console.log(`     ${colors.gray}Date: ${metadata.date}${colors.reset}`);
      console.log(`     ${colors.gray}Size: ${metadata.size}${colors.reset}\n`);
    }

    // Ask user to select
    const answer = await prompt(
      `${colors.yellow}Select checkpoint to restore (1-${checkpoints.length}) or 'q' to quit: ${colors.reset}`
    );

    if (answer.toLowerCase() === 'q') {
      console.log(`${colors.gray}Restore cancelled.${colors.reset}`);
      process.exit(0);
    }

    const selection = parseInt(answer);
    if (isNaN(selection) || selection < 1 || selection > checkpoints.length) {
      console.log(`${colors.red}Invalid selection.${colors.reset}`);
      process.exit(1);
    }

    const selectedCheckpoint = checkpoints[selection - 1];
    const backupPath = path.join(backupsDir, selectedCheckpoint);

    // Confirm restoration
    const confirm = await prompt(
      `${colors.yellow}${colors.bright}⚠️  This will replace your current files. Continue? (y/N): ${colors.reset}`
    );

    if (confirm.toLowerCase() !== 'y') {
      console.log(`${colors.gray}Restore cancelled.${colors.reset}`);
      process.exit(0);
    }

    console.log(`${colors.blue}${colors.bright}♻️  Restoring from ${selectedCheckpoint}...${colors.reset}`);

    // Normalize paths for cross-platform compatibility
    const isWindows = os.platform() === 'win32';
    const normalizeForTar = (p) => isWindows ? p.split(path.sep).join('/') : p;

    // Create a temporary backup of current state
    const tempBackup = path.join(backupsDir, 'temp-before-restore.zip');
    const normalizedTempBackup = normalizeForTar(tempBackup);
    const normalizedProjectRoot = normalizeForTar(projectRoot);
    const normalizedBackupPath = normalizeForTar(backupPath);
    
    execSync(
      `tar -czf "${normalizedTempBackup}" --exclude=node_modules --exclude=.git --exclude=dist --exclude=.backups -C "${normalizedProjectRoot}" .`,
      { stdio: 'pipe', shell: true }
    );

    // Extract the backup
    execSync(`tar -xzf "${normalizedBackupPath}" -C "${normalizedProjectRoot}"`, { stdio: 'pipe', shell: true });

    console.log(`${colors.green}${colors.bright}✅ Checkpoint restored successfully!${colors.reset}`);
    console.log(`${colors.gray}   From: ${selectedCheckpoint}${colors.reset}`);
    console.log(`${colors.gray}   Temp backup of previous state: .backups/temp-before-restore.zip${colors.reset}\n`);
    
    console.log(`${colors.yellow}Next steps:${colors.reset}`);
    console.log(`  1. Run ${colors.cyan}npm install${colors.reset} to restore dependencies`);
    console.log(`  2. Run ${colors.cyan}npm run dev${colors.reset} to start development`);

  } catch (error) {
    console.error(`${colors.bright}${colors.red}❌ Failed to restore checkpoint${colors.reset}`);
    console.error(`${colors.gray}${error.message}${colors.reset}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the restore
restoreCheckpoint();