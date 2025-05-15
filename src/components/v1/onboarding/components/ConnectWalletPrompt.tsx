import { useDispatch } from 'react-redux';
import { setShowWalletModal, setWalletConnectingState } from '../../../../store/slices/onboardingSlice';

interface ConnectWalletPromptProps {
  message?: string;
}

export default function ConnectWalletPrompt({ message }: ConnectWalletPromptProps) {
  const dispatch = useDispatch();

  // Handle connect wallet button click
  const handleConnectWallet = () => {
    dispatch(setWalletConnectingState('idle'));
    dispatch(setShowWalletModal(true));
  };

  return (
    <div className="min-h-[400px] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f0ebff] flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8c52ff]">
            <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Connect your wallet first</h2>
        <p className="text-sm text-gray-600 mb-6 max-w-md">
          {message || 
            "You need to connect your wallet before you can proceed. Your wallet allows you to securely interact with the blockchain."}
        </p>
        <button 
          className="bg-[#8c52ff] text-white px-6 py-2 rounded-md text-sm font-medium"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
} 