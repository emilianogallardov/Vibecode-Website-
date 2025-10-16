/**
 * Site Configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for your website content.
 * Change these values to customize your site without editing component files.
 */

export const siteConfig = {
  // Basic Information
  name: "Your Company Name",
  description: "Your company description - what you do and who you serve",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Branding
  logo: {
    src: "/logo.svg",
    alt: "Your Company Logo",
    width: 150,
    height: 40,
  },

  // Navigation
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      label: "Sign Up",
      href: "/auth/signup",
    },
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,

    sections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/#features", external: false },
          { label: "Pricing", href: "/pricing", external: false },
          { label: "FAQ", href: "/#faq", external: false },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about", external: false },
          { label: "Blog", href: "/blog", external: false },
          { label: "Contact", href: "/contact", external: false },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs", external: false },
          { label: "Support", href: "/support", external: false },
          { label: "FAQ", href: "/support#faq", external: false },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy", external: false },
          { label: "Terms of Service", href: "/terms", external: false },
          { label: "Cookie Policy", href: "/cookies", external: false },
        ],
      },
      {
        title: "Social",
        links: [
          { label: "Twitter", href: "https://twitter.com/yourhandle", external: true },
          { label: "GitHub", href: "https://github.com/yourorg", external: true },
          { label: "LinkedIn", href: "https://linkedin.com/company/yourcompany", external: true },
        ],
      },
    ],
  },

  // Social Media
  social: {
    twitter: {
      handle: "@yourhandle",
      url: "https://twitter.com/yourhandle",
    },
    github: {
      handle: "yourorg",
      url: "https://github.com/yourorg",
    },
    linkedin: {
      handle: "yourcompany",
      url: "https://linkedin.com/company/yourcompany",
    },
  },

  // Contact Information
  contact: {
    email: "hello@yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
    },
  },

  // SEO Defaults
  seo: {
    defaultTitle: "Your Company - Your Tagline",
    titleTemplate: "%s | Your Company",
    defaultDescription: "Your company description for search engines",
    keywords: ["keyword1", "keyword2", "keyword3"],
    twitterHandle: "@yourhandle",

    openGraph: {
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og/default.jpg",
          width: 1200,
          height: 630,
          alt: "Your Company",
        },
      ],
    },
  },

  // Analytics
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
  },
} as const;

export type SiteConfig = typeof siteConfig;
