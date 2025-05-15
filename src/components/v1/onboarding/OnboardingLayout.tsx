import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setShowVideo } from '../../../store/slices/onboardingSlice';

// Step Components
import StepSelector from './StepSelector';
import AssetTypeStep from './steps/AssetTypeStep';
import NetworkStep from './steps/NetworkStep';
import WalletStep from './steps/WalletStep';
import PreMintingStep from './steps/PreMintingStep';
import AssetInfoStep from './steps/AssetInfoStep';
import AssetDetailsStep from './steps/AssetDetailsStep';
import SummaryStep from './steps/SummaryStep';

// Components
import OnboardingSidebar from './OnboardingSidebar';
import OnboardingHeader from './OnboardingHeader';
import WalletConnectionModal from './modals/WalletConnectionModal';
import SuccessModal from './modals/SuccessModal';

/**
 * OnboardingLayout Component
 * 
 * A comprehensive onboarding flow for the VTrade tokenization platform.
 * This component implements a multi-step process with the following steps:
 * 
 * 1. Asset Type Selection - Choose between Equity, Debt, or Real Estate
 * 2. Network Selection - Choose blockchain network (Ethereum, Polygon, Binance, BASE)
 * 3. Wallet Connection - Create new wallet or connect existing wallet
 * 4. Pre-minting Steps - Complete required steps before minting
 * 5. Digital Asset Information - Basic details about the asset
 * 6. Digital Asset Details - Financial parameters
 * 7. Summary & Issuance - Review all details and issue the asset
 */
export default function OnboardingLayout() {
  const dispatch = useDispatch();
  const { 
    currentStep, 
    showVideo, 
    showWalletModal, 
    showSuccessModal,
    walletAddress,
    selectedWalletProvider
  } = useSelector((state: RootState) => state.onboarding);
  
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Check if wallet is connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;

  // Handle window resize and check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768;
      
      // Hide video section on mobile
      if (isMobile) {
        dispatch(setShowVideo(false));
      } else {
        dispatch(setShowVideo(true));
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [dispatch]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex min-h-screen relative bg-white">
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-50 bg-[#8c52ff] text-white p-2 rounded-md"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="white"/>
        </svg>
      </button>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}
      
      {/* Wallet Connection Modal */}
      {showWalletModal && <WalletConnectionModal />}

      {/* Left sidebar with steps */}
      <OnboardingSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} isWalletConnected={isWalletConnected} />

      {/* Main content area */}
      <div className={`flex-1 md:ml-0 flex flex-col ${!showSidebar ? "w-full" : "hidden md:flex"}`}>
        {/* Header - extended throughout */}
        <OnboardingHeader />

        {/* Content area with flex row layout */}
        <div className="flex flex-1 bg-gray-50">
          {/* Asset selection content - takes remaining width */}
          <div className="flex-1 p-6 md:p-8 relative">
            <StepSelector currentStep={currentStep}>
              <AssetTypeStep />
              <NetworkStep />
              <WalletStep />
              <PreMintingStep />
              <AssetInfoStep />
              <AssetDetailsStep />
              <SummaryStep />
            </StepSelector>
          </div>

          {/* Video iframe - takes 35% width */}
          {showVideo && (
            <div className="w-[35%] flex flex-row justify-center items-center p-3 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="VTrade Tokenisation Video"
                className="w-[100%] rounded-lg"
                style={{ aspectRatio: '16/9' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 