import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { 
  setTotalSupply,
  setTokenPrice,
  setOfferingPercentage,
  setVestingPeriod
} from '../../../../store/slices/onboardingSlice';
import StepNavigation from '../StepNavigation';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';

export default function AssetDetailsStep() {
  const dispatch = useDispatch();
  const { 
    totalSupply, 
    tokenPrice, 
    offeringPercentage, 
    vestingPeriod,
    walletAddress,
    selectedWalletProvider
  } = useSelector((state: RootState) => state.onboarding);

  // Check if wallet is connected
  const isWalletConnected = !!walletAddress && !!selectedWalletProvider;
  
  // Handle input changes
  const handleTotalSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTotalSupply(e.target.value));
  };

  const handleTokenPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTokenPrice(e.target.value));
  };

  const handleOfferingPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOfferingPercentage(e.target.value));
  };

  const handleVestingPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setVestingPeriod(e.target.value));
  };

  // Check if can proceed to next step
  const canProceed = totalSupply?.trim() !== '' && 
                    tokenPrice?.trim() !== '' && 
                    offeringPercentage?.trim() !== '' && 
                    vestingPeriod?.trim() !== '' &&
                    isWalletConnected;

  // If wallet is not connected, show wallet connection UI
  if (!isWalletConnected) {
    return (
      <ConnectWalletPrompt 
        message="You need to connect your wallet to specify asset details. Your wallet is required to sign and validate transaction parameters."
      />
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Details</h2>
        <p className="text-sm text-gray-600 mb-6">Configure the financial parameters of your digital asset</p>
        
        <div className="space-y-6">
          {/* Total Supply */}
          <div>
            <label htmlFor="totalSupply" className="block text-sm font-medium text-gray-700 mb-1">
              Total Supply
            </label>
            <div className="relative">
              <input
                type="number"
                id="totalSupply"
                value={totalSupply}
                onChange={handleTotalSupplyChange}
                placeholder="e.g. 1,000,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Total number of tokens to be created
              </p>
            </div>
          </div>
          
          {/* Token Price */}
          <div>
            <label htmlFor="tokenPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Token Price (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="tokenPrice"
                value={tokenPrice}
                onChange={handleTokenPriceChange}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
                step="0.01"
              />
              <p className="mt-1 text-xs text-gray-500">
                Initial price per token in USD
              </p>
            </div>
          </div>
          
          {/* Offering Percentage */}
          <div>
            <label htmlFor="offeringPercentage" className="block text-sm font-medium text-gray-700 mb-1">
              Initial Offering Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                id="offeringPercentage"
                value={offeringPercentage}
                onChange={handleOfferingPercentageChange}
                placeholder="e.g. 20"
                min="1"
                max="100"
                className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Percentage of tokens available in the initial offering
              </p>
            </div>
          </div>
          
          {/* Vesting Period */}
          <div>
            <label htmlFor="vestingPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Vesting Period
            </label>
            <select
              id="vestingPeriod"
              value={vestingPeriod}
              onChange={handleVestingPeriodChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
            >
              <option value="">Select vesting period</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="5 years">5 years</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Time period over which tokens are gradually released
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <StepNavigation canProceed={canProceed} />
    </div>
  );
} 