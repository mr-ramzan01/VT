import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type AssetType = 'equity' | 'debt' | 'real-estate' | null;
export type WalletOption = 'new' | 'existing' | null;
export type WalletProvider = 'magic-link' | 'metamask' | 'phantom' | null;
export type PreMintingStep = 'approve-token' | 'approve-collection' | 'deploy-collection';
export type WalletConnectingState = 'idle' | 'connecting' | 'success' | 'error';

export interface Network {
  id: string;
  name: string;
  icon: string;
  symbol: string;
  description: string;
  tag?: string;
  fees?: 'low' | 'medium' | 'high';
  speed?: 'fast' | 'medium' | 'slow';
  shield?: boolean;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface OnboardingState {
  // UI state
  currentStep: number;
  steps: Step[];
  isCompleted: boolean;
  showVideo: boolean;
  
  // Step 1: Asset Type
  selectedAssetType: AssetType;
  
  // Step 2: Network
  selectedNetwork: string | null;
  
  // Step 3: Wallet
  selectedWalletOption: WalletOption;
  selectedWalletProvider: WalletProvider;
  walletAddress: string | null;
  walletConnectingState: WalletConnectingState;
  tempWalletProvider: WalletProvider;
  showWalletModal: boolean;
  
  // Step 4: Pre-minting
  completedPreMintingSteps: PreMintingStep[];
  
  // Step 5: Asset Information
  assetName: string;
  assetSymbol: string;
  assetDescription: string;
  
  // Step 6: Asset Details
  totalSupply: string;
  tokenPrice: string;
  offeringPercentage: string;
  vestingPeriod: string;
  
  // Step 7: Summary and Issuance
  acceptedTerms: boolean;
  showSuccessModal: boolean;
}

const initialSteps: Step[] = [
  {
    id: 1,
    title: 'Start building your Digital Assets',
    description: 'Looking for funding? Ready to share profits? Tokenize your assets and achieve your goals effortlessly!',
    completed: false,
    active: true,
  },
  {
    id: 2,
    title: 'Select a Network',
    description: 'Choose your preferred blockchain network for tokenization and optimize your transaction costs, speed, and efficiency.',
    completed: false,
    active: false,
  },
  {
    id: 3,
    title: 'Connect your wallet',
    description: 'Your wallet is the gateway to seamless tokenization! Effortlessly manage your digital assets and ensure secure transactions. Connect your wallet now to get started!',
    completed: false,
    active: false,
  },
  {
    id: 4,
    title: 'Pre-minting required steps',
    description: 'You\'re just 3 steps away from issuing your digital asset. Let\'s get started!',
    completed: false,
    active: false,
  },
  {
    id: 5,
    title: 'Enter your Digital Asset information',
    description: 'Define and showcase the true value of your digital asset with clarity and confidence.',
    completed: false,
    active: false,
  },
  {
    id: 6,
    title: 'Input your Digital Asset details',
    description: 'Provide essential details and ensure compliance with legal regulations to secure and validate your digital asset.',
    completed: false,
    active: false,
  },
  {
    id: 7,
    title: 'Digital Asset Issuance Summary',
    description: 'You\'re just one step away from issuing your Digital Asset! Review your details and confirm to proceed.',
    completed: false,
    active: false,
  }
];

const initialState: OnboardingState = {
  // UI state
  currentStep: 1,
  steps: initialSteps,
  isCompleted: false,
  showVideo: true,
  
  // Step 1: Asset Type
  selectedAssetType: null,
  
  // Step 2: Network
  selectedNetwork: null,
  
  // Step 3: Wallet
  selectedWalletOption: null,
  selectedWalletProvider: null,
  walletAddress: null,
  walletConnectingState: 'idle',
  tempWalletProvider: null,
  showWalletModal: false,
  
  // Step 4: Pre-minting
  completedPreMintingSteps: [],
  
  // Step 5: Asset Information
  assetName: '',
  assetSymbol: '',
  assetDescription: '',
  
  // Step 6: Asset Details
  totalSupply: '',
  tokenPrice: '',
  offeringPercentage: '',
  vestingPeriod: '',
  
  // Step 7: Summary and Issuance
  acceptedTerms: false,
  showSuccessModal: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Step Navigation
    nextStep: (state) => {
      if (state.currentStep < state.steps.length) {
        // Mark current step as completed
        const currentStepIndex = state.currentStep - 1;
        state.steps[currentStepIndex].completed = true;
        state.steps[currentStepIndex].active = false;
        
        // Move to next step
        state.currentStep += 1;
        
        // Set new step as active
        const nextStepIndex = state.currentStep - 1;
        state.steps[nextStepIndex].active = true;
      }
      
      // Check if all steps are completed
      if (state.currentStep === state.steps.length) {
        state.isCompleted = true;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        // Mark current step as not active
        const currentStepIndex = state.currentStep - 1;
        state.steps[currentStepIndex].active = false;
        
        // Move to previous step
        state.currentStep -= 1;
        
        // Set previous step as active and not completed
        const prevStepIndex = state.currentStep - 1;
        state.steps[prevStepIndex].active = true;
        
        state.isCompleted = false;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      const targetStep = action.payload;
      
      if (targetStep >= 1 && targetStep <= state.steps.length) {
        // Mark current step as not active
        const currentStepIndex = state.currentStep - 1;
        state.steps[currentStepIndex].active = false;
        
        // Set target step as active
        state.steps[targetStep - 1].active = true;
        
        state.currentStep = targetStep;
        state.isCompleted = targetStep === state.steps.length;
      }
    },
    
    // UI Controls
    toggleVideo: (state) => {
      state.showVideo = !state.showVideo;
    },
    setShowVideo: (state, action: PayloadAction<boolean>) => {
      state.showVideo = action.payload;
    },
    
    // Step 1: Asset Type
    setAssetType: (state, action: PayloadAction<AssetType>) => {
      state.selectedAssetType = action.payload;
    },
    
    // Step 2: Network
    setNetwork: (state, action: PayloadAction<string>) => {
      state.selectedNetwork = action.payload;
    },
    
    // Step 3: Wallet
    setWalletOption: (state, action: PayloadAction<WalletOption>) => {
      state.selectedWalletOption = action.payload;
    },
    setWalletProvider: (state, action: PayloadAction<WalletProvider>) => {
      state.selectedWalletProvider = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string | null>) => {
      state.walletAddress = action.payload;
    },
    setWalletConnectingState: (state, action: PayloadAction<WalletConnectingState>) => {
      state.walletConnectingState = action.payload;
    },
    setTempWalletProvider: (state, action: PayloadAction<WalletProvider>) => {
      state.tempWalletProvider = action.payload;
    },
    toggleWalletModal: (state) => {
      state.showWalletModal = !state.showWalletModal;
      if (!state.showWalletModal) {
        state.walletConnectingState = 'idle';
        state.tempWalletProvider = null;
      }
    },
    setShowWalletModal: (state, action: PayloadAction<boolean>) => {
      state.showWalletModal = action.payload;
      if (!action.payload) {
        state.walletConnectingState = 'idle';
        state.tempWalletProvider = null;
      }
    },
    disconnectWallet: (state) => {
      state.walletAddress = null;
      state.selectedWalletProvider = null;
      state.selectedWalletOption = null;
    },
    
    // Step 4: Pre-minting
    completePreMintingStep: (state, action: PayloadAction<PreMintingStep>) => {
      if (!state.completedPreMintingSteps.includes(action.payload)) {
        state.completedPreMintingSteps.push(action.payload);
      }
    },
    resetPreMintingSteps: (state) => {
      state.completedPreMintingSteps = [];
    },
    
    // Step 5: Asset Information
    setAssetName: (state, action: PayloadAction<string>) => {
      state.assetName = action.payload;
    },
    setAssetSymbol: (state, action: PayloadAction<string>) => {
      state.assetSymbol = action.payload;
    },
    setAssetDescription: (state, action: PayloadAction<string>) => {
      state.assetDescription = action.payload;
    },
    
    // Step 6: Asset Details
    setTotalSupply: (state, action: PayloadAction<string>) => {
      state.totalSupply = action.payload;
    },
    setTokenPrice: (state, action: PayloadAction<string>) => {
      state.tokenPrice = action.payload;
    },
    setOfferingPercentage: (state, action: PayloadAction<string>) => {
      state.offeringPercentage = action.payload;
    },
    setVestingPeriod: (state, action: PayloadAction<string>) => {
      state.vestingPeriod = action.payload;
    },
    
    // Step 7: Summary and Issuance
    setAcceptedTerms: (state, action: PayloadAction<boolean>) => {
      state.acceptedTerms = action.payload;
    },
    toggleSuccessModal: (state) => {
      state.showSuccessModal = !state.showSuccessModal;
    },
    setShowSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showSuccessModal = action.payload;
    },
    
    // Reset
    resetOnboarding: (state) => {
      return initialState;
    }
  },
});

export const { 
  // Step Navigation
  nextStep, 
  prevStep, 
  goToStep,
  
  // UI Controls
  toggleVideo,
  setShowVideo,
  
  // Step 1: Asset Type
  setAssetType,
  
  // Step 2: Network
  setNetwork,
  
  // Step 3: Wallet
  setWalletOption,
  setWalletProvider,
  setWalletAddress,
  setWalletConnectingState,
  setTempWalletProvider,
  toggleWalletModal,
  setShowWalletModal,
  disconnectWallet,
  
  // Step 4: Pre-minting
  completePreMintingStep,
  resetPreMintingSteps,
  
  // Step 5: Asset Information
  setAssetName,
  setAssetSymbol,
  setAssetDescription,
  
  // Step 6: Asset Details
  setTotalSupply,
  setTokenPrice,
  setOfferingPercentage,
  setVestingPeriod,
  
  // Step 7: Summary and Issuance
  setAcceptedTerms,
  toggleSuccessModal,
  setShowSuccessModal,
  
  // Reset
  resetOnboarding
} = onboardingSlice.actions;

export default onboardingSlice.reducer; 