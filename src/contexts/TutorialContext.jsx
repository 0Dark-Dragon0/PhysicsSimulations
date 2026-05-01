import React, { createContext, useState, useContext, useEffect } from 'react';
import { tutorialsData } from '../data/tutorials';

const TutorialContext = createContext();

export const useTutorial = () => useContext(TutorialContext);

export const TutorialProvider = ({ children }) => {
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [activeLabId, setActiveLabId] = useState('Lab1');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // When guided mode is toggled, reset step to 0
  useEffect(() => {
    if (isGuidedMode) {
      setCurrentStepIndex(0);
    }
  }, [isGuidedMode, activeLabId]);

  const currentTutorial = tutorialsData[activeLabId];
  const totalSteps = currentTutorial ? currentTutorial.steps.length : 0;
  
  const currentStepData = isGuidedMode && currentTutorial && currentTutorial.steps[currentStepIndex] 
    ? currentTutorial.steps[currentStepIndex] 
    : null;

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleGuidedMode = () => {
    setIsGuidedMode(prev => !prev);
  };

  const value = {
    isGuidedMode,
    toggleGuidedMode,
    activeLabId,
    setActiveLabId,
    currentStepIndex,
    totalSteps,
    currentStepData,
    nextStep,
    prevStep,
    // A helper to determine if an element should be highlighted
    isTargetActive: (targetId) => {
      return isGuidedMode && currentStepData && currentStepData.highlightTarget === targetId;
    }
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};
