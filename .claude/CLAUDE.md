# Stargarden Project Guidelines

## Project Overview

Stargarden is a modern static site built with Astro, React 19, TypeScript, TailwindCSS v4, and DaisyUI v5. This project emphasizes type safety, modern React patterns, and comprehensive testing.

## Technology Stack

- **Framework**: Astro v5.7+ (Static Site Generator)
- **UI Library**: React 19.x (functional components only)
- **Styling**: TailwindCSS v4 + DaisyUI v5
- **Language**: TypeScript 5.8+
- **Testing**: Vitest v3 (unit/component) + Playwright (e2e)
- **Icons**: Heroicons React

## Core Development Guidelines

### Code Quality & Documentation

1. **Always use JSDoc comments** to document:
   - All exported functions with parameter descriptions and return types
   - Complex type definitions and interfaces
   - Component props with descriptions

   Example:
   ```typescript
   /**
    * Fetches user data from the API
    * @param userId - The unique identifier for the user
    * @returns Promise containing user data or null if not found
    */
   async function getUserData(userId: string): Promise<User | null> { ... }
   ```

2. **Prefer TypeScript Generics** over `any` type where pragmatic:
   - Use generics for reusable components and functions
   - Type narrow instead of using `any`
   - Use `unknown` when the type is truly unknown and needs runtime checking

### React Development

1. **Always use functional components** - No class components
2. **Leverage React 19.x features**:
   - Use hooks appropriately (useState, useEffect, useCallback, useMemo, etc.)
   - Utilize React 19 optimizations and new APIs
   - Prefer React's built-in features over third-party alternatives when available

### Styling Guidelines

1. **Use TailwindCSS v4** utility classes for styling
2. **Use DaisyUI v5** components and themes:
   - Leverage DaisyUI component classes (btn, card, modal, etc.)
   - Follow DaisyUI theming conventions
   - Use semantic color classes (primary, secondary, accent, etc.)

### Testing Requirements

1. **Use Vitest v3** for all React component and unit tests:
   - Write tests for all new components
   - Use React Testing Library patterns
   - Mock external dependencies appropriately
   - Aim for meaningful test coverage, not just high percentages

2. **Use Playwright** for end-to-end tests:
   - Test critical user flows
   - Ensure tests are reliable and not flaky

### Git & Commits

1. **Always use Conventional Commits** format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `chore:` for maintenance tasks
   - `refactor:` for code refactoring
   - `test:` for test additions/changes
   - `style:` for formatting changes

   Examples:
   - `feat(blog): add tag filtering functionality`
   - `fix(navigation): resolve mobile menu overlap issue`
   - `docs(readme): update installation instructions`

2. **Always use GH CLI** for GitHub operations:
   - If GH CLI is not available, ask the user for alternatives
   - Prefer `gh` commands for PR creation, issue management, etc.

### Content Guidelines

1. **Always use Markdown** for posts and content:
   - Follow consistent heading hierarchy
   - Use proper markdown formatting
   - Include frontmatter when required by Astro content collections

### Code Completion Standards

1. **Always provide completed, functioning code**:
   - Never commit partial implementations that break the build
   - Ensure all imports are resolved
   - Test changes before committing
   - Fix any TypeScript errors before considering work complete

2. **Use existing patterns** in the codebase:
   - Review similar implementations before creating new ones
   - Follow established naming conventions
   - Maintain consistency with existing architecture
   - When in doubt, ask rather than introducing new patterns

## Development Workflow

### Before Starting Work
1. Review existing code patterns for similar features
2. Check for existing components/utilities that can be reused
3. Understand the current architecture and file structure

### During Development
1. Write TypeScript types/interfaces first
2. Implement functionality with proper error handling
3. Add JSDoc comments as you code
4. Write tests alongside implementation
5. Use meaningful variable and function names

### Before Committing
1. Run `npm test` to ensure all tests pass
2. Run `npm run build` to verify the build succeeds
3. Review your changes for any console errors or warnings
4. Ensure code follows the project's style guidelines
5. Write a clear conventional commit message

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run Vitest tests
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run test:ci` - Build and run e2e tests (CI)

## Additional Resources

For specific tasks, consider using specialized skills:
- Use the `test` skill for creating comprehensive component tests
- Use the `style` skill for implementing TailwindCSS/DaisyUI patterns
