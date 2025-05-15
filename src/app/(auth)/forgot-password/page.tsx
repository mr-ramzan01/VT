'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/v1/ui/Input';
import Button from '@/components/v1/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { forgotPassword, clearError, clearMessage } from '@/store/slices/authSlice';

// Form schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      // Redirect to OTP verification page
      router.push('/verify-otp');
    }
  }, [error, message, dispatch, router]);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await dispatch(forgotPassword(data.email));
    } catch (err) {
      console.error('Forgot password request failed:', err);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
        <p className="text-[#1B1B1B] text-sm">
          Enter your email to receive a password recovery code
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Submit
        </Button>

        <div className="text-center mt-4">
          <Link 
            href="/signin" 
            className="text-[#8A2BE2] text-sm font-medium hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
} 