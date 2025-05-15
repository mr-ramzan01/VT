import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { 
  disconnectWallet,
  setShowWalletModal,
  setWalletOption,
  setWalletConnectingState
} from '../../../store/slices/onboardingSlice';
import { formatWalletAddress } from '../../../utils/formatters';

export default function OnboardingHeader() {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state: RootState) => state.onboarding);

  // Handle wallet connection
  const handleConnectWallet = () => {
    dispatch(setWalletOption('existing'));
    dispatch(setWalletConnectingState('idle'));
    dispatch(setShowWalletModal(true));
  };

  // Disconnect wallet
  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
  };

  return (
    <div className="w-full bg-white py-4 px-8 border-b border-gray-100 sticky top-0 z-30">
      <div className="flex justify-end items-center">
        {!walletAddress ? (
          <button 
            className="bg-[#8c52ff] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#7842eb] transition-colors"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
            <div className="px-3 py-1.5 rounded-md text-sm font-medium bg-[#f5f3ff] text-[#8c52ff] border border-[#e9dfff] mr-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {formatWalletAddress(walletAddress)}
            </div>
            <button 
              className="text-red-500 hover:text-red-600 text-sm transition-colors"
              onClick={handleDisconnectWallet}
            >
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M16 17V14H9V10H16V7L21 12L16 17ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6H14V4H5V20H14V18H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H14Z" fill="currentColor"/>
                </svg>
                Disconnect
              </div>
            </button>
          </div>
        )}
        <div className="ml-4 text-gray-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="ml-3 flex items-center">
          <div className="bg-[#f97316] rounded-full w-7 h-7 flex items-center justify-center text-white font-medium text-sm">
            S
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-500">Good day!</div>
            <div className="flex items-center">
              <span className="text-xs">Saksit Junejol</span>
              <svg className="ml-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 