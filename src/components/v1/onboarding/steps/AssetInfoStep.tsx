import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { 
  setAssetName,
  setAssetSymbol,
  setAssetDescription
} from '../../../../store/slices/onboardingSlice';
import StepNavigation from '../StepNavigation';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';

export default function AssetInfoStep() {
  const dispatch = useDispatch();
  const { 
    assetName, 
    assetSymbol, 
    assetDescription,
    walletAddress,
    selectedWalletProvider
  } = useSelector((state: RootState) => state.onboarding);

  // Check if wallet is connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAssetName(e.target.value));
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAssetSymbol(e.target.value));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setAssetDescription(e.target.value));
  };

  // Check if can proceed to next step
  const canProceed = assetName?.trim() !== '' && 
                      assetSymbol?.trim() !== '' && 
                      assetDescription?.trim() !== '' &&
                      isWalletConnected;

  // If wallet is not connected, show wallet connection UI
  if (!isWalletConnected) {
    return (
      <ConnectWalletPrompt 
        message="You need to connect your wallet to enter your asset information. Your wallet is required to sign and validate asset details."
      />
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Information</h2>
        <p className="text-sm text-gray-600 mb-6">Define your digital asset with clear, descriptive details</p>
        
        <div className="space-y-6">
          {/* Asset Name */}
          <div>
            <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 mb-1">
              Asset Name
            </label>
            <input
              type="text"
              id="assetName"
              value={assetName}
              onChange={handleNameChange}
              placeholder="e.g. Real Estate Fund Token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Choose a clear, descriptive name for your digital asset
            </p>
          </div>
          
          {/* Asset Symbol */}
          <div>
            <label htmlFor="assetSymbol" className="block text-sm font-medium text-gray-700 mb-1">
              Asset Symbol
            </label>
            <input
              type="text"
              id="assetSymbol"
              value={assetSymbol}
              onChange={handleSymbolChange}
              placeholder="e.g. REFT"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Create a short, unique symbol (3-5 characters) for your asset
            </p>
          </div>
          
          {/* Asset Description */}
          <div>
            <label htmlFor="assetDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Asset Description
            </label>
            <textarea
              id="assetDescription"
              value={assetDescription}
              onChange={handleDescriptionChange}
              placeholder="Describe your digital asset, its purpose, and value proposition..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              {`Provide a comprehensive description that explains your asset's purpose and value`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <StepNavigation canProceed={canProceed} />
    </div>
  );
} 