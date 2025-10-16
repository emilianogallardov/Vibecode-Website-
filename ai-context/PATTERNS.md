# Coding Patterns

## Component Structure
```tsx
// Always use function components
function MyComponent() {
  // State at the top
  const [value, setValue] = useState('');
  
  // Event handlers next
  const handleClick = () => {
    setValue('clicked');
  };
  
  // Render last
  return <div onClick={handleClick}>{value}</div>;
}
```

## File Naming
- Components: PascalCase (e.g., `UserCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase with `.types.ts` extension
- Tests: Same name with `.test.tsx` extension

## State Management
- Use `useState` for local component state
- Use Context API for shared state (see examples)
- Keep state as close to where it's used as possible

## API Calls
```tsx
// Always handle loading and error states
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

## Error Handling
- Always provide user-friendly error messages
- Use try-catch for async operations
- Show loading states during operations
- Provide fallback UI for errors

## Testing
- Test user interactions, not implementation
- Each component should have at least one test
- Focus on happy path first, edge cases second