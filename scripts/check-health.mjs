#!/usr/bin/env node

import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

const checks = [
  {
    name: 'TypeScript',
    command: 'npm run typecheck',
    fix: 'Fix type errors in your code',
  },
  {
    name: 'ESLint',
    command: 'npm run lint',
    fix: 'Run: npm run fix',
  },
  {
    name: 'Tests',
    command: 'npm run test',
    fix: 'Fix failing tests or run: npm run test',
  },
  {
    name: 'Build',
    command: 'npm run build',
    fix: 'Fix compilation errors',
  },
];

console.log(`
${colors.bright}${colors.blue}🏥 Running Health Check...${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}
`);

let allPassed = true;
const results = [];

for (const check of checks) {
  process.stdout.write(`Checking ${check.name}... `);
  
  try {
    execSync(check.command, { stdio: 'pipe' });
    console.log(`${colors.green}✅ Passed${colors.reset}`);
    results.push({ ...check, passed: true });
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    results.push({ ...check, passed: false });
    allPassed = false;
  }
}

console.log(`\n${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

if (allPassed) {
  console.log(`${colors.bright}${colors.green}✨ All checks passed! Your project is healthy.${colors.reset}\n`);
} else {
  console.log(`${colors.bright}${colors.yellow}⚠️  Some checks failed:${colors.reset}\n`);
  
  results
    .filter(r => !r.passed)
    .forEach(r => {
      console.log(`  ${colors.red}•${colors.reset} ${r.name}: ${colors.cyan}${r.fix}${colors.reset}`);
    });
  
  console.log(`\n${colors.gray}Run the fixes above to resolve issues${colors.reset}\n`);
  process.exit(1);
}