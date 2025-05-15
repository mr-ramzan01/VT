import { useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../../store/slices/onboardingSlice';
import { cn } from '../../../utils/cn';

interface StepNavigationProps {
  canProceed: boolean;
  onSubmit?: () => void;
  submitText?: string;
  showBackButton?: boolean;
}

export default function StepNavigation({ 
  canProceed, 
  onSubmit, 
  submitText = 'Continue',
  showBackButton = true
}: StepNavigationProps) {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(prevStep());
  };

  const handleContinue = () => {
    if (onSubmit) {
      onSubmit();
    } else if (canProceed) {
      dispatch(nextStep());
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      {showBackButton && (
        <button 
          className="px-4 py-2 rounded-md text-sm font-medium text-[#8A2BE2] hover:bg-gray-50 transition-all flex items-center"
          onClick={handleBack}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M22 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H22V11Z" fill="currentColor"/>
          </svg>
          Back
        </button>
      )}
      
      <div className={!showBackButton ? 'ml-auto' : ''}>
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            canProceed 
              ? "bg-[#8c52ff] text-white hover:bg-[#7842eb]" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          onClick={handleContinue}
          disabled={!canProceed}
        >
          {submitText}
        </button>
      </div>
    </div>
  );
} 