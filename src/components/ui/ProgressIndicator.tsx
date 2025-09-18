'use client';

import { FunnelStep } from '@/types';

interface ProgressIndicatorProps {
  currentStep: FunnelStep;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const stepOrder: FunnelStep[] = [
    'splash',
    'stage-selection',
    'ttc-congratulations',
    'ttc-claim-offer',
    'ttc-choose-plan',
    'ttc-confirmation'
  ];

  const stepLabels: Record<FunnelStep, string> = {
    'splash': 'Welcome',
    'stage-selection': 'Select Stage',
    'ttc-congratulations': 'Congratulations',
    'ttc-claim-offer': 'Special Offer',
    'ttc-choose-plan': 'Choose Plan',
    'ttc-confirmation': 'Confirmation'
  };

  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = ((currentIndex + 1) / stepOrder.length) * 100;

  return (
    <div className="px-6 pt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {stepLabels[currentStep]}
        </span>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {stepOrder.length}
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
