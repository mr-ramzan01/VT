import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setAssetType } from '../../../../store/slices/onboardingSlice';
import { cn } from '../../../../utils/cn';
import StepNavigation from '../StepNavigation';
import Image from 'next/image';

export default function AssetTypeStep() {
  const dispatch = useDispatch();
  const { selectedAssetType } = useSelector((state: RootState) => state.onboarding);

  const handleAssetTypeSelect = (type: 'equity' | 'debt' | 'real-estate') => {
    dispatch(setAssetType(type));
  };

  // Check if can proceed to next step
  const canProceed = selectedAssetType !== null;

  return (
    <div className='flex flex-col justify-between h-[85vh] bg-[#F2F4F6] rounded-lg p-6'>
      {/* Equity Digital Assets */}
      <div className='flex flex-col gap-3'>
      <div className={cn(
        "bg-[#f5f3ff] border-[1.5px] border-[#DCD1FF] p-5 rounded-lg mb-3 relative cursor-pointer transition-all",
        selectedAssetType === 'equity' && "ring-2 ring-[#8c52ff]"
      )} onClick={() => handleAssetTypeSelect('equity')}>
        <div className="flex flex-col gap-2">
          <div className="rounded relative">
            <Image
              src="/icons/graph.png" 
              alt="Graph" 
              width={22} 
              height={22} 
              className="md:w-5 md:h-5 w-5 h-5" 
            />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Equity Digital Assets</h3>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mb-2">
          Represents partial ownership of an asset, project, or company. Holders receive dividends and may participate in decision-making
        </p>
        <div className="absolute top-5 right-5">
          <div className={cn(
            "w-4 h-4 md:w-5 md:h-5 border-2 rounded-full transition-all",
            selectedAssetType === 'equity' 
              ? "border-[#8c52ff] bg-[#8c52ff]" 
              : "border-[1.3px] border-[#BEBEBE]"
          )}>
            {selectedAssetType === 'equity' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Debt Digital Assets */}
      <div className={cn(
        "bg-[#f5f3ff] border-[1.5px] border-[#DCD1FF] p-5 rounded-lg mb-3 relative cursor-pointer transition-all",
        selectedAssetType === 'debt' && "ring-2 ring-[#8c52ff]"
      )} onClick={() => handleAssetTypeSelect('debt')}>
        <div className="flex flex-col gap-2">
          <div className="rounded relative">
            <Image
              src="/icons/asset.png" 
              alt="Heart" 
              width={22} 
              height={22} 
              className="md:w-5 md:h-5 w-5 h-5" 
            />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Debt Digital Assets</h3>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mb-2">
          Structure your debt instruments like loans, bonds, and more. Investors receive periodic payments until the maturity of the instrument
        </p>
        <div className="absolute top-5 right-5">
          <div className={cn(
            "w-4 h-4 md:w-5 md:h-5 border-2 rounded-full transition-all",
            selectedAssetType === 'debt' 
              ? "border-[#8c52ff] bg-[#8c52ff]" 
              : "border-[1.3px] border-[#BEBEBE]"
          )}>
            {selectedAssetType === 'debt' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Real Estate Assets */}
      <div className={cn(
        "bg-[#f5f3ff] border-[1.5px] border-[#DCD1FF] p-5 rounded-lg mb-3 relative cursor-pointer transition-all",
        selectedAssetType === 'real-estate' && "ring-2 ring-[#8c52ff]"
      )} onClick={() => handleAssetTypeSelect('real-estate')}>
        <div className="flex flex-col gap-2">
          <div className="rounded relative">
            <Image
              src="/icons/realestate.png" 
              alt="Building" 
              width={22} 
              height={22} 
              className="md:w-5 md:h-5 w-5 h-5" 
            />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Real Estate / Private Businesses</h3>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mb-2">
          Convert properties into digital assets, enable fractional ownership, and enhance cash flow with secure blockchain solutions.
        </p>
        <div className="absolute top-5 right-5">
          <div className={cn(
            "w-4 h-4 md:w-5 md:h-5 border-2 rounded-full transition-all",
            selectedAssetType === 'real-estate' 
              ? "border-[#8c52ff] bg-[#8c52ff]" 
              : "border-[1.3px] border-[#BEBEBE]"
          )}>
            {selectedAssetType === 'real-estate' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Navigation */}
      <StepNavigation 
        canProceed={canProceed} 
        showBackButton={false}
      />
    </div>
  );
} 