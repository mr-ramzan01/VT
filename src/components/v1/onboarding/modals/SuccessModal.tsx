import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setShowSuccessModal } from '../../../../store/slices/onboardingSlice';

export default function SuccessModal() {
  const dispatch = useDispatch();
  const { 
    assetName, 
    assetSymbol,
    selectedNetwork
  } = useSelector((state: RootState) => state.onboarding);
  
  // Get network name from id
  const getNetworkName = (): string => {
    switch(selectedNetwork) {
      case 'ethereum': return 'Ethereum';
      case 'polygon': return 'Polygon';
      case 'binance': return 'Binance Smart Chain';
      case 'base': return 'BASE Mainnet';
      default: return '';
    }
  };

  // Close success modal
  const closeSuccessModal = () => {
    dispatch(setShowSuccessModal(false));
    // Optionally, redirect to dashboard or another page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30 animate-fadeIn transition-all duration-300">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-slideUp transition-all duration-300">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Digital Asset Created Successfully!</h3>
          <p className="text-sm text-gray-500 mb-4">
            Your digital asset has been created and is now ready for review. You will receive a notification once it has been approved.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Asset Name:</span>
              <span className="text-sm font-medium">{assetName}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Symbol:</span>
              <span className="text-sm font-medium">{assetSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Network:</span>
              <span className="text-sm font-medium">{getNetworkName()}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#8c52ff] text-base font-medium text-white hover:bg-[#7842eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8c52ff]"
              onClick={closeSuccessModal}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 