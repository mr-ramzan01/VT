import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { 
  setAcceptedTerms,
  setShowSuccessModal
} from '../../../../store/slices/onboardingSlice';
import StepNavigation from '../StepNavigation';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';

export default function SummaryStep() {
  const dispatch = useDispatch();
  const { 
    selectedAssetType,
    selectedNetwork,
    walletAddress,
    selectedWalletProvider,
    assetName,
    assetSymbol,
    assetDescription,
    totalSupply,
    tokenPrice,
    offeringPercentage,
    vestingPeriod,
    acceptedTerms
  } = useSelector((state: RootState) => state.onboarding);

  // Check if wallet is connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;

  // Lookup maps for display names
  const assetTypeMap: Record<string, string> = {
    'equity': 'Equity',
    'debt': 'Debt',
    'real-estate': 'Real Estate'
  };

  // Handle checkbox change
  const handleAcceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAcceptedTerms(e.target.checked));
  };

  // Handle submit
  const handleSubmit = () => {
    dispatch(setShowSuccessModal(true));
  };

  // Check if can proceed to next step
  const canProceed = acceptedTerms && isWalletConnected;

  // If wallet is not connected, show wallet connection UI
  if (!isWalletConnected) {
    return (
      <ConnectWalletPrompt 
        message="You need to connect your wallet to issue your digital asset. Your wallet is required to sign the transaction and complete the issuance process."
      />
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col">
      <div className="space-y-6 flex-grow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Digital Asset Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Review your asset details below before issuing
          </p>
        </div>
        
        <div className="bg-[#f5f3ff] border border-[#e5e7eb] p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Asset Information</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Asset Type</p>
              <p className="text-sm text-gray-900">{selectedAssetType ? assetTypeMap[selectedAssetType] : 'Not selected'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Blockchain Network</p>
              <p className="text-sm text-gray-900">{selectedNetwork || 'Not selected'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Wallet Address</p>
              <p className="text-sm text-gray-900 truncate max-w-[200px]">{walletAddress || 'Not connected'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Asset Name</p>
              <p className="text-sm text-gray-900">{assetName || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Asset Symbol</p>
              <p className="text-sm text-gray-900">{assetSymbol || 'Not specified'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Asset Description</p>
            <p className="text-sm text-gray-900">{assetDescription || 'No description provided'}</p>
          </div>
        </div>
        
        <div className="bg-[#f5f3ff] border border-[#e5e7eb] p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Parameters</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Supply</p>
              <p className="text-sm text-gray-900">{totalSupply ? `${Number(totalSupply).toLocaleString()} tokens` : 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Token Price</p>
              <p className="text-sm text-gray-900">{tokenPrice ? `$${Number(tokenPrice).toFixed(4)} USD` : 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Offering Percentage</p>
              <p className="text-sm text-gray-900">{offeringPercentage ? `${offeringPercentage}%` : 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Vesting Period</p>
              <p className="text-sm text-gray-900">{vestingPeriod || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Market Cap</p>
              <p className="text-sm text-gray-900">
                {totalSupply && tokenPrice 
                  ? `$${(Number(totalSupply) * Number(tokenPrice)).toLocaleString()} USD` 
                  : 'Cannot calculate'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#fff9c5] border border-[#ffd166] p-6 rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={handleAcceptTerms}
              className="mt-1 h-4 w-4 text-[#8c52ff] focus:ring-[#8c52ff] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I confirm that all information provided is accurate. I understand and agree to the <a href="#" className="text-[#8c52ff] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#8c52ff] hover:underline">Privacy Policy</a>.
            </label>
          </div>
        </div>
      </div>
      
      {/* Navigation with custom submit button */}
      <StepNavigation 
        canProceed={canProceed} 
        onSubmit={handleSubmit} 
        submitText="Issue Digital Asset"
      />
    </div>
  );
} 