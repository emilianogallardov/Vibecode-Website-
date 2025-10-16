#!/usr/bin/env node

import { execSync } from 'child_process';
import { mkdir, readdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const backupsDir = path.join(projectRoot, '.backups');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

async function createCheckpoint() {
  try {
    // Create backups directory if it doesn't exist
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true });
    }

    // Generate timestamp for backup name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupName = `checkpoint-${timestamp}.zip`;
    const backupPath = path.join(backupsDir, backupName);

    console.log(`${colors.blue}${colors.bright}📦 Creating checkpoint...${colors.reset}`);

    // Create zip archive excluding node_modules and other large/unnecessary files
    const excludeArgs = [
      '--exclude=node_modules',
      '--exclude=.git',
      '--exclude=dist',
      '--exclude=.backups',
      '--exclude=*.log',
      '--exclude=.DS_Store',
    ].join(' ');

    // Use tar to create a zip (works on all platforms Node supports)
    // On Windows, use forward slashes for tar command
    const normalizedBackupPath = backupPath.split(path.sep).join('/');
    const normalizedProjectRoot = projectRoot.split(path.sep).join('/');
    
    const isWindows = os.platform() === 'win32';
    const command = isWindows
      ? `tar -czf "${normalizedBackupPath}" ${excludeArgs} -C "${normalizedProjectRoot}" .`
      : `tar -czf "${backupPath}" ${excludeArgs} -C "${projectRoot}" .`;
    
    execSync(command, { stdio: 'pipe', shell: true });

    // Get file size
    const stats = await import('fs').then(fs => 
      fs.promises.stat(backupPath)
    );
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    // Create metadata file
    const metadataPath = path.join(backupsDir, `${backupName}.json`);
    await writeFile(metadataPath, JSON.stringify({
      timestamp,
      date: new Date().toLocaleString(),
      size: `${sizeMB} MB`,
      name: backupName,
    }, null, 2));

    console.log(`${colors.green}${colors.bright}✅ Checkpoint created successfully!${colors.reset}`);
    console.log(`${colors.gray}   Name: ${backupName}${colors.reset}`);
    console.log(`${colors.gray}   Size: ${sizeMB} MB${colors.reset}`);
    console.log(`${colors.gray}   Path: .backups/${backupName}${colors.reset}\n`);
    
    // List recent checkpoints
    const files = await readdir(backupsDir);
    const checkpoints = files
      .filter(f => f.endsWith('.zip'))
      .sort()
      .reverse()
      .slice(0, 5);

    if (checkpoints.length > 1) {
      console.log(`${colors.yellow}Recent checkpoints:${colors.reset}`);
      checkpoints.forEach((cp, i) => {
        console.log(`  ${i + 1}. ${cp}`);
      });
      console.log(`\n${colors.gray}To restore: npm run restore${colors.reset}`);
    }

  } catch (error) {
    console.error(`${colors.bright}${colors.red}❌ Failed to create checkpoint${colors.reset}`);
    console.error(`${colors.gray}${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run the checkpoint
createCheckpoint();