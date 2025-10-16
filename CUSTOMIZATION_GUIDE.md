# 🎨 Complete Customization Guide

**HONEST TRUTH:** Read [HONEST_ASSESSMENT.md](./HONEST_ASSESSMENT.md) first to understand what you're actually getting.

This guide shows you **exactly** how to turn this template into YOUR website.

---

## 🎯 **Quickest Path to a Custom Website**

### **Step 1: Site Configuration (30 minutes)**

Edit `/src/config/site.ts` - THIS IS YOUR MOST IMPORTANT FILE:

```typescript
export const siteConfig = {
  // Change these first
  name: "Your Company Name",
  description: "What your company does",
  url: "https://yoursite.com",

  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      // Add/remove as needed
    ],
    cta: {
      label: "Get Started",  // Change this
      href: "/auth/signup",
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Your Company`,
    sections: [
      // Update all footer links
    ],
  },

  contact: {
    email: "hello@yourcompany.com",
    // ...update all contact info
  },
}
```

**What this changes:**
- ✅ Header navigation
- ✅ Footer links
- ✅ Site name everywhere
- ✅ Contact information

**What it DOESN'T change:**
- ❌ Homepage content (still needs manual editing)
- ❌ About page (doesn't exist yet)
- ❌ Pricing tiers
- ❌ Testimonials

### **Step 2: Environment Variables (5 minutes)**

Edit `.env.local`:

```env
# REQUIRED
AUTH_SECRET="generate with: openssl rand -base64 32"
DATABASE_URL="your-database-url"

# OPTIONAL but recommended
NEXT_PUBLIC_SITE_URL=https://yoursite.com
RESEND_API_KEY=re_xxxxx
GOOGLE_CLIENT_ID=your-id
GITHUB_CLIENT_ID=your-id
```

### **Step 3: Homepage Content (1-2 hours)**

Edit `app/(marketing)/page.tsx`:

**Current (demo):**
```tsx
<HeroSection
  title="Build Websites That Convert"  // CHANGE THIS
  subtitle="Production-ready Next.js..."  // CHANGE THIS
  primaryCTA={{ text: 'Get Started', href: '/contact' }}
/>
```

**Your version:**
```tsx
<HeroSection
  title="Your Actual Value Proposition"
  subtitle="What you actually do for customers"
  primaryCTA={{ text: 'Your CTA', href: '/your-link' }}
/>
```

**You need to change:**
1. Hero title & subtitle
2. Features (currently fake features)
3. Testimonials (currently fake people)
4. CTA sections

### **Step 4: Create Missing Pages (2-3 hours)**

#### **About Page** (DOESN'T EXIST)

Create `app/(marketing)/about/page.tsx`:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our company',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      {/* Your content here */}
    </div>
  );
}
```

#### **Privacy Policy** (CRITICAL - DOESN'T EXIST)

Create `app/(marketing)/privacy/page.tsx`:

```tsx
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 prose prose-lg max-w-4xl">
      <h1>Privacy Policy</h1>
      {/* Use a legal template or hire a lawyer */}
    </div>
  );
}
```

**LEGAL WARNING:** Don't skip this. Required by law if collecting user data.

#### **Terms of Service** (CRITICAL - DOESN'T EXIST)

Create `app/(marketing)/terms/page.tsx` - Same pattern as privacy.

### **Step 5: Fix Broken Images (1 hour)**

**Current broken references:**
- `/avatars/sarah.jpg` - Doesn't exist
- `/avatars/mike.jpg` - Doesn't exist
- `/avatars/emily.jpg` - Doesn't exist

**Option A: Remove testimonials**
Edit `app/(marketing)/page.tsx` and remove or comment out `<TestimonialsSection>`.

**Option B: Add real testimonials**
1. Get real testimonial photos (or use placeholders)
2. Create `/public/avatars/` directory
3. Add images
4. Update testimonials in homepage

### **Step 6: Update Pricing (30 minutes)**

Edit `app/(marketing)/pricing/page.tsx`:

**Change:**
```tsx
const plans = [
  {
    name: 'Starter',
    price: '$29',  // YOUR ACTUAL PRICE
    features: [
      'Up to 3 team members',  // YOUR ACTUAL FEATURES
      // ...
    ],
  },
]
```

### **Step 7: Branding (1-2 hours)**

#### **Colors**

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      // Add your brand colors
      brand: {
        50: '#...',
        500: '#...',
        900: '#...',
      }
    }
  }
}
```

#### **Fonts**

Edit `app/layout.tsx`:

```tsx
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

#### **Logo**

1. Create `/public/logo.svg`
2. Update `src/config/site.ts`:
   ```typescript
   logo: {
     src: "/logo.svg",
     alt: "Your Logo",
   }
   ```
3. Update Header component if needed

### **Step 8: Database Setup (see QUICK_START.md)**

```bash
# Choose one:
# 1. Local PostgreSQL
createdb yoursite

# 2. Vercel Postgres (free tier)
# 3. Supabase (free tier)

# Then:
npm run db:push
```

---

## 📋 **Complete Customization Checklist**

### **Critical (Must Do)**
- [ ] Edit `src/config/site.ts` with your info
- [ ] Set up database
- [ ] Add AUTH_SECRET to `.env.local`
- [ ] Create About page
- [ ] Create Privacy Policy (legal requirement)
- [ ] Create Terms of Service (legal requirement)
- [ ] Fix or remove broken testimonial images
- [ ] Update homepage hero content
- [ ] Update pricing with real plans
- [ ] Update contact information

### **Important (Should Do)**
- [ ] Add real logo
- [ ] Update brand colors
- [ ] Change fonts (if needed)
- [ ] Write real homepage copy
- [ ] Add real testimonials (or remove section)
- [ ] Update meta descriptions for SEO
- [ ] Configure analytics (Google Analytics ID)
- [ ] Set up email service (Resend)
- [ ] Test all links work
- [ ] Mobile responsiveness check

### **Nice to Have**
- [ ] Custom favicon
- [ ] Open Graph images for social sharing
- [ ] Blog posts (currently only 3 samples)
- [ ] Team page
- [ ] Case studies
- [ ] FAQ section with real questions

---

## 🗺️ **File Structure - What to Edit**

### **Always Edit:**
```
src/config/site.ts          ← YOUR MOST IMPORTANT FILE
.env.local                  ← Environment variables
app/(marketing)/page.tsx    ← Homepage content
app/(marketing)/pricing/page.tsx  ← Pricing
```

### **Create These:**
```
app/(marketing)/about/page.tsx    ← About page (missing)
app/(marketing)/privacy/page.tsx  ← Privacy (missing)
app/(marketing)/terms/page.tsx    ← Terms (missing)
public/logo.svg                   ← Your logo (missing)
public/avatars/...                ← Testimonial images (missing)
```

### **Probably Edit:**
```
app/layout.tsx              ← Metadata, fonts
tailwind.config.ts          ← Colors, spacing
src/components/website-examples/*  ← Component customization
```

### **Maybe Edit:**
```
content/posts/*.md          ← Blog posts
middleware.ts               ← Security (already good)
auth.config.ts              ← Auth providers
```

### **Don't Edit (Unless You Know What You're Doing):**
```
src/lib/*                   ← Core utilities
prisma/schema.prisma        ← Database schema
tests/*                     ← Tests
```

---

## 🎨 **Common Customizations**

### **Change Navigation**

`src/config/site.ts`:
```typescript
navigation: {
  main: [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Resources", href: "/resources" },
  ],
}
```

### **Add Dark Mode**

1. Install next-themes:
   ```bash
   npm install next-themes
   ```

2. Follow guide: https://ui.shadcn.com/docs/dark-mode/next

(Not included by default)

### **Change Primary Color**

`tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      blue: {
        600: '#your-color',  // Replace blue
      }
    }
  }
}
```

Then search/replace `blue-600` in components.

### **Add More Pages**

1. Create `app/(marketing)/your-page/page.tsx`
2. Add to `src/config/site.ts` navigation
3. That's it!

---

## 🚫 **Common Mistakes to Avoid**

### **1. Not Reading HONEST_ASSESSMENT.md**
**Mistake:** Expecting a "change logo and deploy" template

**Reality:** This needs 2-4 weeks of customization work

### **2. Skipping Legal Pages**
**Mistake:** "I'll add privacy policy later"

**Reality:** Required by law. Do it first.

### **3. Deploying with Demo Content**
**Mistake:** Leaving "Sarah Chen from TechCorp" testimonials

**Reality:** Looks unprofessional. Remove or replace.

### **4. Not Testing**
**Mistake:** Deploy without checking all pages

**Reality:** Broken links, missing images, broken auth

### **5. Ignoring Mobile**
**Mistake:** Only testing on desktop

**Reality:** 60%+ of traffic is mobile

---

## ⏱️ **Realistic Time Estimates**

| Task | Time | Priority |
|------|------|----------|
| Site config | 30 min | Critical |
| Database setup | 15 min | Critical |
| Environment variables | 10 min | Critical |
| Homepage content | 2-3 hours | Critical |
| About page | 1-2 hours | Critical |
| Legal pages | 2-4 hours | Critical |
| Fix images | 1 hour | High |
| Branding (colors/fonts) | 1-2 hours | High |
| Pricing page | 30 min | High |
| Contact page | 30 min | High |
| Blog posts | 2-4 hours | Medium |
| Testing | 2-3 hours | High |
| **TOTAL** | **15-25 hours** | - |

**For non-developers:** Add 50-100% more time

---

## 🆘 **Getting Help**

### **"I'm Stuck on..."**

**Customizing components:**
- Each component in `src/components/website-examples/` is self-contained
- Read the props in the component file
- Update the page that uses it

**Database not connecting:**
- See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
- Check `.env.local` has correct DATABASE_URL
- Verify PostgreSQL is running

**Build errors:**
- Run `npm run typecheck` to see exact error
- Usually a typo or missing import

**"Where do I change X?"**
- Search project for current text
- Update in file found
- Check `src/config/site.ts` first

---

## ✅ **You're Done When...**

- [ ] No demo content visible
- [ ] All navigation links work
- [ ] Legal pages exist (privacy, terms)
- [ ] About page tells your story
- [ ] Contact form works
- [ ] Images load (no broken references)
- [ ] Your branding throughout
- [ ] Mobile looks good
- [ ] Authentication works
- [ ] Can create account & login

---

## 🎓 **Learn More**

- **Full Setup:** [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)
- **Authentication:** [docs/AUTHENTICATION.md](./docs/AUTHENTICATION.md)
- **Deployment:** [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
- **Honest Assessment:** [HONEST_ASSESSMENT.md](./HONEST_ASSESSMENT.md)

---

**Final Note:** This is a **developer template**, not a website builder. If the above seems overwhelming, consider hiring a developer or using a no-code tool like Webflow/Wix.

**Good luck! 🚀**
