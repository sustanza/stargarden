# Style Skill - TailwindCSS v4 & DaisyUI v5 Styling Guide

## Purpose
This skill provides comprehensive guidance for styling components using TailwindCSS v4 and DaisyUI v5 in the Stargarden project.

## Technology Stack

- **TailwindCSS v4** - Utility-first CSS framework
- **DaisyUI v5** - Component library built on Tailwind
- **@tailwindcss/typography** - Beautiful typographic defaults for markdown

## Core Styling Philosophy

1. **Utility-First**: Use Tailwind utility classes directly in JSX
2. **Component-Based**: Leverage DaisyUI components for common patterns
3. **Responsive**: Mobile-first design with responsive breakpoints
4. **Consistent**: Follow DaisyUI's semantic color system
5. **Accessible**: Use semantic HTML and ARIA attributes

## DaisyUI v5 Component Classes

### Buttons

```tsx
// Basic button styles
<button className="btn">Button</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-link">Link</button>

// Button sizes
<button className="btn btn-lg">Large</button>
<button className="btn btn-md">Default</button>
<button className="btn btn-sm">Small</button>
<button className="btn btn-xs">Tiny</button>

// Button states
<button className="btn btn-disabled">Disabled</button>
<button className="btn loading">Loading</button>

// Button shapes
<button className="btn btn-circle">○</button>
<button className="btn btn-square">□</button>

// Button groups
<div className="btn-group">
  <button className="btn">One</button>
  <button className="btn">Two</button>
  <button className="btn">Three</button>
</div>
```

### Cards

```tsx
// Basic card
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content goes here</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>

// Card with image
<div className="card bg-base-100 shadow-xl">
  <figure>
    <img src="/image.jpg" alt="Description" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Description</p>
  </div>
</div>

// Compact card
<div className="card card-compact bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Compact</h2>
  </div>
</div>
```

### Forms

```tsx
// Input fields
<input
  type="text"
  placeholder="Type here"
  className="input input-bordered w-full max-w-xs"
/>

<input
  type="text"
  placeholder="Primary"
  className="input input-bordered input-primary"
/>

// Input sizes
<input className="input input-lg" />
<input className="input input-md" />
<input className="input input-sm" />
<input className="input input-xs" />

// Textarea
<textarea
  className="textarea textarea-bordered"
  placeholder="Bio"
></textarea>

// Select
<select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Pick one</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

// Checkbox
<input
  type="checkbox"
  className="checkbox checkbox-primary"
/>

// Radio
<input
  type="radio"
  name="radio-1"
  className="radio radio-primary"
/>

// Toggle
<input
  type="checkbox"
  className="toggle toggle-primary"
/>

// Range slider
<input
  type="range"
  min="0"
  max="100"
  className="range range-primary"
/>

// Form control (label + input wrapper)
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
  </label>
  <input
    type="text"
    placeholder="Type here"
    className="input input-bordered w-full max-w-xs"
  />
  <label className="label">
    <span className="label-text-alt">Helper text</span>
  </label>
</div>
```

### Alerts

```tsx
<div className="alert">
  <span>Default alert</span>
</div>

<div className="alert alert-info">
  <span>Info alert</span>
</div>

<div className="alert alert-success">
  <span>Success alert</span>
</div>

<div className="alert alert-warning">
  <span>Warning alert</span>
</div>

<div className="alert alert-error">
  <span>Error alert</span>
</div>
```

### Modals

```tsx
// Modal with dialog element
<dialog id="my_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

// Open modal with button
<button
  className="btn"
  onClick={() => document.getElementById('my_modal').showModal()}
>
  Open Modal
</button>
```

### Navigation

```tsx
// Navbar
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Brand</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li><a>Link</a></li>
    </ul>
  </div>
</div>

// Menu (sidebar)
<ul className="menu bg-base-200 w-56 rounded-box">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</ul>

// Breadcrumbs
<div className="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>

// Tabs
<div className="tabs">
  <a className="tab">Tab 1</a>
  <a className="tab tab-active">Tab 2</a>
  <a className="tab">Tab 3</a>
</div>
```

### Badges & Indicators

```tsx
// Badges
<span className="badge">Default</span>
<span className="badge badge-primary">Primary</span>
<span className="badge badge-secondary">Secondary</span>
<span className="badge badge-accent">Accent</span>
<span className="badge badge-ghost">Ghost</span>

// Badge sizes
<span className="badge badge-lg">Large</span>
<span className="badge badge-md">Default</span>
<span className="badge badge-sm">Small</span>
<span className="badge badge-xs">Tiny</span>

// Loading spinner
<span className="loading loading-spinner loading-lg"></span>
```

## TailwindCSS v4 Utilities

### Layout

```tsx
// Flexbox
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Container
<div className="container mx-auto px-4">
  Content
</div>
```

### Spacing

```tsx
// Margin & Padding scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
<div className="m-4 p-8">Content</div>
<div className="mt-2 mb-4 ml-3 mr-3">Content</div>
<div className="px-4 py-2">Content</div>

// Gap for flex/grid
<div className="flex gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### Typography

```tsx
// Text sizes
<p className="text-xs">Extra small</p>
<p className="text-sm">Small</p>
<p className="text-base">Base</p>
<p className="text-lg">Large</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2X large</p>
<p className="text-3xl">3X large</p>

// Font weights
<p className="font-thin">Thin</p>
<p className="font-normal">Normal</p>
<p className="font-medium">Medium</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>

// Text alignment
<p className="text-left">Left</p>
<p className="text-center">Center</p>
<p className="text-right">Right</p>

// Text colors (use DaisyUI semantic colors)
<p className="text-primary">Primary color</p>
<p className="text-secondary">Secondary color</p>
<p className="text-accent">Accent color</p>
<p className="text-base-content">Base content</p>
```

### Responsive Design

```tsx
// Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  Responsive grid
</div>

<div className="hidden md:block">
  Hidden on mobile, visible on tablet+
</div>
```

## DaisyUI Semantic Colors

Use these semantic color classes for consistent theming:

- **primary** - Main brand color
- **secondary** - Secondary brand color
- **accent** - Accent color for highlights
- **neutral** - Neutral color for text and borders
- **base-100, base-200, base-300** - Background colors
- **base-content** - Text color for base backgrounds
- **info** - Informational messages
- **success** - Success states
- **warning** - Warning messages
- **error** - Error states

## Best Practices

### 1. Mobile-First Approach
```tsx
// ✅ Good - Mobile first, then desktop
<div className="text-base lg:text-lg">

// ❌ Avoid - Desktop first
<div className="text-lg sm:text-base">
```

### 2. Semantic Color Usage
```tsx
// ✅ Good - Use semantic colors
<button className="btn btn-primary">Submit</button>

// ❌ Avoid - Hard-coded colors
<button className="btn bg-blue-500">Submit</button>
```

### 3. Consistent Spacing
```tsx
// ✅ Good - Consistent spacing scale
<div className="p-4 mb-4 gap-4">

// ❌ Avoid - Arbitrary values
<div className="p-[13px] mb-[17px]">
```

### 4. Component Reusability
```tsx
// ✅ Good - Extract repeated patterns
const PrimaryButton = ({ children, ...props }) => (
  <button className="btn btn-primary" {...props}>
    {children}
  </button>
);

// ❌ Avoid - Duplicating classes everywhere
```

### 5. Accessibility
```tsx
// ✅ Good - Accessible with semantic HTML
<button className="btn btn-primary" aria-label="Submit form">
  Submit
</button>

// ❌ Avoid - Non-semantic without ARIA
<div className="btn btn-primary" onClick={handleClick}>
  Submit
</div>
```

## Common Patterns

### Hero Section
```tsx
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">Welcome to our site</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

### Loading State
```tsx
<div className="flex items-center justify-center min-h-screen">
  <span className="loading loading-spinner loading-lg"></span>
</div>
```

### Error State
```tsx
<div className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Error! Task failed successfully.</span>
</div>
```

### Form Layout
```tsx
<form className="space-y-4">
  <div className="form-control w-full">
    <label className="label">
      <span className="label-text">Email</span>
    </label>
    <input
      type="email"
      placeholder="email@example.com"
      className="input input-bordered w-full"
    />
  </div>

  <div className="form-control w-full">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input
      type="password"
      placeholder="••••••••"
      className="input input-bordered w-full"
    />
  </div>

  <button className="btn btn-primary w-full">Submit</button>
</form>
```

## Integration with Heroicons

```tsx
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

<button className="btn btn-primary">
  Continue
  <ArrowRightIcon className="w-5 h-5 ml-2" />
</button>

<div className="badge badge-success gap-2">
  <CheckIcon className="w-4 h-4" />
  Verified
</div>
```

## Task Checklist

When styling a new component:
- [ ] Use DaisyUI components where applicable
- [ ] Apply mobile-first responsive design
- [ ] Use semantic color classes (primary, secondary, etc.)
- [ ] Ensure proper spacing using Tailwind scale
- [ ] Add appropriate hover/focus states
- [ ] Test on multiple screen sizes
- [ ] Verify accessibility (keyboard navigation, ARIA)
- [ ] Use Heroicons for icons where needed
- [ ] Maintain consistency with existing components
- [ ] Avoid arbitrary values unless absolutely necessary

## Resources

- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
- [DaisyUI v5 Docs](https://daisyui.com/)
- [Heroicons](https://heroicons.com/)
