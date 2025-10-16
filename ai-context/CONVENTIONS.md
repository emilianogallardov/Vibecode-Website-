# Conventions

## File Structure
```
src/
  app/           # Your application code
    components/  # Reusable UI components
    pages/       # Page components
    hooks/       # Custom React hooks
    utils/       # Helper functions
  examples/      # Complete example apps (DO NOT MODIFY)
  patterns/      # Reusable patterns to copy
```

## Naming Conventions

### Files
- React Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Hooks: `camelCase.ts` starting with 'use' (e.g., `useAuth.ts`)
- Utils: `camelCase.ts` (e.g., `formatDate.ts`)
- Tests: `[name].test.tsx` (e.g., `Button.test.tsx`)

### Variables & Functions
- Components: PascalCase (e.g., `function UserCard()`)
- Functions: camelCase (e.g., `function getUserData()`)
- Constants: UPPER_SNAKE_CASE (e.g., `const MAX_ITEMS = 10`)
- Event handlers: start with 'handle' (e.g., `handleClick`)

## Import Order
1. React imports
2. Third-party libraries
3. Local components
4. Local utilities
5. Types
6. Styles

Example:
```tsx
import React, { useState } from 'react';
import { useRouter } from 'react-router-dom';
import Button from '@/app/components/Button';
import { formatDate } from '@/app/utils/date';
import type { User } from '@/app/types';
import './styles.css';
```

## TypeScript
- Always use TypeScript for new files
- Define types for props and state
- Prefer interfaces over types for objects
- Use enums for fixed sets of values

## Styling
- Use Tailwind CSS classes
- Keep custom CSS minimal
- Use consistent spacing (4, 8, 12, 16, 24, 32, 48, 64)
- Mobile-first responsive design

## Git Commits
- Use present tense ("Add feature" not "Added feature")
- Keep commits small and focused
- Reference issue numbers when applicable