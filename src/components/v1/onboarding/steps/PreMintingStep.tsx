import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { 
  completePreMintingStep,
  PreMintingStep as PreMintingStepType,
} from '../../../../store/slices/onboardingSlice';
import { cn } from '../../../../utils/cn';
import StepNavigation from '../StepNavigation';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';

export default function PreMintingStep() {
  const dispatch = useDispatch();
  const { completedPreMintingSteps, walletAddress, selectedWalletProvider } = useSelector((state: RootState) => state.onboarding);

  const handleCompleteStep = (step: PreMintingStepType) => {
    dispatch(completePreMintingStep(step));
  };

  // Check if wallet is connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;

  // Check if can proceed to next step
  const canProceed = isWalletConnected && completedPreMintingSteps?.length === 3;

  // If wallet is not connected, show wallet connection UI
  if (!isWalletConnected) {
    return (
      <ConnectWalletPrompt 
        message="You need to connect your wallet before you can proceed with pre-minting steps. Your wallet allows you to securely interact with the blockchain."
      />
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col">
      <div className="space-y-4 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">Pre-minting required steps</h2>
        <p className="text-sm text-gray-600 mb-6">You&apos;re just 3 steps away from issuing your digital asset. Let&apos;s get started!</p>
        
        {/* Steps cards */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className={cn(
            "bg-white border rounded-lg p-6",
            completedPreMintingSteps?.includes('approve-token') ? "border-green-200" : "border-gray-200"
          )}>
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Approve Token Symbol</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Approve your token symbol with the smart contract. This step ensures your token has a unique identifier in the blockchain.
                </p>
                
                <button 
                  onClick={() => handleCompleteStep('approve-token')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium",
                    completedPreMintingSteps?.includes('approve-token') 
                      ? "bg-green-50 text-green-600 border border-green-200" 
                      : "bg-[#8c52ff] text-white"
                  )}
                >
                  {completedPreMintingSteps?.includes('approve-token') ? 'Completed' : 'Complete Step'}
                </button>
              </div>
              
              <div className="ml-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  completedPreMintingSteps?.includes('approve-token') 
                    ? "bg-white text-green-500 border-2 border-green-500" 
                    : "bg-gray-100 text-gray-400"
                )}>
                  {completedPreMintingSteps?.includes('approve-token') ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className={cn(
            "bg-white border rounded-lg p-6",
            completedPreMintingSteps?.includes('approve-collection') ? "border-green-200" : "border-gray-200"
          )}>
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Approve Collection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Approve your collection parameters. This defines the properties of your asset collection, including maximum supply and transferability.
                </p>
                
                <button 
                  onClick={() => handleCompleteStep('approve-collection')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium",
                    completedPreMintingSteps?.includes('approve-collection') 
                      ? "bg-green-50 text-green-600 border border-green-200" 
                      : "bg-[#8c52ff] text-white"
                  )}
                >
                  {completedPreMintingSteps?.includes('approve-collection') ? 'Completed' : 'Complete Step'}
                </button>
              </div>
              
              <div className="ml-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  completedPreMintingSteps?.includes('approve-collection') 
                    ? "bg-white text-green-500 border-2 border-green-500" 
                    : "bg-gray-100 text-gray-400"
                )}>
                  {completedPreMintingSteps?.includes('approve-collection') ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className={cn(
            "bg-white border rounded-lg p-6",
            completedPreMintingSteps?.includes('deploy-collection') ? "border-green-200" : "border-gray-200"
          )}>
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Deploy Collection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Deploy your collection to the blockchain. This creates the smart contract that will manage your digital asset.
                </p>
                
                <button 
                  onClick={() => handleCompleteStep('deploy-collection')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium",
                    completedPreMintingSteps?.includes('deploy-collection') 
                      ? "bg-green-50 text-green-600 border border-green-200" 
                      : "bg-[#8c52ff] text-white"
                  )}
                >
                  {completedPreMintingSteps?.includes('deploy-collection') ? 'Completed' : 'Complete Step'}
                </button>
              </div>
              
              <div className="ml-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  completedPreMintingSteps?.includes('deploy-collection') 
                    ? "bg-white text-green-500 border-2 border-green-500" 
                    : "bg-gray-100 text-gray-400"
                )}>
                  {completedPreMintingSteps?.includes('deploy-collection') ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
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