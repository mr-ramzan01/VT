'use client';

import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const { isAuthenticated } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   // Redirect to connect page if already authenticated
  //   if (isAuthenticated) {
  //     router.push('/connect');
  //   }
  // }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Authentication image sidebar */}
      <div className="md:flex md:w-1/2 justify-center items-center relative m-4 rounded-lg overflow-hidden">
        {/* <div className="p-8 flex justify-center items-center"> */}
          {/* Payment app mockup with crypto and cash illustrations */}
          {/* <div className="relative w-full max-w-md"> */}
            {/* We can use a placeholder here until we have the actual image */}
            {/* <div className="aspect-[4/5] bg-blue-400 bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-4">💱</div>
                <div className="text-lg font-bold">Crypto Payment App</div>
                <div className="mt-2 opacity-80">Digitize and manage your assets</div>
              </div>
            </div> */}
            <Image src="/images/login_main.jpg" alt="Auth Image" fill className="object-cover" />
          {/* </div> */}
        {/* </div> */}
      </div>

      {/* Authentication form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
} 