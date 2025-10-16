#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

// Error mappings (simplified version of ERRORS_AND_FIXES.md)
const errorMappings = {
  'map-undefined': {
    title: "Cannot read property 'map' of undefined",
    meaning: "You're trying to loop over data that doesn't exist yet.",
    fix: "Add optional chaining: data?.map(...) or check if data exists first",
    example: "src/examples/02-DataFetch/DataFetch.tsx",
    line: 85
  },
  'hook-rules': {
    title: "Invalid hook call",
    meaning: "Hooks can only be called at the top level of React functions.",
    fix: "Move the hook call to the top of your component, not inside conditions or loops",
    example: "src/examples/01-Counter/Counter.tsx",
    line: 7
  },
  'module-not-found': {
    title: "Module not found",
    meaning: "The import path is wrong or the file doesn't exist.",
    fix: "Check the file path and spelling. Remember @ points to src/",
    example: "src/App.tsx",
    line: 1
  },
  'too-many-renders': {
    title: "Too many re-renders",
    meaning: "You're updating state in a way that causes infinite loops.",
    fix: "Check setState calls - don't call them directly in render",
    example: "src/examples/01-Counter/README.md",
    line: 50
  },
  'missing-dependencies': {
    title: "React Hook useEffect has missing dependencies",
    meaning: "useEffect depends on values you didn't list in the dependency array.",
    fix: "Add all referenced variables to the dependency array []",
    example: "src/examples/02-DataFetch/DataFetch.tsx",
    line: 27
  }
};

// Parse command line arguments
const errorToken = process.argv[2] || '';

// Try to match error token or search in recent error output
function findError(token) {
  // Direct mapping
  if (errorMappings[token]) {
    return errorMappings[token];
  }
  
  // Search for partial matches
  const searchTerm = token.toLowerCase();
  for (const [key, value] of Object.entries(errorMappings)) {
    if (key.includes(searchTerm) || 
        value.title.toLowerCase().includes(searchTerm) ||
        value.meaning.toLowerCase().includes(searchTerm)) {
      return value;
    }
  }
  
  return null;
}

// Main execution
function main() {
  if (!errorToken) {
    console.log(`
${colors.bright}${colors.blue}🔍 Error Explainer${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

Usage: ${colors.cyan}npx node scripts/explain-error.mjs <error-token>${colors.reset}

Common error tokens:
  ${colors.cyan}map-undefined${colors.reset}     - Cannot read property 'map' of undefined
  ${colors.cyan}hook-rules${colors.reset}        - Invalid hook call
  ${colors.cyan}module-not-found${colors.reset}  - Module not found
  ${colors.cyan}too-many-renders${colors.reset}  - Too many re-renders
  ${colors.cyan}missing-dependencies${colors.reset} - useEffect missing dependencies

Example: ${colors.cyan}npx node scripts/explain-error.mjs map-undefined${colors.reset}

For full error documentation, see: ${colors.cyan}ai-context/ERRORS_AND_FIXES.md${colors.reset}
`);
    process.exit(0);
  }

  const errorInfo = findError(errorToken);
  
  if (!errorInfo) {
    console.log(`
${colors.red}❌ Error token "${errorToken}" not found${colors.reset}

Try one of these:
${Object.keys(errorMappings).map(key => `  • ${colors.cyan}${key}${colors.reset}`).join('\n')}

Or check ${colors.cyan}ai-context/ERRORS_AND_FIXES.md${colors.reset} for more errors.
`);
    process.exit(1);
  }

  // Display error explanation
  console.log(`
${colors.bright}${colors.red}🚨 ${errorInfo.title}${colors.reset}
${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.bright}What it means:${colors.reset}
  ${errorInfo.meaning}

${colors.bright}${colors.green}How to fix:${colors.reset}
  ${errorInfo.fix}

${colors.bright}${colors.blue}See example:${colors.reset}
  ${colors.cyan}${errorInfo.example}:${errorInfo.line}${colors.reset}

${colors.bright}Learn more:${colors.reset}
  Full documentation: ${colors.cyan}ai-context/ERRORS_AND_FIXES.md${colors.reset}
`);
}

main();