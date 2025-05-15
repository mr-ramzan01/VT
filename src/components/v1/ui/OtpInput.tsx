'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value = '',
  onChange,
  error,
}) => {
  const [otp, setOtp] = useState<string[]>(
    value.split('').concat(Array(length - value.length).fill(''))
  );
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Update the OTP array when the value prop changes
    setOtp(value.split('').concat(Array(length - value.length).fill('')));
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // Only accept digits
    if (!/^\d*$/.test(val)) return;
    
    // Take only the last digit if multiple are pasted
    const digit = val.slice(-1);
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    
    // Emit change
    onChange(newOtp.join(''));
    
    // Move to next input if value is entered
    if (digit && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Move focus with arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only accept digits
    if (!/^\d*$/.test(pastedData)) return;
    
    // Take only up to the required length
    const digits = pastedData.slice(0, length).split('');
    
    // Update the OTP array
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < length) {
        newOtp[idx] = digit;
      }
    });
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center gap-2">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ''}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-xl font-bold rounded-md border border-[#DDDDDD] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            }`}
            autoComplete="off"
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-center text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default OtpInput; 