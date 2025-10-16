# CLAUDE.md - AI Assistant Instructions for Vibecode Infrastructure Template

## 🎯 Project Vision

You are working on **Vibecode Infrastructure Template** - a production-grade Next.js 15 backend infrastructure template that provides everything EXCEPT the UI. This is the "Ruby on Rails for Next.js" - all the boring, critical infrastructure done right, allowing developers to focus on their unique UI and business logic.

### Target User
- **Senior developers** building production applications
- **Startups** needing enterprise-grade infrastructure from day one
- **Agencies** wanting consistent backend across projects
- **Teams** who bring their own UI library (Shadcn, Tailwind UI, MUI, etc.)

### Core Philosophy
- **Infrastructure First**: Rock-solid backend, bring your own UI
- **Production Ready**: Not a demo, actual production code
- **Performance Elite**: <50KB initial bundle, Edge-optimized
- **Observable**: Full monitoring, tracing, and debugging built-in
- **Secure by Default**: OWASP Top 10 covered out of the box

## 🏗️ Architecture Overview

```
vibecode-infrastructure/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Edge Runtime)
│   │   ├── auth/          # Authentication endpoints
│   │   ├── webhooks/      # Webhook receivers
│   │   └── [...]/         # Your API endpoints
│   │
│   ├── (auth)/           # Auth-protected pages
│   └── (public)/         # Public pages
│
├── src/
│   ├── contracts/        # Component interfaces (no UI)
│   │   ├── components.ts # UI component contracts
│   │   └── layouts.ts    # Layout contracts
│   │
│   ├── lib/             # Core infrastructure
│   │   ├── db/          # Database layer (Prisma)
│   │   ├── auth/        # Authentication (NextAuth)
│   │   ├── cache/       # Redis caching layer
│   │   ├── queue/       # Job queue (BullMQ)
│   │   ├── storage/     # File storage (S3/R2)
│   │   ├── email/       # Email service with templates
│   │   ├── monitoring/  # OpenTelemetry & metrics
│   │   ├── api/         # API utilities & middleware
│   │   ├── security/    # Security utilities
│   │   └── validation/  # Zod schemas
│   │
│   ├── config/          # Configuration
│   │   ├── index.ts     # Centralized config
│   │   ├── features.ts  # Feature flags
│   │   └── limits.ts    # Rate limits & quotas
│   │
│   └── env/             # Environment validation
│       ├── server.ts    # Server env with Zod
│       └── client.ts    # Client env with Zod
│
├── prisma/              # Database
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration history
│
├── scripts/             # Developer tools
│   ├── setup.ts        # Project setup wizard
│   ├── health.ts       # Health check all services
│   └── generate.ts     # Code generation CLI
│
└── tests/
    ├── load/           # Load testing
    ├── security/       # Security testing
    └── integration/    # Integration tests
```

## ⚡ Performance Targets

### Core Web Vitals
- **LCP**: < 1.5s (Elite)
- **INP**: < 100ms (Elite)
- **CLS**: < 0.05 (Elite)
- **FCP**: < 1.0s (Elite)
- **TTFB**: < 200ms (Elite)

### Bundle Size
- **Initial JS**: < 50KB (currently 102KB - needs optimization)
- **Route JS**: < 20KB per route
- **API Response**: < 100ms p50, < 500ms p99

### Scalability
- **Concurrent Users**: 10,000+
- **Requests/sec**: 1,000+ per instance
- **Database Connections**: Pooled (25-100)
- **Cache Hit Rate**: > 90%

## 🔒 Security Requirements

### Authentication
- **Providers**: Email/Password, OAuth (Google, GitHub, etc.)
- **Sessions**: JWT with refresh tokens
- **MFA**: TOTP support ready
- **RBAC**: Role-based access control

### API Security
- **Rate Limiting**: Token bucket per IP/User
- **CORS**: Configurable per route
- **CSRF**: Token validation
- **Input Validation**: Zod on every endpoint
- **SQL Injection**: Parameterized queries only
- **XSS**: Content Security Policy enforced

### Infrastructure Security
- **Secrets**: Environment validation with Zod
- **Encryption**: TLS 1.3+ only
- **Headers**: HSTS, X-Frame-Options, etc.
- **Audit Logging**: Every state change logged
- **DDoS Protection**: Cloudflare/Vercel Shield

## 🛠 Infrastructure Components

### Database Layer
```typescript
// Prisma with connection pooling
// Automatic migrations
// Query optimization
// Read replicas support
```

### Caching Strategy
```typescript
// Multi-tier caching:
// 1. Edge Cache (Vercel/Cloudflare)
// 2. Redis (Upstash/Redis Cloud)
// 3. In-memory (LRU)
// 4. Database query cache
```

### Queue System
```typescript
// BullMQ for job processing
// - Email queue
// - Image processing
// - Webhooks
// - Scheduled tasks
// - Batch operations
```

### Monitoring Stack
```typescript
// OpenTelemetry for observability
// - Distributed tracing
// - Custom metrics
// - Performance monitoring
// - Error tracking (Sentry)
// - Uptime monitoring
```

## 📊 Current Status vs Target

### What's Working (Keep)
- ✅ Next.js 15 App Router
- ✅ Enhanced Markdown system
- ✅ Security headers & CSP
- ✅ Email system with fallback
- ✅ SEO & structured data
- ✅ Environment validation

### What Needs Removal (UI Components)
- ❌ `/src/components/website-examples/` - Remove all UI examples
- ❌ Opinionated styling - Let developers choose
- ❌ Sample content - Provide contracts instead

### What's Missing (Critical Additions)

#### Phase 1: Core Infrastructure (Priority: CRITICAL)
- [ ] Database layer (Prisma)
- [ ] Authentication (NextAuth v5)
- [ ] Redis caching
- [ ] Job queue system
- [ ] File storage abstraction

#### Phase 2: Production Features (Priority: HIGH)
- [ ] API standardization layer
- [ ] Webhook system
- [ ] WebSocket support
- [ ] GraphQL option
- [ ] Payment integration ready

#### Phase 3: Observability (Priority: HIGH)
- [ ] OpenTelemetry setup
- [ ] Distributed tracing
- [ ] Custom metrics
- [ ] Performance budgets
- [ ] Error tracking

#### Phase 4: Developer Experience (Priority: MEDIUM)
- [ ] CLI tool for scaffolding
- [ ] Development dashboard
- [ ] API documentation generation
- [ ] Setup wizard
- [ ] Local/production parity

## 🎯 Success Metrics

### Performance
- **Build time**: < 60 seconds
- **Cold start**: < 3 seconds
- **Hot reload**: < 500ms
- **Test suite**: < 30 seconds

### Developer Experience
- **Time to first API**: < 5 minutes
- **Time to production**: < 1 hour
- **Documentation coverage**: 100%
- **Type safety**: 100%

### Production Readiness
- **Uptime**: 99.99% capable
- **Error rate**: < 0.1%
- **Security score**: A+ (Mozilla Observatory)
- **Performance score**: 95+ (Lighthouse)

## 🚀 Implementation Roadmap

### Week 1: Foundation
1. Remove all UI components
2. Create component contracts/interfaces
3. Add Prisma database layer
4. Implement NextAuth v5
5. Setup Redis caching

### Week 2: Core Services
1. Add BullMQ job queue
2. Implement file storage abstraction
3. Create API standardization layer
4. Add webhook system
5. Setup monitoring basics

### Week 3: Production Features
1. Add OpenTelemetry
2. Implement distributed tracing
3. Setup performance monitoring
4. Add security scanning
5. Create health check system

### Week 4: Developer Experience
1. Build CLI tool
2. Create development dashboard
3. Add documentation generation
4. Implement setup wizard
5. Write migration guides

## 💡 Development Guidelines

### When Adding Features
1. **No UI opinions** - Only contracts/interfaces
2. **Production first** - No toy examples
3. **Observable** - Metrics and tracing for everything
4. **Documented** - OpenAPI spec for all endpoints
5. **Tested** - Load, security, and integration tests

### Code Standards
```typescript
// Every API endpoint follows this pattern
export const route = new APIRoute({
  schema: z.object({
    email: z.string().email(),
  }),
  middleware: [authenticate, rateLimit, cache],
  handler: async (input, context) => {
    // Business logic with full type safety
    return { success: true };
  },
});
```

### Component Contracts
```typescript
// Don't provide UI, provide contracts
export interface HeroSection {
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    action: () => void | Promise<void>;
  };
}

// Developers implement with their own UI library
```

## 🏁 Definition of Done

A feature is complete when:
1. **It works in production** (not just locally)
2. **It's monitored** (metrics & tracing)
3. **It's documented** (OpenAPI/TypeDoc)
4. **It's tested** (unit, integration, load)
5. **It's secure** (validated & sanitized)

## 📈 Competitive Analysis

### Versus Other Templates
| Feature | This Template | T3 Stack | Vercel Commerce | create-next-app |
|---------|--------------|----------|-----------------|-----------------|
| Production Ready | ✅ Full | ⚠️ Partial | ✅ E-commerce only | ❌ Basic |
| Database | ✅ Prisma | ✅ Prisma | ✅ Custom | ❌ None |
| Auth | ✅ NextAuth | ✅ NextAuth | ⚠️ Basic | ❌ None |
| Monitoring | ✅ Full | ❌ None | ⚠️ Basic | ❌ None |
| Queue System | ✅ BullMQ | ❌ None | ❌ None | ❌ None |
| Type Safety | ✅ 100% | ✅ 100% | ⚠️ Partial | ⚠️ Partial |
| Bundle Size | 🎯 <50KB | ❌ >150KB | ❌ >200KB | ✅ <85KB |

## 🚨 Common Pitfalls to Avoid

### DON'T
- Add UI components (let developers choose)
- Make style decisions (no CSS frameworks)
- Include demo data (use factories/seeds)
- Couple services (keep them independent)
- Skip monitoring (observe everything)

### DO
- Provide contracts and interfaces
- Focus on backend excellence
- Document every decision
- Test at production scale
- Monitor from day one

## 📊 Quality Metrics

### Code Quality
- **TypeScript Coverage**: 100%
- **Test Coverage**: >80%
- **Documentation Coverage**: 100%
- **Lighthouse Score**: 95+
- **Security Headers**: A+

### Performance Budget
```javascript
// Enforced via CI/CD
export const performanceBudget = {
  javascript: 50 * 1024,        // 50KB
  css: 10 * 1024,               // 10KB
  images: 100 * 1024,           // 100KB per image
  total: 200 * 1024,            // 200KB total
  requests: 10,                 // Max requests
  ttfb: 200,                    // 200ms
  fcp: 1000,                    // 1s
  lcp: 2500,                    // 2.5s
  cls: 0.1,                     // 0.1
  inp: 200,                     // 200ms
};
```

## 🎬 Next Actions

### Immediate (This Week)
1. Remove all UI components from `/src/components/website-examples/`
2. Create contract interfaces in `/src/contracts/`
3. Add Prisma and create base schema
4. Implement NextAuth v5
5. Setup Redis with Upstash

### Short Term (Month 1)
1. Complete all Phase 1 infrastructure
2. Add monitoring and observability
3. Create CLI tool
4. Write documentation
5. Setup CI/CD with performance gates

### Long Term (Quarter)
1. Reach <50KB bundle size
2. Add advanced features (WebSockets, GraphQL)
3. Create migration tools from other frameworks
4. Build ecosystem of plugins
5. Achieve 10,000+ GitHub stars

---

*This document represents the vision for transforming Vibecode Website Template into Vibecode Infrastructure Template - a true 10/10 production-ready backend infrastructure that developers can build upon with any UI library of their choice.*