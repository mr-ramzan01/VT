'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-opacity-50';
    
    const variantStyles = {
      primary: 'bg-[#8A2BE2] text-white hover:bg-opacity-90 focus:ring-[#8A2BE2]',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      outline: 'border border-[#DDDDDD] bg-white text-[#1B1B1B] hover:bg-[#8A2BE2] hover:text-white hover:border-[#8A2BE2] focus:ring-[#8A2BE2]',
      social: 'border border-[#DDDDDD] bg-[#E5E7EB] text-[#1B1B1B] hover:bg-gray-200 focus:ring-gray-400',
    };
    
    const sizeStyles = {
      sm: 'text-xs px-3 py-2',
      md: 'text-sm px-4 py-2.5',
      lg: 'text-sm px-6 py-3',
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    
    const disabledStyles = (disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : '';

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          disabledStyles,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 