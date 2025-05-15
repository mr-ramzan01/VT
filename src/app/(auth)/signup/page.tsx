'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/v1/ui/Input';
import Button from '@/components/v1/ui/Button';
import SocialLoginButton from '@/components/v1/ui/SocialLoginButton';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { clearError, clearMessage } from '@/store/slices/authSlice';
import IndividualTypeSelect from './components/IndividualTypeSelect';
import { signUp } from '@/services/userServices';

// Form schema with email or phone validation
const signupSchema = z.object({
  emailOrPhone: z.string().refine((value) => {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (simple international format)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value);
  }, {
    message: "Please enter a valid email or phone number",
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['investor', 'tokenizer']),
  individualType: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  // If userType is tokenizer, individualType is required
  if (data.userType === 'tokenizer') {
    return !!data.individualType;
  }
  return true;
}, {
  message: "Individual type is required for tokenizers",
  path: ["individualType"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error: reduxError, message } = useAppSelector((state) => state.auth);
  const [userType, setUserType] = useState<'investor' | 'tokenizer'>('investor');
  const [isEmail, setIsEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      userType: 'investor',
      individualType: '',
    },
  });
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  // Watch the email/phone input to detect type
  const emailOrPhone = watch('emailOrPhone');

  // Update input type based on value
  useEffect(() => {
    if (!emailOrPhone) return;
    // Check if the value looks like an email
    setIsEmail(emailOrPhone.includes('@'));
  }, [emailOrPhone]);

  useEffect(() => {
    if (reduxError) {
      toast.error(reduxError);
      dispatch(clearError());
    }
    if (apiError) {
      toast.error(apiError);
      setApiError(null);
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      // Redirect to OTP verification page
      router.push('/verify-otp');
    }
  }, [reduxError, apiError, message, dispatch, router]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsLoading(true);
      const isEmailValue = data.emailOrPhone.includes('@');
      
      // Prepare data for API call
      const email = isEmailValue ? data.emailOrPhone : null;
      const phone = !isEmailValue ? data.emailOrPhone.replace(/[^0-9+]/g, '') : null;
      const role = data.userType === 'investor' ? 'investor' : 'tokenizer';
      const individualType = data.userType === 'tokenizer' ? data.individualType : null;
      
      // Call signUp API function directly
      const response = await signUp(
        email as string, 
        phone ? Number(phone) : null, 
        data.password, 
        role, 
        individualType as string | null
      );
      
      if (response.success) {
        // Store user data and token if needed
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        toast.success('Account created successfully! Please verify your account.');
        router.push('/verify-otp');
      } else {
        setApiError(response.error?.message || 'Failed to create account. Please try again.');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeChange = (type: 'investor' | 'tokenizer') => {
    setUserType(type);
    setValue('userType', type);
  };

  const handleGoogleSignup = () => {
    // Implement Google signup logic
    console.log('Google signup clicked');
  };

  const handleMicrosoftSignup = () => {
    // Implement Microsoft signup logic
    console.log('Microsoft signup clicked');
  };

  return (
    <div>
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <p className="text-[#1B1B1B] text-sm">
          Sign up now and start digitizing your assets in minutes—<br />
          no coding required!
        </p>
      </div>

      {/* User type toggle buttons */}
      <div className="grid grid-cols-2 gap-x-3 mb-6 w-[60%] mx-auto border border-[#EDEDED] rounded-lg p-2">
        <button
          type="button"
          onClick={() => handleUserTypeChange('investor')}
          className={`py-2 text-center rounded-md text-sm font-medium transition-all ${
            userType === 'investor'
              ? 'bg-[#8A2BE2] text-white'
              : 'bg-white text-[#1B1B1B] hover:border hover:border-[#8A2BE2]'
          }`}
        >
          Invest
        </button>
        <button
          type="button"
          onClick={() => handleUserTypeChange('tokenizer')}
          className={`py-2 text-center rounded-md text-sm font-medium transition-all ${
            userType === 'tokenizer'
              ? 'bg-[#8A2BE2] text-white border border-[#8A2BE2]'
              : 'bg-white text-[#1B1B1B] hover:border hover:border-[#8A2BE2]'
          }`}
        >
          Tokenize
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Input
              label="Email/Phone"
              type={isEmail ? "email" : "tel"}
              placeholder="Enter Email or Phone Number"
              error={errors.emailOrPhone?.message}
              {...register('emailOrPhone')}
            />
          </div>

          {userType === 'tokenizer' && <IndividualTypeSelect />}

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
            <input
              type="hidden"
              {...register('userType')}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Sign Up
          </Button>

          <p className="text-center text-xs text-gray-600 mt-2">
            By clicking the Sign Up button, you agree to the{' '}
            <Link href="/terms" className="text-[#8A2BE2] hover:underline">
              terms and conditions
            </Link>{' '}
            &{' '}
            <Link href="/privacy" className="text-[#8A2BE2] hover:underline">
              privacy policy
            </Link>{' '}
            of our platform.
          </p>

          <div className="relative flex items-center justify-center my-5">
            <div className="absolute w-full border-t border-[#EDEDED]"></div>
            <div className="relative bg-white px-4 text-xs text-gray-500">or</div>
          </div>

          <div className="space-y-3">
            <SocialLoginButton
              provider="google"
              onClick={handleGoogleSignup}
              isSignUp={true}
            />
            
            <SocialLoginButton
              provider="microsoft"
              onClick={handleMicrosoftSignup}
              isSignUp={true}
            />
          </div>

          <div className="text-center text-xs mt-5">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link 
              href="/signin" 
              className="text-[#8A2BE2] font-medium hover:underline"
            >
              Log In
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
} 