import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { goToStep } from '@/store/slices/onboardingSlice';

interface StepperProps {
  allowNavigation?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ allowNavigation = true }) => {
  const dispatch = useAppDispatch();
  const { steps, currentStep } = useAppSelector((state) => state.onboarding);
  
  const handleStepClick = (stepNumber: number) => {
    if (allowNavigation) {
      // Only allow navigating to completed steps or the current step + 1
      if (steps[stepNumber - 1].completed || stepNumber === currentStep || stepNumber === currentStep + 1) {
        dispatch(goToStep(stepNumber));
      }
    }
  };
  
  return (
    <div className="h-full bg-white border-r border-gray-200 w-80 p-6">
      <div className="flex items-center mb-6">
        <img 
          src="/logo.svg" 
          alt="VTrade Tokenisation" 
          className="h-8"
        />
        <span className="ml-2 text-xl font-semibold text-[#8A2BE2]">VTrade Tokenisation</span>
      </div>
      
      <div className="mt-10">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`mb-12 relative ${index === steps.length - 1 ? '' : 'stepper-line'}`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="flex items-start">
              <div className={`
                flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0 
                ${step.completed ? 'bg-[#8A2BE2] text-white' : step.active ? 'border-2 border-[#8A2BE2] text-[#8A2BE2]' : 'border-2 border-gray-300 text-gray-300'}
                ${allowNavigation ? 'cursor-pointer' : ''}
              `}>
                {step.completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="ml-4">
                <h3 className={`font-semibold ${step.active || step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.title}
                </h3>
                <p className={`mt-1 text-sm ${step.active || step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .stepper-line::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 32px;
          bottom: -24px;
          width: 2px;
          background-color: #e5e7eb;
          transform: translateX(-50%);
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default Stepper; 