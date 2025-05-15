import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names together and resolves Tailwind CSS conflicts
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-500')
 * 
 * @example
 * // With conditional classes
 * cn('text-base', isLarge && 'text-lg', {'text-red-500': isError})
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 