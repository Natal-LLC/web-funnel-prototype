'use client';

import { useFunnel } from './FunnelProvider';
import { FunnelStep } from '@/types';

const stepLabels: Record<FunnelStep, string> = {
  'splash': 'Welcome',
  'stage-selection': 'Select Stage',
  'ttc-congratulations': 'Congratulations',
  'ttc-claim-offer': 'Claim Offer',
  'ttc-choose-plan': 'Choose Plan',
  'ttc-confirmation': 'Payment Confirmed',
  'know-program': 'Know Program',
  'program-knowledge': 'Program Knowledge',
  'program-selection': 'Choose Programs',
  'quiz-landing': 'Quiz Landing',
  'quiz-flow': 'Take Quiz',
  'quiz-results': 'Quiz Results',
  'pregnancy-quiz': 'Pregnancy Quiz',
  'postpartum-quiz': 'Postpartum Quiz',
  'paywall': 'Subscription',
  'success': 'Success',
};

// Define the flow hierarchy for navigation
const flowHierarchy: Record<FunnelStep, FunnelStep | null> = {
  'splash': null,
  'stage-selection': 'splash',
  'ttc-congratulations': 'stage-selection',
  'ttc-claim-offer': 'ttc-congratulations',
  'ttc-choose-plan': 'ttc-claim-offer',
  'ttc-confirmation': 'ttc-choose-plan',
  'program-knowledge': 'stage-selection',
  'program-selection': 'program-knowledge',
  'quiz-landing': 'program-knowledge',
  'quiz-flow': 'quiz-landing',
  'quiz-results': 'quiz-flow',
  'paywall': 'program-selection',
  'success': 'paywall',
};

export function Breadcrumbs() {
  const { state, goToStep } = useFunnel();

  if (!state.showBreadcrumbs) return null;

  const currentStep = state.currentStep;
  const previousStep = flowHierarchy[currentStep];

  if (!previousStep) return null;

  return (
    <div className="px-6 pb-2">
      <nav>
        <button
          onClick={() => goToStep(previousStep)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="mr-2">←</span>
          Back to {stepLabels[previousStep]}
        </button>
      </nav>
    </div>
  );
}
