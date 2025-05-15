'use client';

import React from 'react';
import { clsx } from 'clsx';
import { themeConfig } from '@/config/theme.config';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'ref'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = true,
      options,
      placeholder = 'Select an option',
      leftIcon,
      ...props
    },
    ref
  ) => {
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
          <select
            ref={ref}
            className={clsx(
              `w-full rounded-md border border-[${themeConfig.colors.inputBorder}] bg-[${themeConfig.colors.inputBackground}] py-2.5 px-3 text-sm text-[${themeConfig.colors.inputText}] focus:outline-none focus:ring-1 focus:ring-[${themeConfig.colors.primary}] focus:border-[${themeConfig.colors.primary}] appearance-none`,
              leftIcon && 'pl-10',
              'pr-10', // Always have space for the dropdown icon
              error && `border-red-500 focus:ring-red-500`,
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown size={16} className={`text-[${themeConfig.colors.inputText}]`} />
          </div>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 