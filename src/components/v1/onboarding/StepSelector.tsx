import React from 'react';

interface StepSelectorProps {
  currentStep: number;
  children: React.ReactNode;
}

export default function StepSelector({ currentStep, children }: StepSelectorProps) {
  // Array of child elements to access by index
  const childrenArray = React.Children.toArray(children);
  
  // Display the component for the current step (0-indexed in the array, 1-indexed in the steps)
  const currentStepComponent = childrenArray[currentStep - 1] || null;
  
  return <>{currentStepComponent}</>;
} 