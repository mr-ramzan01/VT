import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { goToStep } from '../../../store/slices/onboardingSlice';
import { cn } from '../../../utils/cn';
import Image from 'next/image';

interface OnboardingSidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
  isWalletConnected?: boolean;
}

export default function OnboardingSidebar({ showSidebar, toggleSidebar, isWalletConnected = false }: OnboardingSidebarProps) {
  const dispatch = useDispatch();
  const { steps, currentStep } = useSelector((state: RootState) => state.onboarding);

  // Handle step selection
  const handleStepSelect = (stepId: number) => {
    // Only allow navigating to steps 1-3 freely
    // For steps after wallet connection (4+), only allow if wallet is connected
    if (stepId <= 3 || isWalletConnected) {
      dispatch(goToStep(stepId));
      // Close sidebar on mobile after selection
    }
  };

  // Check if a step is completed
  const isStepCompleted = (stepId: number) => {
    return currentStep > stepId;
  };

  // Check if a step is the current active step
  const isCurrentStep = (stepId: number) => {
    return currentStep === stepId;
  };

  // Check if a step is disabled
  const isStepDisabled = (stepId: number) => {
    // Steps after wallet connection (4+) are disabled if wallet is not connected
    return stepId > 3 && !isWalletConnected;
  };

  return (
    <div className={cn(
      "w-[25%] min-w-[320px] max-w-[360px] bg-white border-r border-gray-200 p-6 fixed md:sticky top-0 h-screen overflow-y-auto z-40 transition-transform duration-300",
      showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      {/* Close button for mobile */}
      <button 
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="currentColor"/>
        </svg>
      </button>

      <div className="mb-10 flex flex-row justify-center">
        <div className="flex items-center relative w-[140px] h-[44px]">
          <Image src="/images/logo.png" alt="VTRADE Logo" fill className="mr-2" />
        </div>
      </div>

      {/* Steps list */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="relative" onClick={() => handleStepSelect(step.id)}>
            {/* Timeline connector */}
            {step.id < steps.length && (
              <div className={cn(
                "absolute left-[14px] top-[26px] w-0.5 h-[calc(100%_-_10px)] bg-gray-200",
                isStepCompleted(step.id) && "bg-[#8c52ff]"
              )}></div>
            )}
            
            {/* Step row */}
            <div className={cn(
              "flex items-start py-5",
              index === 0 && "pt-0",
              !isStepDisabled(step.id) ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            )}>
              {/* Step number circle */}
              <div className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 mr-4 z-10 text-sm transition-all",
                isCurrentStep(step.id) && "border-[#8c52ff] text-[#8c52ff]",
                isStepCompleted(step.id) && "bg-[#8c52ff] text-white border-[#8c52ff]",
                !isCurrentStep(step.id) && !isStepCompleted(step.id) && "bg-white text-gray-400 border-gray-200",
                isStepDisabled(step.id) && "bg-white text-gray-300 border-gray-200"
              )}>
                {step?.id}
              </div>
              
              {/* Step content */}
              <div>
                <h3 className={cn(
                  "font-medium transition-colors text-sm text-[#1B1B1B]",
                  isCurrentStep(step.id) && "text-black",
                  isStepDisabled(step.id) && "text-gray-400"
                )}>
                  {step.title}
                </h3>
                <p className={cn(
                  "text-xs text-[#767676] mt-0.5 leading-snug",
                  isStepDisabled(step.id) && "text-gray-400"
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 