// src/components/Buttons/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

// Extend Jest matchers with Testing Library's custom matchers
import '@testing-library/jest-dom';

describe('Button Component', () => {
  // Test 1: Render the button with default props
  it('renders button with default props correctly', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveTextContent('Click me');
  });

  // Test 2: Renders button with custom className
  it('applies custom className to button', () => {
    const customClass = 'bg-blue-500 text-white';
    render(<Button className={customClass}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(customClass);
    expect(button).toHaveClass('px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2');
  });

  // Test 3: Handles onClick event
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 4: Disables button and applies correct styles when disabled
  it('disables button and applies disabled styles', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveClass('cursor-not-allowed opacity-50');
    expect(button).not.toHaveClass('cursor-pointer');
  });

  // Test 5: Does not call onClick when disabled
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 6: Supports different button types
  it('renders with specified type attribute', () => {
    const types = ['submit', 'reset'] as const;
    types.forEach((type) => {
      const { rerender } = render(<Button type={type}>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveAttribute('type', type);
      // Rerender to ensure no side effects from previous render
      rerender(<Button type={type === 'submit' ? 'reset' : 'submit'}>Click me</Button>);
    });
  });

  // Test 7: Passes through additional HTML attributes
  it('passes through additional HTML attributes', () => {
    render(<Button data-test="custom-attr">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('data-test', 'custom-attr');
  });

  // Test 8: Handles edge case with no children
  it('renders without crashing when no children are provided', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2');
  });
});