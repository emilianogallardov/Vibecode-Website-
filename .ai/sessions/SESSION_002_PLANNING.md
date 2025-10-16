# Session 002: Component Migration Planning

**Date:** 2025-08-27  
**Duration:** ~1 hour  
**Participants:** Human (Senior Dev) + Claude  
**Objective:** Plan component migration from business-website-template

---

## Session Summary

Analyzed business-website-template project to identify reusable components and utilities for Vibecode template while maintaining minimal, bulletproof philosophy.

## Source Project Analysis

### business-website-template Stats
- **Runtime deps:** 11+ (too many)
- **Key files reviewed:**
  - src/lib/utils.ts (417 lines)
  - src/components/ui/Button.tsx
  - src/components/ui/Card.tsx
  - src/components/ui/Input.tsx
  - src/lib/api-client.ts

### What We Found Valuable
1. **cn utility** with tailwind-merge
2. **Storage helpers** (localStorage wrapper)
3. **Format utilities** (Intl-based)
4. **Card component** (clean, composable)
5. **Button/Input** (need simplification)

### What We'll Skip
1. ❌ React Hook Form integration
2. ❌ Framer Motion animations
3. ❌ Lucide React icons
4. ❌ Complex API retry logic
5. ❌ Analytics/monitoring code

## Migration Strategy

### Dependency Budget
**Current:** 5 (react, react-dom, react-router-dom, clsx, zod)  
**Add:** tailwind-merge only  
**New Total:** 6 (within limit of 10)

### File Splitting Plan

From monolithic utils.ts → Focused modules:

```
src/core/lib/
├── cn.ts          (~4 lines)
├── storage.ts     (~30 lines)
├── format.ts      (~40 lines)
├── constants.ts   (~5 lines)
└── api.ts         (~20 lines, simplified)
```

### Component Simplification

#### Button.tsx Changes
**Their version:** 7 variants, icons, complex loading  
**Our version:** 3 variants (primary/secondary/ghost), simple loading

#### Input.tsx Changes
**Their version:** Icon support, complex wrapper  
**Our version:** Basic input with error state only

#### Card.tsx
**Take as-is** - Already clean and composable

## Implementation Phases

### Phase 0: Get React Running (NEW)
```typescript
// Minimal working app first
src/main.tsx - Entry point
src/App.tsx - Root component
src/styles/globals.css - Tailwind imports
```

### Phase 1: Core Libraries
1. Install tailwind-merge
2. Create cn.ts utility
3. Add storage.ts helper
4. Add format.ts utilities
5. Create simple api.ts

### Phase 2: UI Components
1. Button (simplified)
2. Input (simplified)
3. Card (as-is)

### Phase 3: Wire Together
1. Create HomePage
2. Add routing
3. Test everything

## Code Examples Prepared

### cn.ts (Complete)
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### storage.ts (Edge-safe)
```typescript
export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  // set, remove methods...
};
```

## Risk Assessment

### Low Risk
- cn utility (battle-tested)
- Card component (no dependencies)
- Format utilities (native APIs)

### Medium Risk
- Button complexity (keep simple)
- Storage edge cases

### High Risk (Avoiding)
- Full utils.ts import
- Complex API client
- Form library integration

## ChatGPT Review Feedback

### Initial Recommendation
Suggested complex HTTP client with retry/idempotency

### Our Adjustment
Simplified to basic fetch wrapper, add complexity later if needed

### Final Consensus
- Keep it minimal for V1
- Add features via recipes
- Don't exceed 6 dependencies

## Decisions Made

### Will Implement
✅ cn utility with tailwind-merge  
✅ Basic storage helpers  
✅ Simple format utilities  
✅ Card component (unchanged)  
✅ Simplified Button/Input  

### Won't Implement
❌ Debounce/throttle (recipe)  
❌ Complex HTTP retry  
❌ Form library binding  
❌ Animation utilities  
❌ Icon components  

### Dependencies
✅ Add: tailwind-merge  
❌ Skip: Everything else  

## Quality Criteria

### Each Component Must
- Be under 100 lines
- Have forwardRef support
- Include accessibility attributes
- Use semantic HTML
- Support className override

### Each Utility Must
- Be edge-safe (SSR compatible)
- Have fallback behavior
- Not throw errors
- Be tree-shakeable
- Be under 50 lines

## Next Steps

1. **Immediate**
   - Create minimal React app
   - Verify it runs with npm run dev

2. **Then**
   - Add tailwind-merge dependency
   - Create core utilities
   - Add UI components

3. **Finally**
   - Wire up routing
   - Create example pages
   - Test everything

## Time Estimate

- Phase 0 (React setup): 30 min
- Phase 1 (Utilities): 1 hour  
- Phase 2 (Components): 1 hour
- Phase 3 (Integration): 30 min
- **Total: 3 hours**

## Success Metrics

### V1 Ships When
- ✅ npm run dev works
- ✅ Button, Card, Input render
- ✅ Utilities imported and working
- ✅ Bundle < 150KB
- ✅ 6 dependencies max

## Notes for Implementation

1. Start with .js if TypeScript gives issues
2. Test each utility in isolation
3. Keep components neutral (no brand colors)
4. Document any deviations
5. Commit after each phase

---

**Session Status:** ✅ Complete  
**Ready for:** Implementation  
**Next Session:** Write actual code  
**Confidence Level:** High - clear plan