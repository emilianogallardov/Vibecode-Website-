#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const showAdvanced = process.argv.includes('--advanced');

console.log(`
${colors.bright}${colors.blue}🚀 Vibecode Template - Beginner Commands${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.bright}${colors.green}Getting Started:${colors.reset}
  ${colors.cyan}npm run dev${colors.reset}        Start development server
  ${colors.cyan}npm run test${colors.reset}       Run tests
  ${colors.cyan}npm run build${colors.reset}      Build for production

${colors.bright}${colors.green}Fix Issues:${colors.reset}
  ${colors.cyan}npm run fix${colors.reset}        Auto-fix code issues
  ${colors.cyan}npm run check${colors.reset}      Check for problems
  ${colors.cyan}npm run format${colors.reset}     Format your code

${colors.bright}${colors.green}AI Assistant:${colors.reset}
  ${colors.cyan}npm run ai:safe${colors.reset}    Enable safe mode (recommended)
  ${colors.cyan}npm run ai:check${colors.reset}   Check AI changes

${colors.bright}${colors.green}Help:${colors.reset}
  ${colors.cyan}npm run help${colors.reset}       Show this help
  ${colors.cyan}npm run help -- --advanced${colors.reset}   Show advanced commands

${colors.bright}${colors.yellow}📚 What to do next:${colors.reset}
  1. Run ${colors.cyan}npm run dev${colors.reset} to see your app
  2. Edit ${colors.cyan}src/app/pages/HomePage.tsx${colors.reset}
  3. Changes appear instantly!

${colors.gray}Need more help? Check out the docs/ folder${colors.reset}

${colors.bright}${colors.green}➜ Next step:${colors.reset} Run ${colors.cyan}npm run check${colors.reset} to verify your setup, then explore ${colors.cyan}src/examples/01-Counter${colors.reset}
`);

if (showAdvanced) {
  try {
    const advancedPath = path.join(__dirname, 'advanced.json');
    const advancedData = JSON.parse(fs.readFileSync(advancedPath, 'utf8'));
    
    console.log(`
${colors.bright}${colors.yellow}Advanced Commands:${colors.reset}
  ${colors.cyan}npm run typecheck${colors.reset}     Check TypeScript types
  ${colors.cyan}npm run lint${colors.reset}          Run ESLint
  ${colors.cyan}npx node scripts/checkpoint.js${colors.reset}    Create a local backup
  ${colors.cyan}npx node scripts/restore.js${colors.reset}       Restore from backup
  ${colors.cyan}npm run preview${colors.reset}       Preview production build
  
${colors.gray}To run advanced commands, use npx or add to package.json${colors.reset}
`);
  } catch {
    console.log(`
${colors.bright}${colors.yellow}Advanced Commands:${colors.reset}
  ${colors.cyan}npm run typecheck${colors.reset}     Check TypeScript types
  ${colors.cyan}npm run lint${colors.reset}          Run ESLint
  ${colors.cyan}npx node scripts/checkpoint.js${colors.reset}   Create backup
  ${colors.cyan}npx node scripts/restore.js${colors.reset}      Restore backup
  
${colors.gray}These commands are for experienced developers${colors.reset}
`);
  }
}