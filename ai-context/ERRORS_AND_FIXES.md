# Common Errors and Fixes

## 1. Cannot read property 'map' of undefined

**What it means:** You're trying to loop over data that doesn't exist yet.

**Fix:**
```tsx
// Bad
data.map(item => ...)

// Good
data?.map(item => ...) || []
// or
{data && data.map(item => ...)}
```

**See example:** `src/examples/02-DataFetch/DataList.tsx`

---

## 2. React Hook useEffect has missing dependencies

**What it means:** useEffect depends on values you didn't list.

**Fix:**
```tsx
// Bad
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId

// Good
useEffect(() => {
  fetchData(userId);
}, [userId]); // Include all dependencies
```

---

## 3. Objects are not valid as a React child

**What it means:** You're trying to render an object directly.

**Fix:**
```tsx
// Bad
return <div>{user}</div>; // user is an object

// Good
return <div>{user.name}</div>; // Render specific properties
// or
return <div>{JSON.stringify(user)}</div>; // For debugging
```

---

## 4. Module not found

**What it means:** The import path is wrong or file doesn't exist.

**Fix:**
```tsx
// Check the path is correct
import Button from '@/app/components/Button';
// Make sure the file exists at: src/app/components/Button.tsx
```

---

## 5. Unexpected token '<'

**What it means:** You forgot to use JSX syntax or file extension is wrong.

**Fix:**
- Make sure file ends with `.tsx` not `.ts`
- Wrap JSX in return statement
- Check for missing closing tags

---

## 6. Too many re-renders

**What it means:** You're updating state in a way that causes infinite loops.

**Fix:**
```tsx
// Bad
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Infinite loop!
}

// Good
function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // Only on user action
  };
}
```

---

## 7. Invalid hook call

**What it means:** You're using hooks incorrectly.

**Rules:**
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Don't call hooks in loops or conditions

**Fix:**
```tsx
// Bad
if (condition) {
  useState(0); // Can't use hooks conditionally
}

// Good
const [value, setValue] = useState(0); // Always at top level
if (condition) {
  setValue(1); // Use the setter conditionally
}
```

---

## 8. CORS error when fetching data

**What it means:** The API doesn't allow requests from your domain.

**Fix:**
- Use the proxy in vite.config.ts
- Or use relative URLs like `/api/data`
- Or ask backend to add CORS headers

---

## 9. TypeScript error: Type 'X' is not assignable to type 'Y'

**What it means:** The types don't match.

**Fix:**
```tsx
// Define proper types
interface User {
  name: string;
  age: number;
}

// Use them consistently
const user: User = {
  name: 'John',
  age: 30, // Must be number, not string
};
```

---

## 10. useState not updating immediately

**What it means:** State updates are asynchronous.

**Fix:**
```tsx
// Bad
setCount(count + 1);
console.log(count); // Still shows old value

// Good
setCount(prev => prev + 1); // Use function form
// Or use useEffect to react to changes
useEffect(() => {
  console.log(count); // Shows new value
}, [count]);
```

---

## Need More Help?

1. Check the examples in `src/examples/`
2. Look for similar patterns in `src/patterns/`
3. Run `npm run help` for available commands
4. Search for the error message online