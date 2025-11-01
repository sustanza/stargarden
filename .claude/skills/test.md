# Test Skill - React Component Testing with Vitest v3

## Purpose
This skill guides you through creating comprehensive tests for React components using Vitest v3 and React Testing Library.

## Testing Framework Setup

This project uses:
- **Vitest v3** - Fast, modern test runner
- **jsdom** - DOM environment for component testing
- **React Testing Library** - Testing utilities for React components

## Test File Structure

### Location
Place test files adjacent to the component being tested:
```
src/
  components/
    Button.tsx
    Button.test.tsx  ← Test file here
```

### File Naming Convention
- Unit tests: `*.test.ts` or `*.test.tsx`
- Component tests: `ComponentName.test.tsx`

## React Component Testing Pattern

### Basic Component Test Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions correctly', async () => {
    const mockHandler = vi.fn();
    render(<ComponentName onClick={mockHandler} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('displays correct content based on props', () => {
    const { rerender } = render(<ComponentName title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(<ComponentName title="Updated" />);
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
```

## Testing Best Practices

### 1. Query Priority (React Testing Library)

Use queries in this order of preference:
1. **getByRole** - Most accessible (buttons, links, inputs)
2. **getByLabelText** - Form fields with labels
3. **getByPlaceholderText** - Form inputs with placeholders
4. **getByText** - Non-interactive elements with text
5. **getByTestId** - Last resort, use data-testid attribute

Example:
```typescript
// ✅ Good - Accessible queries
const button = screen.getByRole('button', { name: /submit/i });
const input = screen.getByLabelText(/email address/i);

// ❌ Avoid - Non-semantic queries
const button = screen.getByTestId('submit-button');
```

### 2. Testing User Interactions

```typescript
import { fireEvent, userEvent } from '@testing-library/react';

// For simple interactions
fireEvent.click(screen.getByRole('button'));

// For more realistic user interactions (preferred)
await userEvent.click(screen.getByRole('button'));
await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
```

### 3. Async Testing with waitFor

```typescript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<DataComponent />);

  await waitFor(() => {
    expect(screen.getByText(/loaded data/i)).toBeInTheDocument();
  });
});
```

### 4. Mocking Functions and Modules

```typescript
import { vi } from 'vitest';

// Mock a function
const mockFn = vi.fn();

// Mock a module
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' }))
}));

// Spy on a function
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
```

### 5. Testing React Hooks

```typescript
import { renderHook, act } from '@testing-library/react';

it('updates state correctly', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## What to Test

### ✅ DO Test
- Component renders without errors
- Correct output based on props
- User interactions trigger expected behavior
- Conditional rendering logic
- Accessibility attributes
- Error states and edge cases
- Integration between multiple components

### ❌ DON'T Test
- Implementation details (internal state variable names)
- Third-party library internals
- CSS styles (use visual regression testing instead)
- Exact DOM structure (test behavior, not implementation)

## Common Testing Scenarios

### Testing Forms
```typescript
it('submits form with correct data', async () => {
  const mockSubmit = vi.fn();
  render(<ContactForm onSubmit={mockSubmit} />);

  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });
});
```

### Testing Conditional Rendering
```typescript
it('shows loading state while fetching data', async () => {
  render(<DataDisplay />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.getByText(/data loaded/i)).toBeInTheDocument();
  });
});
```

### Testing Error States
```typescript
it('displays error message on failure', async () => {
  const mockFetch = vi.fn(() => Promise.reject(new Error('Failed')));

  render(<DataComponent fetchData={mockFetch} />);

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/failed/i);
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.tsx
```

## Test Coverage Guidelines

- Aim for meaningful coverage, not just high percentages
- Prioritize testing critical user paths
- Test edge cases and error conditions
- Don't sacrifice test quality for coverage numbers

## Troubleshooting

### Common Issues

1. **"Not wrapped in act(...)" warning**
   - Ensure async updates are wrapped in `waitFor` or `act`
   - Use `async/await` with user interactions

2. **"Unable to find element" errors**
   - Check query priority - use accessible queries
   - Use `screen.debug()` to see current DOM
   - Verify element is rendered before querying

3. **Flaky tests**
   - Avoid using arbitrary timeouts
   - Use `waitFor` for async operations
   - Ensure proper cleanup between tests

## Task Checklist

When creating tests for a component:
- [ ] Create test file with proper naming convention
- [ ] Import necessary testing utilities
- [ ] Test basic rendering
- [ ] Test all user interactions
- [ ] Test conditional rendering based on props
- [ ] Test error states
- [ ] Test accessibility (roles, labels, aria attributes)
- [ ] Mock external dependencies
- [ ] Verify tests pass with `npm test`
- [ ] Check test coverage for the component
