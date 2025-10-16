# Troubleshooting Guide

## Installation Problems

### npm install fails

**Error:** `EACCES` permission denied
```bash
# Fix with:
sudo npm install --unsafe-perm
# Or better: fix npm permissions properly
```

**Error:** `sharp` compilation error
```bash
# Skip optional dependencies:
npm install --no-optional
```

### Wrong Node version

**Error:** `engines` incompatible
```bash
# Install Node 20:
nvm install 20
nvm use 20
```

## Development Issues

### Blank white screen

1. Check browser console for errors
2. Verify `npm run dev` is running
3. Clear browser cache
4. Check `src/main.tsx` exists

### Changes not appearing

1. Check if file is saved
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Clear browser cache
4. Check for syntax errors

### Import errors

**Error:** Cannot find module '@/...'
- The `@` alias points to `src/`
- Check file exists at the path

**Error:** Module not found
- Run `npm install`
- Check import path spelling
- Ensure file extension is correct

## Build Errors

### TypeScript errors

**Quick fix:** Add `// @ts-ignore` above the line
**Proper fix:** Fix the type error

### Build out of memory

```bash
# Increase Node memory:
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Test Failures

### Test timeout

```javascript
// Increase timeout in test:
it('test name', async () => {
  // test code
}, 10000); // 10 seconds
```

### Cannot find module

- Mock the module in test setup
- Or install missing dependency

## AI Assistant Issues

### AI making too many changes

Enable safe mode:
```bash
npm run ai:safe
```

### AI can't understand project

- Check `ai-context/` files exist
- Update `CURRENT_TASK.md`
- Provide more specific instructions

## Performance Issues

### Dev server slow

1. Close other applications
2. Exclude node_modules from antivirus
3. Use production build for testing: `npm run build && npm run preview`

### Hot reload not working

1. Check file is in `src/`
2. Restart dev server
3. Check for syntax errors

## Common Error Messages

### "Hydration failed"
Client/server HTML mismatch. Check for:
- Random values in render
- Browser extensions modifying DOM
- Conditional rendering based on client-only values

### "Too many re-renders"
Infinite loop in your component:
- Check setState calls
- Ensure useEffect has dependencies

### "Invalid hook call"
Hooks rules violation:
- Only call hooks at top level
- Only call hooks from React functions

## Emergency Fixes

### Reset everything
```bash
# Stash changes and reinstall:
git stash
rm -rf node_modules
npm install
```

### Create checkpoint before big changes
```bash
npx node scripts/checkpoint.js
```

### Restore from checkpoint
```bash
npx node scripts/restore.js
```

## Still Can't Fix It?

1. Search the exact error message online
2. Check if it's a known issue in `ai-context/ERRORS_AND_FIXES.md`
3. Try the examples in `src/examples/` as reference
4. Create a minimal reproduction of the issue