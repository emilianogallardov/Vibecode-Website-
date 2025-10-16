# Frequently Asked Questions

## General

### What is Vibecode Template?
A beginner-friendly React template designed for developers learning to code with AI assistance.

### What do I need to know before starting?
Basic HTML/CSS knowledge is helpful, but not required. The template teaches React as you go.

### Which AI tools work with this?
- GitHub Copilot
- Cursor
- Claude
- ChatGPT
- Any AI that can read project context

## Setup Issues

### "Command not found: npm"
You need to install Node.js first. [Download here](https://nodejs.org/)

### "Module not found" errors
Run `npm install` to install dependencies.

### Port 3000 is already in use
Either stop the other process or change the port in `vite.config.ts`

## Development

### How do I add a new page?
1. Create a new file in `src/app/pages/`
2. Add a route in `src/router.tsx`
3. Link to it from navigation

### Where do I put my components?
- Reusable components: `src/app/components/`
- Page components: `src/app/pages/`
- UI primitives: `src/app/components/ui/`

### How do I add an API endpoint?
Create a new file in `api/` directory. It will be available at `/api/your-endpoint`

## AI Safety

### What is Safe Mode?
Limits changes to 3 files at once and protects core files from modification.

### How do I change AI mode?
- Safe: `npm run ai:safe`
- Standard: `npm run ai:standard`
- Check current: `npm run ai:check`

### Why was my change blocked?
Check the error message for specific reasons. Usually it's too many files or protected files.

## Testing

### How do I run tests?
```bash
npm test
```

### How do I test a single file?
```bash
npx vitest path/to/file.test.tsx
```

### Do I need to write tests?
For learning, no. For production, yes!

## Deployment

### How do I deploy to Vercel?
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy (zero config needed)

### Do I need a server?
No, this is a static site that can be hosted anywhere.

### What about the API routes?
They work automatically on Vercel using Edge Functions.

## Still Stuck?

- Check `ai-context/ERRORS_AND_FIXES.md` for common errors
- Explore the examples in `src/examples/`
- Run `npm run help` for available commands