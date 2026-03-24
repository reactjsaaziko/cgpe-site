import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LazyLoader, { SkeletonLoader, LoadingSpinner, LazyImage } from './LazyLoader';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('LazyLoader Components', () => {
  test('SkeletonLoader renders correctly', () => {
    render(<SkeletonLoader type="card" />);
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  test('LoadingSpinner renders correctly', () => {
    render(<LoadingSpinner size="large" text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('LazyImage renders with placeholder initially', () => {
    render(
      <LazyImage 
        src="test-image.jpg" 
        alt="Test image"
        placeholder={<div>Loading...</div>}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('LazyLoader renders fallback initially', () => {
    render(
      <LazyLoader fallback={<div>Loading content...</div>}>
        <div>Loaded content</div>
      </LazyLoader>
    );
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });
});
