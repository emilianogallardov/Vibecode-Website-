# Vibecode Website Template 🚀

A production-ready Next.js 15 website template with SEO, analytics, and performance built-in.

## ✨ Features

- **Next.js 15 App Router** - Modern React framework with SSG/ISR
- **SEO Optimized** - Metadata API, sitemap, robots.txt, JSON-LD
- **Analytics Ready** - GA4 with Consent Mode v2
- **Performance First** - Core Web Vitals optimized
- **Type Safe** - Full TypeScript with strict mode
- **Component Library** - Pre-built website components
- **Contact Form** - Turnstile captcha + rate limiting
- **Testing** - Playwright E2E + Vitest unit tests
- **CI/CD Ready** - GitHub Actions + Lighthouse CI

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/vibecode-website-template.git
cd vibecode-website-template

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
app/                    # Next.js App Router
├── (marketing)/       # Marketing pages group
│   ├── page.tsx      # Homepage
│   ├── blog/         # Blog pages
│   ├── pricing/      # Pricing page
│   └── contact/      # Contact page
├── api/              # API routes
│   ├── contact/      # Contact form handler
│   └── rss/          # RSS feed
├── layout.tsx        # Root layout
├── sitemap.ts        # Dynamic sitemap
└── robots.ts         # Robots.txt

src/
├── components/       # React components
│   ├── website-examples/  # Website components
│   └── patterns/         # Reusable patterns
├── lib/             # Utility functions
├── styles/          # Global styles
└── templates/       # Page templates
```

## 🛠 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright tests
npm run test:a11y    # Run accessibility tests
```

## 🎨 Components

### Website Components

- **HeroSection** - Full-width hero with CTAs
- **Header** - Responsive navigation
- **Footer** - Multi-column footer
- **ContactForm** - Form with Turnstile captcha
- **BlogList** - Blog post grid
- **BlogPost** - Article layout
- **PricingTable** - Pricing plans
- **FeaturesSection** - Feature grid
- **TestimonialsSection** - Customer testimonials
- **CTASection** - Call-to-action banner
- **FAQSection** - Accordion FAQ

### Patterns

- **SEO** - Metadata helpers, JSON-LD
- **Analytics** - GA4 with consent management
- **Performance** - Image optimization, fonts
- **Content** - MDX support, RSS feed
- **Marketing** - Social proof, trust badges

## 🔧 Configuration

### Environment Variables

```env
# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Turnstile (Cloudflare)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...

# Email (Resend)
RESEND_API_KEY=...
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=hello@yourdomain.com

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### SEO Setup

1. Update metadata in `app/layout.tsx`
2. Configure sitemap in `app/sitemap.ts`
3. Set canonical URLs via metadata
4. Add JSON-LD structured data

### Analytics Setup

1. Get GA4 measurement ID
2. Add to `NEXT_PUBLIC_GA_ID`
3. Configure Consent Mode defaults
4. Test with Google Tag Assistant

### Email Setup

1. Sign up for [Resend](https://resend.com)
2. Verify your domain
3. Add API key to environment
4. Configure SPF/DKIM records

## 📊 Performance

Target metrics (Lighthouse):

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

Core Web Vitals:

- **FCP**: < 2s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **TBT**: < 300ms

## 🧪 Testing

```bash
# Unit tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests
npm run test:a11y

# All tests
npm run check
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The template works with any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 💬 Support

- [Documentation](https://docs.vibecode.com)
- [GitHub Issues](https://github.com/yourusername/vibecode-website-template/issues)
- [Discord Community](https://discord.gg/vibecode)

---

Built with ❤️ by the Vibecode Team