# Lazy Loader Components

A comprehensive lazy loading solution for React applications with skeleton loaders, intersection observer support, and smooth animations.

## Components

### LazyLoader
The main lazy loading wrapper component that uses Intersection Observer API to load content when it comes into view.

**Props:**
- `children` - Content to be lazy loaded
- `fallback` - Custom fallback component (defaults to SkeletonLoader)
- `threshold` - Intersection threshold (default: 0.1)
- `rootMargin` - Root margin for intersection (default: '50px')
- `className` - Additional CSS classes
- `style` - Inline styles

**Example:**
```jsx
<LazyLoader threshold={0.1} rootMargin="100px">
  <div>Your content here</div>
</LazyLoader>
```

### SkeletonLoader
A skeleton loading component with different types and animations.

**Props:**
- `type` - Type of skeleton ('card', 'image', 'text', 'circle')
- `width` - Width of the skeleton
- `height` - Height of the skeleton
- `className` - Additional CSS classes

**Example:**
```jsx
<SkeletonLoader type="card" height="300px" />
```

### LoadingSpinner
An animated loading spinner with customizable size and text.

**Props:**
- `size` - Size of spinner ('small', 'medium', 'large')
- `text` - Loading text to display
- `showText` - Whether to show text (default: true)
- `className` - Additional CSS classes

**Example:**
```jsx
<LoadingSpinner size="large" text="Loading content..." />
```

### LazyImage
A lazy loading image component with placeholder support.

**Props:**
- `src` - Image source URL
- `alt` - Alt text for accessibility
- `className` - Additional CSS classes
- `placeholder` - Custom placeholder component
- `onLoad` - Load event handler
- `onError` - Error event handler

**Example:**
```jsx
<LazyImage
  src="image.jpg"
  alt="Description"
  placeholder={<div>Loading...</div>}
/>
```

## Features

- **Intersection Observer**: Efficient scroll-based lazy loading
- **Skeleton Animations**: Smooth loading states with pulse animations
- **Error Handling**: Graceful fallbacks for failed image loads
- **Customizable**: Flexible props for different use cases
- **Performance**: Optimized for large lists and image galleries
- **Accessibility**: Proper alt text and loading states

## Usage in Awards Page

The Awards page now includes:

1. **Enhanced Loading State**: Beautiful loading spinner with progress indicator
2. **Lazy Loaded Cards**: Each award card loads as it comes into view
3. **Image Lazy Loading**: Award images load with smooth transitions
4. **Staggered Animations**: Cards appear with a staggered fade-in effect
5. **Skeleton Placeholders**: Realistic loading placeholders for better UX

## Performance Benefits

- **Reduced Initial Load Time**: Only visible content loads initially
- **Bandwidth Savings**: Images load only when needed
- **Smooth Scrolling**: No layout shifts during loading
- **Better User Experience**: Visual feedback during loading states

## Browser Support

- Modern browsers with Intersection Observer support
- Graceful degradation for older browsers
- Mobile-friendly touch interactions

## Customization

You can customize the appearance by:

1. Modifying the CSS classes in the components
2. Creating custom skeleton loaders
3. Adjusting animation timings
4. Changing intersection observer settings

## Examples

See `LazyLoaderDemo.jsx` for comprehensive examples of all components in action.
