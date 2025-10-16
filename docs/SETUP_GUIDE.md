# Complete Setup Guide - Vibecode Website Template

## 🎯 **Project Status Overview**

### ✅ **What's Working**
- Next.js 15 App Router with TypeScript
- NextAuth v5 authentication (email/password + OAuth)
- Contact form with Turnstile CAPTCHA
- Email system (Resend) with console fallback
- Rate limiting (Upstash Redis with in-memory fallback)
- Blog with enhanced Markdown (MDX)
- SEO optimization (metadata, sitemap, robots.txt)
- Content Security Policy with nonces
- Testing infrastructure (Vitest + Playwright)
- Build successful (production-ready)

### ⚠️ **What's Missing for Full Functionality**
1. **Database connection** - PostgreSQL not set up
2. **Environment variables** - AUTH_SECRET and others missing
3. **OAuth credentials** - Google/GitHub not configured
4. **Email service** - Resend API key needed
5. **Security vulnerabilities** - 5 moderate issues in dev dependencies

---

## 🚀 **Quick Start (5 Minutes)**

### **Step 1: Install Dependencies**

```bash
npm install
```

### **Step 2: Set Up Environment Variables**

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

**CRITICAL: Add these required variables:**

```env
# Generate auth secret (REQUIRED for NextAuth)
AUTH_SECRET="run: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"

# Database (REQUIRED for authentication)
DATABASE_URL="postgresql://user:password@localhost:5432/vibecode?schema=public"
```

### **Step 3: Set Up Database**

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (macOS)
brew install postgresql@17
brew services start postgresql@17

# Create database
createdb vibecode

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://$(whoami)@localhost:5432/vibecode?schema=public"
```

**Option B: Vercel Postgres (Free Tier)**
```bash
# Sign up at vercel.com/storage/postgres
# Copy connection string to .env.local
```

**Option C: Supabase (Free Tier)**
```bash
# Sign up at supabase.com
# Create project → Settings → Database → Connection String
# Copy to .env.local
```

### **Step 4: Run Migrations**

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### **Step 5: Start Development**

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 📋 **Complete Environment Variables Setup**

### **1. Required for Basic Functionality**

```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth (REQUIRED)
AUTH_SECRET="generate-with: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"

# Database (REQUIRED for authentication)
DATABASE_URL="postgresql://user:password@localhost:5432/vibecode?schema=public"
```

### **2. Optional: OAuth Providers**

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**GitHub OAuth:**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. New OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### **3. Optional: Email Service**

**Resend (Recommended):**
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=hello@yourdomain.com
```

**Without Resend:**
- Emails will log to console (development)
- Update `src/lib/email.ts` for other providers

### **4. Optional: Security & Analytics**

```env
# Turnstile CAPTCHA (contact form)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxx
```

---

## 🗄️ **Database Setup Options**

### **Option 1: Local PostgreSQL (Recommended for Development)**

**macOS:**
```bash
brew install postgresql@17
brew services start postgresql@17
createdb vibecode
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
sudo -u postgres createdb vibecode
```

**Windows:**
```bash
# Download from postgresql.org
# Use pgAdmin to create database
```

**Connection String:**
```env
DATABASE_URL="postgresql://username@localhost:5432/vibecode?schema=public"
```

### **Option 2: Vercel Postgres (Free Tier)**

1. Go to [vercel.com/storage/postgres](https://vercel.com/storage/postgres)
2. Create database
3. Copy `.env.local` tab content
4. Paste into your `.env.local`

**Pros:**
- Free tier available
- Auto-scaling
- Built-in connection pooling

### **Option 3: Supabase (Free Tier)**

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (pooler mode)

**Pros:**
- Generous free tier
- Built-in auth (can replace NextAuth if needed)
- Realtime capabilities

### **Option 4: Railway (Free Trial)**

1. Sign up at [railway.app](https://railway.app)
2. New Project → Add PostgreSQL
3. Copy connection string

**Pros:**
- Easy deployment
- Auto-backups

---

## 🔧 **Complete Installation Steps**

### **1. Clone & Install**

```bash
git clone <your-repo-url>
cd Vibecode_Website_Template
npm install
```

### **2. Environment Setup**

```bash
# Copy environment template
cp .env.example .env.local

# Generate auth secret
openssl rand -base64 32
# Copy output and add to .env.local as AUTH_SECRET

# Edit .env.local and add:
# - AUTH_SECRET (from above)
# - AUTH_URL=http://localhost:3000
# - DATABASE_URL (see database setup options)
```

### **3. Database Initialization**

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Or create migration (recommended for production)
npm run db:migrate
```

### **4. Verify Setup**

```bash
# Type check
npm run typecheck

# Run tests
npm test

# Build for production
npm run build

# Start development
npm run dev
```

### **5. Test Authentication**

1. Visit: http://localhost:3000/auth/signup
2. Create account with email/password
3. Should redirect to `/dashboard`
4. Try signing out and signing back in

---

## 🐛 **Troubleshooting**

### **Issue: "Database connection failed"**

**Symptom:**
```
Error: Can't reach database server at `localhost:5432`
```

**Solution:**
```bash
# Check if PostgreSQL is running
psql --version
pg_isready

# Start PostgreSQL service
# macOS:
brew services start postgresql@17

# Ubuntu:
sudo service postgresql start

# Verify connection
psql -h localhost -U <your-username> -d vibecode
```

### **Issue: "Invalid AUTH_SECRET"**

**Symptom:**
```
[auth][error] MissingSecret: AUTH_SECRET is not set
```

**Solution:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
AUTH_SECRET="<generated-secret>"

# Restart dev server
npm run dev
```

### **Issue: "Prisma Client not generated"**

**Symptom:**
```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
# Regenerate Prisma Client
npm run db:generate

# Restart dev server
npm run dev
```

### **Issue: "OAuth callback error"**

**Symptom:**
```
Error: Invalid callback URL
```

**Solution:**
1. Check OAuth provider settings
2. Verify callback URL matches:
   - Development: `http://localhost:3000/api/auth/callback/[provider]`
   - Production: `https://yourdomain.com/api/auth/callback/[provider]`
3. Restart dev server after changing .env

### **Issue: "Build warnings about Edge Runtime"**

**Symptom:**
```
A Node.js API is used (setImmediate) which is not supported in Edge Runtime
```

**Status:** ✅ Fixed in current version
- auth.config.ts now explicitly uses Node.js runtime
- Middleware properly configured

### **Issue: "Security vulnerabilities"**

**Symptom:**
```
5 moderate severity vulnerabilities
```

**Solution:**
```bash
# These are in dev dependencies (esbuild/vite)
# Not a concern for production build
# To fix (may break tests):
npm audit fix --force
```

---

## 📊 **Current Build Statistics**

```
Route (app)                      Size    First Load JS
------------------------------------------------
Homepage                         1.32 kB    112 kB
Sign In                         2.09 kB    106 kB
Sign Up                         2.45 kB    107 kB
Dashboard (protected)            415 B     105 kB
Contact                         2.38 kB    104 kB
Blog                             174 B     111 kB
Middleware                                 156 kB

First Load JS (shared)                     102 kB
```

**Performance Notes:**
- ✅ First Load JS: 102 kB (reasonable for feature set)
- ⚠️ Middleware: 156 kB (includes NextAuth)
- 🎯 Target: <80 KB (future optimization needed)

---

## 🚀 **Production Deployment**

### **Prerequisites**

1. ✅ All tests passing
2. ✅ Build successful
3. ✅ Database set up
4. ✅ Environment variables configured

### **Deployment Checklist**

- [ ] Set `AUTH_URL` to production domain
- [ ] Use production database (not local)
- [ ] Add production secrets (new AUTH_SECRET)
- [ ] Configure OAuth callback URLs for production
- [ ] Set up email service (Resend with verified domain)
- [ ] Configure analytics (Google Analytics ID)
- [ ] Set up error monitoring (Sentry - optional)
- [ ] Run database migrations (not db:push)
- [ ] Test authentication flow
- [ ] Verify protected routes
- [ ] Check email delivery
- [ ] Test contact form

### **Deployment Options**

**1. Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

**2. Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and init
railway login
railway init

# Deploy
railway up
```

**3. Docker**
```bash
# Build image
docker build -t vibecode-template .

# Run
docker run -p 3000:3000 --env-file .env.local vibecode-template
```

---

## 📝 **Feature Completion Status**

### **Core Features (100%)**
- ✅ Next.js 15 App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS
- ✅ SEO optimization
- ✅ Security headers & CSP

### **Authentication (100%)**
- ✅ NextAuth v5 integration
- ✅ Email/password auth
- ✅ OAuth (Google/GitHub)
- ✅ Protected routes
- ✅ Role-based access

### **Content (100%)**
- ✅ Blog with MDX
- ✅ Contact form
- ✅ Newsletter signup
- ✅ RSS feed

### **Infrastructure (80%)**
- ✅ Database schema (Prisma)
- ✅ Email system
- ✅ Rate limiting
- ⚠️ Database not connected (requires manual setup)
- ⚠️ OAuth not configured (optional)

### **Testing (90%)**
- ✅ Unit tests (63 passing)
- ✅ E2E tests (Playwright)
- ✅ Type checking
- ⚠️ Auth E2E tests (to be added)

### **Monitoring (0%)**
- ❌ Error tracking (Sentry)
- ❌ Performance monitoring
- ❌ Web Vitals tracking

---

## 🎯 **Next Steps to Full Production**

### **Immediate (Required)**
1. ✅ Fix build errors - **COMPLETE**
2. ✅ Add missing environment variables - **DOCUMENTED**
3. 📝 Set up database - **USER ACTION REQUIRED**
4. 📝 Configure OAuth (optional) - **USER ACTION REQUIRED**

### **Short Term (Recommended)**
5. Add error monitoring (Sentry)
6. Add Web Vitals tracking
7. Optimize bundle size (156 KB middleware → <100 KB)
8. Add auth E2E tests
9. Create admin dashboard

### **Long Term (Nice to Have)**
10. Add file upload system (S3/R2)
11. Add job queue (BullMQ)
12. Add WebSocket support
13. GraphQL API option
14. Multi-language support

---

## 📚 **Additional Documentation**

- [Authentication Guide](./AUTHENTICATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [API Documentation](./API.md)

---

## 🆘 **Getting Help**

### **Common Commands**

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema (dev)
npm run db:migrate      # Create migration (prod)
npm run db:studio       # Open Prisma Studio

# Quality
npm run typecheck       # TypeScript validation
npm run lint            # ESLint
npm run test            # Unit tests
npm run test:e2e        # E2E tests

# Analysis
npm run analyze         # Bundle size analysis
```

### **Support Resources**

- **Next.js Issues**: [Next.js Docs](https://nextjs.org/docs)
- **Auth Issues**: [NextAuth Docs](https://next-auth.js.org)
- **Database Issues**: [Prisma Docs](https://prisma.io/docs)
- **Deployment**: [Vercel Docs](https://vercel.com/docs)

---

**Last Updated:** January 2025
**Project Status:** ✅ Production Ready (requires database setup)
**Build Status:** ✅ Passing
**Test Status:** ✅ 63/63 Passing
