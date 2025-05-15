import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { 
  setShowWalletModal, 
  setTempWalletProvider,
  setWalletProvider,
  setWalletConnectingState,
  setWalletAddress,
  nextStep
} from '../../../../store/slices/onboardingSlice';
import { cn } from '../../../../utils/cn';
import { formatWalletAddress } from '../../../../utils/formatters';
import { useRef, useCallback, useEffect } from 'react';
import useClickOutside from '../../../../hooks/useClickOutside';
import { ErrorBoundary } from '../../../ErrorBoundary';
import Image from 'next/image';
import Lottie from 'lottie-react';
import loaderLottie from '../../../../assets/animations/loaderLottie.json';

// MetaMask interface
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: Array<unknown> }) => Promise<string[]>;
      on: (eventName: string, callback: (accounts: string[]) => void) => void;
      removeListener: (eventName: string, callback: (accounts: string[]) => void) => void;
    };
  }
}

export default function WalletConnectionModal() {
  const dispatch = useDispatch();
  const { 
    walletConnectingState, 
    selectedWalletProvider, 
    tempWalletProvider,
    walletAddress 
  } = useSelector((state: RootState) => state.onboarding);

  // Add debugging
  console.log('Wallet Modal State:', {
    walletConnectingState,
    selectedWalletProvider,
    tempWalletProvider,
    walletAddress
  });

  // Create ref for modal content
  const modalRef = useRef<HTMLDivElement>(null);

  // Callback for closing the modal when clicking outside
  const handleClickOutside = useCallback(() => {
    if (walletConnectingState !== 'connecting') {
      dispatch(setShowWalletModal(false));
    }
  }, [dispatch, walletConnectingState]);

  // Use the click outside hook
  useClickOutside(modalRef as React.RefObject<HTMLElement>, handleClickOutside);

  const selectWallet = (provider: 'magic-link' | 'metamask' | 'phantom') => {
    dispatch(setTempWalletProvider(provider));
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum?.isMetaMask;

  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled) {
      // Redirect to MetaMask installation
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    dispatch(setWalletProvider('metamask'));
    dispatch(setWalletConnectingState('connecting'));

    try {
      // Request account access
      const accounts = await window.ethereum!.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        dispatch(setWalletAddress(address));
        dispatch(setWalletConnectingState('success'));
        
        // Auto close after success and set wallet connected
        setTimeout(() => {
          dispatch(setShowWalletModal(false));
          dispatch(setTempWalletProvider(null));
          dispatch(nextStep()); // Move to next step after successful connection
        }, 2000);
      } else {
        throw new Error('No accounts returned from MetaMask');
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
      dispatch(setWalletConnectingState('error'));
    }
  };

  // Connect to Magic Link (still simulated)
  const connectMagicLink = () => {
    dispatch(setWalletProvider('magic-link'));
    dispatch(setWalletConnectingState('connecting'));
    
    // Simulate connection
    setTimeout(() => {
      if (Math.random() < 0.8) {
        const mockAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        dispatch(setWalletAddress(mockAddress));
        dispatch(setWalletConnectingState('success'));
        
        setTimeout(() => {
          dispatch(setShowWalletModal(false));
          dispatch(setTempWalletProvider(null));
          dispatch(nextStep());
        }, 2000);
      } else {
        dispatch(setWalletConnectingState('error'));
      }
    }, 2000);
  };

  // Connect to Phantom (still simulated)
  const connectPhantom = () => {
    dispatch(setWalletProvider('phantom'));
    dispatch(setWalletConnectingState('connecting'));
    
    // Simulate connection
    setTimeout(() => {
      if (Math.random() < 0.8) {
        const mockAddress = `Ph${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        dispatch(setWalletAddress(mockAddress));
        dispatch(setWalletConnectingState('success'));
        
        setTimeout(() => {
          dispatch(setShowWalletModal(false));
          dispatch(setTempWalletProvider(null));
          dispatch(nextStep());
        }, 2000);
      } else {
        dispatch(setWalletConnectingState('error'));
      }
    }, 2000);
  };
  
  const connectWallet = () => {
    if (tempWalletProvider === 'metamask') {
      connectMetaMask();
    } else if (tempWalletProvider === 'magic-link') {
      connectMagicLink();
    } else if (tempWalletProvider === 'phantom') {
      connectPhantom();
    }
  };

  const resetWalletModal = () => {
    dispatch(setWalletConnectingState('idle'));
    dispatch(setWalletProvider(null));
    dispatch(setTempWalletProvider(null));
  };

  const closeWalletModal = () => {
    dispatch(setShowWalletModal(false));
    dispatch(setTempWalletProvider(null));
  };

  // Add listener for account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected all accounts
        dispatch(setWalletAddress(null));
      } else if (selectedWalletProvider === 'metamask') {
        // Update with new address
        dispatch(setWalletAddress(accounts[0]));
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [dispatch, selectedWalletProvider]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30 animate-fadeIn transition-all duration-300">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full animate-slideUp transition-all duration-300"
      >
        <ErrorBoundary>
          {walletConnectingState === 'idle' && (
            <div className='p-10'>
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-black">Connect your wallet</h2>
                <p className="text-[#1B1B1B] text-sm">
                  Choose your wallet and step into the future of digital asset management. Secure, fast, and hassle-free.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Magic Link - Full width card */}
                <div 
                  className={cn(
                    "bg-[#F5F5F7] border border-[#EAEAEA] p-5 rounded-lg relative cursor-pointer transition-all hover:bg-[#efebff]",
                    tempWalletProvider === 'magic-link' && "ring-1 ring-[#8c52ff]"
                  )}
                  onClick={() => selectWallet('magic-link')}
                >
                  <div className="flex flex-col gap-4 items-start">
                    <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8">
                          <Image 
                            src="/images/wallet/magiclink.png" 
                            alt="Magic Link" 
                            width={32} 
                            height={32}
                          />
                        </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-base text-gray-900">Magic Link</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Magic Link is a secure, virtual wallet that lets you interact with Web3 applications effortlessly—no installations or private keys required. Simply log in with your email and start exploring the decentralized world in seconds.
                      </p>
                    </div>
                    
                    <div className="absolute top-5 right-5">
                      <div className={cn(
                        "w-5 h-5 border rounded-full flex items-center justify-center",
                        tempWalletProvider === 'magic-link' 
                          ? "border-[#8c52ff]" 
                          : "border-[1.3px] border-[#BEBEBE]"
                      )}>
                        {tempWalletProvider === 'magic-link' && (
                          <div className="w-3 h-3 rounded-full bg-[#8c52ff]"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* MetaMask and Phantom - Two cards side by side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* MetaMask */}
                  <div 
                    className={cn(
                      "bg-[#F5F5F7] border border-[#EAEAEA] p-5 rounded-lg relative cursor-pointer transition-all hover:bg-[#efebff] h-full",
                      tempWalletProvider === 'metamask' && "ring-1 ring-[#8c52ff]"
                    )}
                    onClick={() => selectWallet('metamask')}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8">
                          <Image 
                            src="/images/wallet/metamask.png" 
                            alt="MetaMask" 
                            width={32} 
                            height={32}
                          />
                        </div>
                      
                        <div className={cn(
                          "w-5 h-5 border rounded-full flex items-center justify-center",
                          tempWalletProvider === 'metamask' 
                            ? "border-[#8c52ff]" 
                            : "border-[1.3px] border-[#BEBEBE]"
                        )}>
                          {tempWalletProvider === 'metamask' && (
                            <div className="w-3 h-3 rounded-full bg-[#8c52ff]"></div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-base text-gray-900">METAMASK</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        MetaMask is a trusted, self-custodial wallet that allows you to securely manage your digital assets and interact with Web3 applications.
                      </p>
                    </div>
                  </div>
                  
                  {/* Phantom */}
                  <div 
                    className={cn(
                      "bg-[#F5F5F7] border border-[#EAEAEA] p-5 rounded-lg relative cursor-pointer transition-all hover:bg-[#efebff] h-full",
                      tempWalletProvider === 'phantom' && "ring-1 ring-[#8c52ff]"
                    )}
                    onClick={() => selectWallet('phantom')}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8">
                          <Image 
                            src="/images/wallet/phantom.png" 
                            alt="Phantom" 
                            width={32} 
                            height={32}
                          />
                        </div>
                        
                        <div className={cn(
                          "w-5 h-5 border rounded-full flex items-center justify-center",
                          tempWalletProvider === 'phantom' 
                            ? "border-[#8c52ff]" 
                            : "border-[1.3px] border-[#BEBEBE]"
                        )}>
                          {tempWalletProvider === 'phantom' && (
                            <div className="w-3 h-3 rounded-full bg-[#8c52ff]"></div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-base text-gray-900">Phantom</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Phantom is a trusted, non-custodial wallet that makes it easy to manage your digital assets and interact with Solana-based decentralized applications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeWalletModal}
                >
                  Cancel
                </button>
                <button 
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors",
                    tempWalletProvider
                      ? "bg-[#8c52ff] text-white hover:bg-[#7842eb]" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                  onClick={connectWallet}
                  disabled={!tempWalletProvider}
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
          
          {walletConnectingState === 'connecting' && (
            <div className="text-center py-12 px-10">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24">
                  <Lottie animationData={loaderLottie} loop={true} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connecting your wallet</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Hold tight! We&apos;re securely connecting your wallet to the blockchain. This may take a few moments as we verify and establish a secure connection.
                Thank you for your patience!
              </p>
            </div>
          )}
          
          {walletConnectingState === 'success' && (
            <div className="text-center py-12 px-10">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connected Successful!</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
                Your wallet has been successfully connected! You&apos;re now ready to explore the full 
                potential of our platform. Secure, seamless, and hassle-free—proceed to the next 
                steps and unlock new possibilities!
              </p>
              
              <div className="bg-gray-100 rounded-md py-2 px-4 flex items-center justify-center gap-2 max-w-xs mx-auto mb-8">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image 
                    src="/images/wallet/avatar.png" 
                    alt="Wallet Avatar" 
                    width={24} 
                    height={24}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23AB9FF2'%3E%3Ccircle cx='12' cy='12' r='12' /%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">{formatWalletAddress(walletAddress)}</span>
                <button className="text-[#8c52ff]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" fill="currentColor" fillOpacity="0.4"/>
                    <path d="M17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center gap-4">
                <button 
                  className="px-8 py-3 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={closeWalletModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-8 py-3 rounded-md bg-[#8c52ff] text-white hover:bg-[#7842eb] transition-colors"
                  onClick={() => {
                    closeWalletModal();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {walletConnectingState === 'error' && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Connection Failed</h3>
              <p className="text-sm text-gray-500 mb-6">Unable to connect to your wallet. Please try again.</p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={closeWalletModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-[#8c52ff] text-white rounded-md hover:bg-[#7842eb]"
                  onClick={resetWalletModal}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
} 