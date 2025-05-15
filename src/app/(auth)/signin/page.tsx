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
import Checkbox from '@/components/v1/ui/Checkbox';
import SocialLoginButton from '@/components/v1/ui/SocialLoginButton';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { loginUser, clearError, clearMessage } from '@/store/slices/authSlice';

// Form schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
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
    }
  }, [error, message, dispatch]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resultAction = await dispatch(loginUser({ 
        email: data.email, 
        password: data.password 
      }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        router.push('/connect');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  const handleMicrosoftLogin = () => {
    // Implement Microsoft login logic
    console.log('Microsoft login clicked');
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Log In</h1>
        <p className="text-[#1B1B1B] text-sm">
          Welcome to Vtrade - Securely access your account and manage<br />
          tokenized assets effortlessly.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <Checkbox
            label="Remember me"
            {...register('rememberMe')}
          />
          <Link 
            href="/forgot-password" 
            className="text-[#8A2BE2] text-xs font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Log In
        </Button>

        <div className="relative flex items-center justify-center my-5">
          <div className="absolute w-full border-t border-[#EDEDED]"></div>
          <div className="relative bg-white px-4 text-xs text-gray-500">or</div>
        </div>

        <div className="space-y-3">
          <SocialLoginButton
            provider="google"
            onClick={handleGoogleLogin}
          />
          
          <SocialLoginButton
            provider="microsoft"
            onClick={handleMicrosoftLogin}
          />
        </div>

        <div className="text-center text-xs mt-5">
          <span className="text-gray-600">Don&apos;t have an account?</span>{' '}
          <Link 
            href="/signup" 
            className="text-[#8A2BE2] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
} 