import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../store';
import { 
  setShowWalletModal,
  setWalletOption,
  setWalletConnectingState,
  setWalletProvider,
  setWalletAddress
} from '../../../../store/slices/onboardingSlice';
import { cn } from '../../../../utils/cn';
import { formatWalletAddress } from '../../../../utils/formatters';
import StepNavigation from '../StepNavigation';

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

export default function WalletStep() {
  const dispatch = useDispatch();
  const { selectedWalletOption, walletAddress, selectedWalletProvider } = useSelector((state: RootState) => state.onboarding);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Check if wallet is already connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum?.isMetaMask;

  // Handle wallet option selection
  const handleWalletOptionSelect = (option: 'new' | 'existing') => {
    if (!isWalletConnected) {
      dispatch(setWalletOption(option));
      setConnectionError(null);
    }
  };

  // Create new wallet
  const handleCreateWallet = () => {
    if (!isWalletConnected) {
      dispatch(setWalletOption('new'));
      // Redirect to MetaMask installation page if not installed
      if (!isMetaMaskInstalled) {
        window.open('https://metamask.io/download/', '_blank');
      }
    }
  };

  // Connect existing wallet using MetaMask directly
  const handleConnectWallet = async () => {
    if (isWalletConnected || isConnecting) return;
    
    // If MetaMask is not installed
    if (!isMetaMaskInstalled) {
      setConnectionError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      setConnectionError(null);
      dispatch(setWalletOption('existing'));
      
      // Request account access from MetaMask
      const accounts = await window.ethereum!.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        dispatch(setWalletProvider('metamask'));
        dispatch(setWalletAddress(address));
        setIsConnecting(false);
      } else {
        throw new Error('No accounts returned from MetaMask');
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect to MetaMask');
      setIsConnecting(false);
    }
  };

  // Connect through wallet modal (for non-MetaMask options)
  const handleConnectThroughModal = () => {
    if (!isWalletConnected) {
      dispatch(setWalletOption('existing'));
      dispatch(setWalletConnectingState('idle'));
      dispatch(setShowWalletModal(true));
    }
  };

  // Listen for account changes in MetaMask
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        dispatch(setWalletAddress(null));
        dispatch(setWalletProvider(null));
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

  // Check if can proceed to next step
  const canProceed = selectedWalletOption !== null || isWalletConnected;

  // If wallet is already connected, show wallet info
  if (isWalletConnected) {
    return (
      <div className="min-h-[400px] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Wallet Connected</h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Your {selectedWalletProvider === 'metamask' ? 'MetaMask' : 'wallet'} is successfully connected! You can now proceed to the next steps to complete your asset tokenization.
          </p>
          <div className="bg-gray-100 py-2 px-4 rounded inline-flex items-center mb-6">
            <span className="text-sm font-medium text-gray-800">{walletAddress ? formatWalletAddress(walletAddress) : ''}</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <StepNavigation canProceed={true} />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-between h-[85vh] overflow-scroll p-6 bg-[#F2F4F6] rounded-lg'>
      <div className='flex flex-col gap-4'>
        {/* No wallet option */}
        <div 
          className={cn(
            "bg-[#f5f3ff] border border-[#e5e7eb] p-6 rounded-lg relative cursor-pointer transition-all",
            selectedWalletOption === 'new' && "ring-2 ring-[#8c52ff]",
            isWalletConnected && "cursor-not-allowed"
          )}
          onClick={() => handleWalletOptionSelect('new')}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-[#f0ebff] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8c52ff]">
                  <path d="M17 3H7C5.34315 3 4 4.34315 4 6V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V6C20 4.34315 18.6569 3 17 3ZM7 5H17C17.5523 5 18 5.44772 18 6V7H6V6C6 5.44772 6.44772 5 7 5ZM17 19H7C6.44772 19 6 18.5523 6 18V9H18V18C18 18.5523 17.5523 19 17 19ZM13 11H16V13H13V16H11V13H8V11H11V8H13V11Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{`I don't have a wallet`}</h3>
              <p className="text-sm text-gray-600">
                New here? Get started effortlessly by creating your secure digital wallet with Vtrade. Experience seamless, fast, and secure asset management—all in just a few clicks!
              </p>
              
              <button 
                className={cn(
                  "mt-4 px-4 py-2 rounded-md text-sm font-medium flex items-center bg-[#8c52ff] text-white",
                  isWalletConnected 
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                )}
                onClick={handleCreateWallet}
                disabled={isWalletConnected}
              >
                <span className="mr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3H7C5.34315 3 4 4.34315 4 6V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V6C20 4.34315 18.6569 3 17 3ZM7 5H17C17.5523 5 18 5.44772 18 6V7H6V6C6 5.44772 6.44772 5 7 5ZM17 19H7C6.44772 19 6 18.5523 6 18V9H18V18C18 18.5523 17.5523 19 17 19ZM13 11H16V13H13V16H11V13H8V11H11V8H13V11Z" fill="currentColor"/>
                  </svg>
                </span>
                Create One
              </button>
            </div>
            
            <div className="absolute top-6 right-6">
              <div className={cn(
                "w-5 h-5 border-2 rounded-full transition-all",
                selectedWalletOption === 'new' 
                  ? "border-[#8c52ff] bg-[#8c52ff]" 
                  : "border-[1.3px] border-[#BEBEBE]"
              )}>
                {selectedWalletOption === 'new' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                    <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Existing wallet option */}
        <div 
          className={cn(
            "bg-[#f5f3ff] border border-[#e5e7eb] p-6 rounded-lg relative cursor-pointer transition-all",
            selectedWalletOption === 'existing' && "ring-2 ring-[#8c52ff]",
            isWalletConnected && "cursor-not-allowed"
          )}
          onClick={() => handleWalletOptionSelect('existing')}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-[#f0ebff] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8c52ff]">
                  <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">I already have a wallet</h3>
              <p className="text-sm text-gray-600">
                Securely connect your existing wallet to access your account and manage your digital assets with ease. Enjoy seamless transactions and full control over your portfolio.
              </p>
              
              <div className="mt-4 flex space-x-2">
                {/* Direct MetaMask connect button */}
                <button 
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium flex items-center bg-[#F6851B] text-white",
                    (isConnecting || !isMetaMaskInstalled) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )}
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !isMetaMaskInstalled}
                >
                  <span className="mr-2">
                    <svg width="20" height="20" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32.958 1L19.76 10.723L22.246 4.939L32.958 1Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.033 1L15.116 10.829L12.754 4.939L2.033 1Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M28.121 23.6L24.534 29.037L32.152 31.142L34.336 23.73L28.121 23.6Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M0.674 23.73L2.848 31.142L10.466 29.037L6.879 23.6L0.674 23.73Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.028 14.46L7.889 17.671L15.432 18.009L15.166 9.8L10.028 14.46Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24.962 14.46L19.751 9.693L19.558 18.009L27.101 17.671L24.962 14.46Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.466 29.037L14.975 26.819L11.084 23.783L10.466 29.037Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.016 26.819L24.534 29.037L23.907 23.783L20.016 26.819Z" fill="white" stroke="white" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </button>
                
                {/* Other wallet options button */}
                <button 
                  className="px-4 py-2 rounded-md text-sm font-medium flex items-center bg-[#4caf50] text-white"
                  onClick={handleConnectThroughModal}
                >
                  <span className="mr-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                    </svg>
                  </span>
                  Other Wallets
                </button>
              </div>
              
              {/* Show error message if any */}
              {connectionError && (
                <p className="mt-2 text-sm text-red-600">
                  {connectionError}
                </p>
              )}
              
              {/* Show MetaMask not installed message */}
              {!isMetaMaskInstalled && selectedWalletOption === 'existing' && (
                <p className="mt-2 text-sm text-amber-600">
                  MetaMask is not installed. <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="underline">Install MetaMask</a> to continue.
                </p>
              )}
            </div>
            
            <div className="absolute top-6 right-6">
              <div className={cn(
                "w-5 h-5 border-2 rounded-full transition-all",
                selectedWalletOption === 'existing' 
                  ? "border-[#8c52ff] bg-[#8c52ff]" 
                  : "border-[1.3px] border-[#BEBEBE]"
              )}>
                {selectedWalletOption === 'existing' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                    <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <StepNavigation canProceed={canProceed} />
    </div>
  );
}