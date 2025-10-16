# 🚀 Quick Start - Get Running in 5 Minutes

## **Prerequisites**
- Node.js 20+
- PostgreSQL (or use free cloud database)

---

## **Step 1: Install**

```bash
npm install
```

## **Step 2: Environment Setup**

```bash
cp .env.example .env.local
```

**Edit `.env.local` and add these REQUIRED variables:**

```env
# Generate this command: openssl rand -base64 32
AUTH_SECRET="your-generated-secret-here"

AUTH_URL="http://localhost:3000"

# Your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/vibecode"
```

## **Step 3: Database Setup**

**Option A: Local PostgreSQL**
```bash
# macOS
brew install postgresql@17
brew services start postgresql@17
createdb vibecode

# Update .env.local DATABASE_URL to:
# postgresql://$(whoami)@localhost:5432/vibecode
```

**Option B: Free Cloud Database (Easier)**

**Vercel Postgres** (Recommended):
1. Go to https://vercel.com/storage/postgres
2. Create database
3. Copy connection string to `.env.local`

**Or Supabase**:
1. Go to https://supabase.com
2. Create project
3. Settings → Database → Copy connection string

## **Step 4: Initialize Database**

```bash
npm run db:push
```

## **Step 5: Start Development**

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## **Test Authentication**

1. Go to http://localhost:3000/auth/signup
2. Create account (email/password)
3. Should redirect to `/dashboard`
4. You're all set! ✅

---

## **Optional: OAuth Providers**

### **Google OAuth**
1. https://console.cloud.google.com → APIs & Services → Credentials
2. Create OAuth Client ID
3. Redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-id
   GOOGLE_CLIENT_SECRET=your-secret
   ```

### **GitHub OAuth**
1. https://github.com/settings/developers → New OAuth App
2. Callback: `http://localhost:3000/api/auth/callback/github`
3. Add to `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-id
   GITHUB_CLIENT_SECRET=your-secret
   ```

---

## **What's Included**

✅ Authentication (email/password + OAuth)
✅ Protected dashboard
✅ Contact form with CAPTCHA
✅ Blog with MDX
✅ SEO optimization
✅ Security headers
✅ Testing setup

---

## **Next Steps**

- **Full Setup Guide**: See [`docs/SETUP_GUIDE.md`](./docs/SETUP_GUIDE.md)
- **Authentication**: See [`docs/AUTHENTICATION.md`](./docs/AUTHENTICATION.md)
- **Troubleshooting**: See [`docs/TROUBLESHOOTING.md`](./docs/TROUBLESHOOTING.md)

---

## **Common Issues**

### **"Database connection failed"**
```bash
# Check PostgreSQL is running
psql --version
pg_isready
```

### **"Invalid AUTH_SECRET"**
```bash
# Generate new one
openssl rand -base64 32
# Add to .env.local
```

### **"Prisma Client not found"**
```bash
npm run db:generate
```

---

**Need Help?** Open an issue or check the full setup guide.
