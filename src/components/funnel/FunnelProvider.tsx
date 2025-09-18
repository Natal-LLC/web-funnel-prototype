'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FunnelState, FunnelAction, FunnelStep, UserData } from '@/types';

// Initial state
const initialState: FunnelState = {
  currentStep: 'splash',
  userData: {
    selectedPrograms: [],
    quizAnswers: {},
    quizCompleted: false,
  },
  showProgressIndicator: true,
  showBreadcrumbs: true,
};

// Reducer function
function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
      };
    
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.data,
        },
      };
    
    case 'SET_KNOWS_PROGRAM':
      return {
        ...state,
        knowsProgram: action.knows,
      };
    
    case 'TOGGLE_PROGRESS_INDICATOR':
      return {
        ...state,
        showProgressIndicator: !state.showProgressIndicator,
      };
    
    case 'TOGGLE_BREADCRUMBS':
      return {
        ...state,
        showBreadcrumbs: !state.showBreadcrumbs,
      };
    
    case 'RESET_FUNNEL':
      return initialState;
    
    default:
      return state;
  }
}

// Context
const FunnelContext = createContext<{
  state: FunnelState;
  dispatch: React.Dispatch<FunnelAction>;
  goToStep: (step: FunnelStep) => void;
  updateUserData: (data: Partial<UserData>) => void;
  resetFunnel: () => void;
} | null>(null);

// Provider component
export function FunnelProvider({ 
  children, 
  initialStep = 'splash' 
}: { 
  children: React.ReactNode;
  initialStep?: FunnelStep;
}) {
  const [state, dispatch] = useReducer(funnelReducer, {
    ...initialState,
    currentStep: initialStep
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('natal-funnel-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Only restore user data, not UI state
        if (parsedState.userData) {
          dispatch({ type: 'UPDATE_USER_DATA', data: parsedState.userData });
        }
        // Don't restore currentStep - always start with splash screen
        // if (parsedState.currentStep) {
        //   dispatch({ type: 'SET_STEP', step: parsedState.currentStep });
        // }
      } catch (error) {
        console.error('Failed to load funnel state from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('natal-funnel-state', JSON.stringify({
      currentStep: state.currentStep,
      userData: state.userData,
    }));
  }, [state.currentStep, state.userData]);

  // Helper functions
  const goToStep = (step: FunnelStep) => {
    console.log('Going to step:', step);
    dispatch({ type: 'SET_STEP', step });
  };

  const updateUserData = (data: Partial<UserData>) => {
    console.log('Updating user data:', data);
    dispatch({ type: 'UPDATE_USER_DATA', data });
  };

  const resetFunnel = () => {
    dispatch({ type: 'RESET_FUNNEL' });
    localStorage.removeItem('natal-funnel-state');
  };

  return (
    <FunnelContext.Provider
      value={{
        state,
        dispatch,
        goToStep,
        updateUserData,
        resetFunnel,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

// Custom hook to use the funnel context
export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
}
