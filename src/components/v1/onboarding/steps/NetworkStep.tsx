import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setNetwork } from '../../../../store/slices/onboardingSlice';
import { cn } from '../../../../utils/cn';
import StepNavigation from '../StepNavigation';
import { networkOptions } from '../../../../constants/onboarding';
import Image from 'next/image';

export default function NetworkStep() {
  const dispatch = useDispatch();
  const { selectedNetwork } = useSelector((state: RootState) => state.onboarding);

  const handleNetworkSelect = (networkId: string) => {
    dispatch(setNetwork(networkId));
  };

  // Check if can proceed to next step
  const canProceed = selectedNetwork !== null;

  return (
    <div className='flex flex-col justify-between h-[85vh] bg-[#F2F4F6] rounded-lg p-6 overflow-scroll'>
      <div className='flex flex-col gap-3'>
      {networkOptions.map((network) => (
        <div 
          key={network.id}
          className={cn(
            "bg-[#f5f3ff] border border-[#e5e7eb] p-5 rounded-lg mb-3 relative cursor-pointer transition-all",
            selectedNetwork === network.id && "ring-2 ring-[#8c52ff]"
          )}
          onClick={() => handleNetworkSelect(network.id)}
        >
          <div className="flex flex-col items-start">
          <div className="flex-shrink-0">
              <div className="w-5 h-5 mb-2 rounded-full flex items-center justify-center relative">
                <Image 
                  src={network.icon} 
                  alt={network.name} 
                  fill
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold text-gray-800">{network.name}</h3>
                <div className="flex space-x-1 items-center">
                  {network?.speed === "fast" ? <div className='relative w-4 h-4'>
                    <Image src="/icons/sn_boost.png" alt="Low fees" fill />
                  </div> : <div className='relative w-4 h-4'>
                    <Image src="/icons/sn_fast.png" alt="Low fees" fill />
                  </div>}
                  {network?.fees === "low" ? <div className='relative w-4 h-4'>
                    <Image src="/icons/sn_coin.png" alt="Low fees" fill />
                  </div> : <div className='relative w-4 h-4 flex flex-row gap-1'>
                    <Image src="/icons/sn_coin.png" alt="Low fees" fill />
                    <Image src="/icons/sn_coin.png" alt="Low fees" fill />
                    <Image src="/icons/sn_coin.png" alt="Low fees" fill />
                  </div>}
                  <div className='relative w-4 h-4'>
                    <Image src="/icons/sn_shield.png" alt="Low fees" fill />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-1">{network.symbol}</p>
              <p className="text-xs text-gray-500 mt-2">{network.description}</p>
            </div>
          </div>
          
          <div className="absolute top-5 right-5">
            <div className={cn(
              "w-4 h-4 md:w-5 md:h-5 border-2 rounded-full transition-all",
              selectedNetwork === network.id
                ? "border-[#8c52ff] bg-[#8c52ff]" 
                : "border-[1.3px] border-[#BEBEBE]"
            )}>
              {selectedNetwork === network.id && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                  <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
      
      {/* Navigation */}
      <StepNavigation canProceed={canProceed} />
    </div>
  );
} 