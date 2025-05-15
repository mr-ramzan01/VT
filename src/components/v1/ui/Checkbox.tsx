'use client';

import React from 'react';
import { clsx } from 'clsx';
import { themeConfig } from '@/config/theme.config';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            `h-3.5 w-3.5 rounded border-[${themeConfig.colors.inputBorder}] text-[${themeConfig.colors.primary}] focus:ring-1 focus:ring-[${themeConfig.colors.primary}] focus:ring-opacity-50`,
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {label && (
          <label
            className="ml-2 text-xs font-medium text-black"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 