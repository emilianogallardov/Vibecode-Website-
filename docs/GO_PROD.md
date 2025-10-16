# Going to Production

Ready to deploy? Here are the 4 things to change:

## 1. Set AI Mode to Standard

```bash
npm run ai:standard
```

This allows more flexibility while maintaining safety checks.

## 2. Enable CSP Enforcement

In your environment variables:
```env
CSP_ENFORCE=true
```

This enforces Content Security Policy for better security.

## 3. Add Monitoring

Set up error tracking:
```env
SENTRY_DSN=your-sentry-dsn-here
```

Or use your preferred monitoring service.

## 4. Hide Development Routes

Set production mode:
```env
PRODUCTION=true
```

This removes:
- `/__playground__`
- `/__learn__`
- Development-only error details

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] All tests pass (`npm test`)
- [ ] Environment variables configured
- [ ] Remove any console.logs
- [ ] Update API endpoints to production URLs
- [ ] Configure CORS for your domain
- [ ] Set up SSL certificate
- [ ] Configure CDN if needed

## Vercel Deployment

1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy!

That's it! Your app is production-ready. 🚀