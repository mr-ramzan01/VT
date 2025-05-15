'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // For testing purposes, redirect to onboarding page
    // Comment out this line and uncomment the code below for production use
    router.push('/onboarding');
    
    // Redirect to connect page if authenticated, otherwise to signin
    /*
    if (isAuthenticated) {
      router.push('/connect');
    } else {
      router.push('/signin');
    }
    */
  }, [isAuthenticated, router]);

  return null; // No UI needed as we're redirecting
}
