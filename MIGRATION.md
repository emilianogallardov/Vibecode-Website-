# Migration Guide

## Migrating from Vibecode Template v1

This guide helps you migrate from the v1 template to this beginner-friendly version.

### What Changed

#### Simplified Scripts
**Before:** 43+ npm scripts  
**After:** 12 beginner-focused scripts

```bash
# Old commands that changed:
npm run ai-check    → npm run ai:check
npm run ai-safe     → npm run ai:safe (simplified)
npm run test:watch  → removed (use npm test)
```

#### AI Safety
**Before:** Complex AI Guard with multiple config files  
**After:** Simple learning mode by default

```bash
# Set to safe mode (recommended)
npm run ai:safe

# Check current mode
npm run ai:check
```

#### New Structure
```
src/
  app/        # Your code (same as before)
  examples/   # NEW: Complete example apps
  patterns/   # NEW: Reusable code patterns
ai-context/   # NEW: AI assistant instructions
```

### Quick Migration Steps

1. **Backup your current project**
   ```bash
   cp -r your-project your-project-backup
   ```

2. **Copy your application code**
   ```bash
   # Copy your custom components and pages
   cp -r old-project/src/app/* new-template/src/app/
   ```

3. **Update imports if needed**
   - Path aliases still work the same (`@/`)
   - No changes needed for most imports

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Enable safe mode**
   ```bash
   npm run ai:safe
   ```

6. **Test your app**
   ```bash
   npm run dev
   ```

### Breaking Changes

1. **Removed Scripts**
   - Complex build scripts moved to `scripts/advanced.json`
   - Test watch mode removed (use `npm test`)
   - Asset generation scripts removed

2. **Configuration**
   - AI config simplified
   - No more `.ai-config.json` needed
   - Learning mode enabled by default

3. **Dependencies**
   - Removed `sharp` and image processing
   - Removed `to-ico` favicon generator
   - Added `prettier` for formatting

### New Features

1. **Examples Directory**
   - 5 complete example apps to learn from
   - Each with tests and documentation

2. **AI Context**
   - Clear instructions for AI assistants
   - Error fixes documentation
   - Project context for better AI responses

3. **Simplified Testing**
   - Simple smoke tests that always pass
   - Focus on testing user interactions

4. **Better Error Messages**
   - Beginner-friendly error explanations
   - Links to relevant examples

### For v1 Power Users

If you need the advanced features from v1:

1. **Advanced scripts still available:**
   ```bash
   # See all advanced commands
   npm run help -- --advanced
   ```

2. **Asset generation:**
   - Manually add back `sharp` if needed
   - Or use online tools for favicons

3. **Complex AI Guard:**
   - The core guard code still exists
   - Can be re-enabled with configuration

### Getting Help

- Check `ai-context/ERRORS_AND_FIXES.md` for common issues
- Run `npm run help` for available commands
- Explore `src/examples/` for patterns

### Why These Changes?

The v1 template was powerful but overwhelming for beginners. This version:
- Reduces cognitive load
- Provides learning materials
- Keeps the production-ready core
- Makes AI assistance more effective

Your existing code will work with minimal changes. The main difference is a cleaner, more focused development experience.