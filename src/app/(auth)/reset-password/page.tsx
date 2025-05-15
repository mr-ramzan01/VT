'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/v1/ui/Input';
import Button from '@/components/v1/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetPassword, clearError, clearMessage, clearEmailForReset } from '@/store/slices/authSlice';

// Form schema with password validation requirements
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[0-9]/, 'Password must include at least 1 number')
    .regex(/[A-Z]/, 'Password must include at least 1 uppercase letter')
    .regex(/[^a-zA-Z0-9]/, 'Password must include at least 1 special symbol'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, message, emailForReset } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
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
      dispatch(clearEmailForReset());
      // Redirect to signin page
      router.push('/signin');
    }
  }, [error, message, dispatch, router]);

  // Check if email for reset exists, if not, redirect to signin
  useEffect(() => {
    if (!emailForReset) {
      router.push('/signin');
    }
  }, [emailForReset, router]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!emailForReset) {
      toast.error('Session expired. Please request password reset again.');
      return;
    }

    try {
      await dispatch(resetPassword({
        email: emailForReset,
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: 'dummy-token', // In a real app, this would come from the URL or state
      }));
    } catch (err) {
      console.error('Password reset failed:', err);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="text-[#1B1B1B] text-sm">
          Don&apos;t worry! Resetting your password is quick and easy. Just enter<br />
          a new one below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <div className="flex items-start mt-2 text-xs text-gray-600">
          <svg className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <span>At least 12 symbols, including 1 number, 1 caps and 1 special symbol</span>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mt-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
} 