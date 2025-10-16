#!/usr/bin/env node

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const aiContextDir = path.join(cwd, 'ai-context');
const modeFile = path.join(aiContextDir, '.mode');

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

const command = process.argv[2];
const value = process.argv[3];

async function ensureAiContext() {
  try {
    await mkdir(aiContextDir, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }
}

async function getMode() {
  try {
    const mode = await readFile(modeFile, 'utf8');
    return mode.trim();
  } catch {
    return 'safe'; // Default to safe mode
  }
}

async function setMode(mode) {
  await ensureAiContext();
  await writeFile(modeFile, mode);
}

async function check(context = {}) {
  const mode = await getMode();
  
  // If this is a block situation, show specific guidance
  if (context.blocked) {
    console.log(`
${colors.bright}${colors.yellow}⚠️  AI Safety Block${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.red}Blocked:${colors.reset} ${context.reason || 'Change violates safety rules'}
${colors.yellow}Current Mode:${colors.reset} ${mode.toUpperCase()}

${colors.bright}Why this was blocked:${colors.reset}
`);
    
    if (context.type === 'file-count') {
      console.log(`  • You tried to change ${context.count} files
  • Safe mode allows maximum 3 files
  • This protects against accidental mass changes\n`);
      console.log(`${colors.green}To proceed:${colors.reset}
  1. Break changes into smaller chunks (3 files max)
  2. Or switch to standard mode: ${colors.cyan}npm run ai:standard${colors.reset}
  3. Or add flag: ${colors.cyan}--confirm=multiple-files${colors.reset}\n`);
    } else if (context.type === 'protected-file') {
      console.log(`  • File is protected in ${mode} mode
  • Protected: ${context.file}
  • This prevents breaking core functionality\n`);
      console.log(`${colors.green}To proceed:${colors.reset}
  1. Copy the pattern instead of modifying it
  2. Or switch mode: ${colors.cyan}npm run ai:unrestricted${colors.reset}
  3. Or add flag: ${colors.cyan}--confirm=protected${colors.reset}\n`);
    } else if (context.type === 'dependencies') {
      console.log(`  • Package.json changes require confirmation
  • This prevents unexpected dependency issues\n`);
      console.log(`${colors.green}To proceed:${colors.reset}
  1. Review the dependency changes carefully
  2. Add flag: ${colors.cyan}--confirm=dependencies${colors.reset}
  3. Or manually edit package.json\n`);
    }
    
    console.log(`${colors.cyan}📚 Learn more:${colors.reset} Check ${colors.bright}ai-context/ERRORS_AND_FIXES.md${colors.reset}
${colors.gray}For help: npm run help${colors.reset}\n`);
    return;
  }
  
  // Normal check display
  console.log(`
${colors.bright}${colors.blue}🤖 AI Safety Check${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

Current Mode: ${colors.bright}${mode === 'safe' ? colors.green : colors.yellow}${mode.toUpperCase()}${colors.reset}

${colors.bright}Mode Details:${colors.reset}
`);

  if (mode === 'safe') {
    console.log(`  ${colors.green}✅${colors.reset} Protected files cannot be modified
  ${colors.green}✅${colors.reset} Maximum 3 files can be changed at once
  ${colors.green}✅${colors.reset} Tests required for changes
  ${colors.green}✅${colors.reset} Perfect for beginners\n`);
  } else if (mode === 'standard') {
    console.log(`  ${colors.yellow}⚡${colors.reset} Config changes need confirmation
  ${colors.yellow}⚡${colors.reset} Maximum 20 files can be changed
  ${colors.yellow}⚡${colors.reset} Good for regular development\n`);
  } else {
    console.log(`  ${colors.red}🚀${colors.reset} No restrictions
  ${colors.red}🚀${colors.reset} Full access to all files
  ${colors.red}🚀${colors.reset} Use with caution\n`);
  }

  console.log(`${colors.gray}To change mode: npm run ai:safe (or ai:standard, ai:unrestricted)${colors.reset}\n`);
}

// Helper function to simulate a block (for demonstration)
async function simulateBlock(type) {
  const contexts = {
    'files': {
      blocked: true,
      type: 'file-count',
      count: 5,
      reason: 'Too many files changed at once'
    },
    'protected': {
      blocked: true,
      type: 'protected-file',
      file: 'src/examples/01-Counter/Counter.tsx',
      reason: 'Attempting to modify protected example file'
    },
    'deps': {
      blocked: true,
      type: 'dependencies',
      reason: 'Package.json modification requires confirmation'
    }
  };
  
  await check(contexts[type] || {});
}

// Check staged files and enforce limits
async function checkStagedFiles() {
  const mode = await getMode();
  
  try {
    // Get staged files
    const { execSync } = await import('child_process');
    const stagedOutput = execSync('git diff --name-only --cached', { encoding: 'utf8' });
    const stagedFiles = stagedOutput.split('\n').filter(Boolean);
    
    if (mode === 'safe' && stagedFiles.length > 3) {
      await check({
        blocked: true,
        type: 'file-count',
        count: stagedFiles.length,
        reason: `Attempting to change ${stagedFiles.length} files (max 3 in safe mode)`
      });
      return false;
    }
    
    // Check for protected files in safe mode
    if (mode === 'safe') {
      const protectedPatterns = [
        /^src\/examples\//,
        /^src\/patterns\//,
        /^scripts\//,
        /\.config\./
      ];
      
      for (const file of stagedFiles) {
        if (protectedPatterns.some(pattern => pattern.test(file))) {
          await check({
            blocked: true,
            type: 'protected-file',
            file,
            reason: `Protected file modification attempted`
          });
          return false;
        }
      }
    }
    
    return true;
  } catch (error) {
    // Not in a git repo or no staged files
    return true;
  }
}

// Main execution
(async () => {
  try {
    if (command === 'set-mode' && value === 'safe') {
      await setMode('safe');
      console.log(`${colors.bright}${colors.green}✅ AI Safety Mode: SAFE (Learning Mode)${colors.reset}`);
      console.log(`${colors.gray}Your code is protected. Maximum 3 files can be changed at once.${colors.reset}\n`);
    } else if (command === 'set-mode' && value === 'standard') {
      await setMode('standard');
      console.log(`${colors.bright}${colors.yellow}⚡ AI Safety Mode: STANDARD${colors.reset}`);
      console.log(`${colors.gray}Balanced protection. Config changes need confirmation.${colors.reset}\n`);
    } else if (command === 'set-mode' && value === 'unrestricted') {
      await setMode('unrestricted');
      console.log(`${colors.bright}${colors.red}🚀 AI Safety Mode: UNRESTRICTED${colors.reset}`);
      console.log(`${colors.gray}No restrictions. Use with caution!${colors.reset}\n`);
    } else if (command === 'check') {
      await check();
    } else if (command === 'validate') {
      // Validate staged files
      const isValid = await checkStagedFiles();
      process.exit(isValid ? 0 : 1);
    } else {
      console.log(`${colors.red}Unknown command: ${command} ${value || ''}${colors.reset}`);
      console.log(`Usage: 
  npm run ai:safe    - Set safe mode
  npm run ai:check   - Check current mode\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
})();