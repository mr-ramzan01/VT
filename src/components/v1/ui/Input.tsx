'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { themeConfig } from '@/config/theme.config';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // For select/dropdown type
  isSelect?: boolean;
  options?: Array<{ value: string; label: string }>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = true,
      type = 'text',
      leftIcon,
      rightIcon,
      isSelect = false,
      options = [],
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label
            className={`block mb-1 text-xs font-medium text-[${themeConfig.colors.inputLabel}]`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          {isSelect ? (
            // Render a select element
            <select
              className={clsx(
                `w-full rounded-md border border-[${themeConfig.colors.inputBorder}] bg-[${themeConfig.colors.inputBackground}] py-2.5 px-3 text-sm text-[${themeConfig.colors.inputText}] focus:outline-none focus:ring-1 focus:ring-[${themeConfig.colors.primary}] focus:border-[${themeConfig.colors.primary}] appearance-none`,
                leftIcon && 'pl-10',
                'pr-10', // Always have space for the dropdown icon
                error && `border-red-500 focus:ring-red-500`,
                className
              )}
              // @ts-ignore - we're intentionally passing props to a select element
              {...props}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            // Render a regular input element
            <input
              ref={ref}
              type={inputType}
              className={clsx(
                `w-full rounded-md border border-[${themeConfig.colors.inputBorder}] bg-[${themeConfig.colors.inputBackground}] py-2.5 px-3 text-sm text-[${themeConfig.colors.inputText}] placeholder:text-[${themeConfig.colors.inputText}] focus:outline-none focus:ring-1 focus:ring-[${themeConfig.colors.primary}] focus:border-[${themeConfig.colors.primary}]`,
                leftIcon && 'pl-10',
                (rightIcon || isPassword) && 'pr-10',
                error && `border-red-500 focus:ring-red-500`,
                className
              )}
              {...props}
            />
          )}
          
          {isPassword && !isSelect && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className={`absolute inset-y-0 right-0 flex items-center pr-3 text-[${themeConfig.colors.inputText}]`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {isSelect && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={16} className={`text-[${themeConfig.colors.inputText}]`} />
            </div>
          )}
          
          {rightIcon && !isPassword && !isSelect && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 