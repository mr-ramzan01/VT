'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/v1/ui/Button';
import OtpInput from '@/components/v1/ui/OtpInput';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { verifyOtp, forgotPassword, clearError, clearMessage } from '@/store/slices/authSlice';

// Form schema
const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, message, emailForReset } = useAppSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = watch('otp');

  // Timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      
      // Redirect to reset password page or connect page based on flow
      if (emailForReset) {
        router.push('/reset-password');
      } else {
        router.push('/connect');
      }
    }
  }, [error, message, dispatch, router, emailForReset]);

  // Check if email for reset exists, if not, redirect to signin
  useEffect(() => {
    if (!emailForReset) {
      router.push('/signin');
    }
  }, [emailForReset, router]);

  const handleOtpChange = useCallback((value: string) => {
    setValue('otp', value);
  }, [setValue]);

  const resendOtp = async () => {
    if (!canResend || !emailForReset) return;
    
    try {
      await dispatch(forgotPassword(emailForReset));
      setTimeLeft(30);
      setCanResend(false);
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  const onSubmit = async (data: OtpFormValues) => {
    if (!emailForReset) {
      toast.error('Email not found. Please request OTP again.');
      return;
    }

    try {
      await dispatch(verifyOtp({
        email: emailForReset,
        otp: data.otp,
      }));
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Enter OTP</h1>
        <p className="text-[#1B1B1B] text-sm">
          Enter the OTP that we have sent to your email address<br />
          {emailForReset && <span className="font-medium">{emailForReset}</span>}
        </p>
      </div>

      <div className="text-center mb-4">
        <Link 
          href="/forgot-password" 
          className="text-[#8A2BE2] text-sm font-medium hover:underline"
        >
          Change Email Address
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <OtpInput
          length={6}
          value={otpValue}
          onChange={handleOtpChange}
          error={errors.otp?.message}
        />

        <div className="flex justify-center items-center mt-4">
          {canResend ? (
            <button
              type="button"
              onClick={resendOtp}
              className="text-[#8A2BE2] text-sm font-medium hover:underline"
            >
              Resend Code
            </button>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{timeLeft} Sec</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={otpValue.length !== 6}
        >
          Continue
        </Button>
      </form>
    </div>
  );
} 