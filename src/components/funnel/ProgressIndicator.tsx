'use client';

import { useFunnel } from './FunnelProvider';
import { FunnelStep } from '@/types';

const stepOrder: FunnelStep[] = [
  'splash',
  'stage-selection',
  'ttc-congratulations',
  'ttc-claim-offer',
  'ttc-choose-plan',
  'ttc-confirmation',
  'ttc-app-download',
  'program-knowledge',
  'program-selection',
  'quiz-landing',
  'quiz-flow',
  'quiz-results',
  'paywall',
  'success',
];

const stepLabels: Record<FunnelStep, string> = {
  'splash': 'Welcome',
  'stage-selection': 'Select Stage',
  'ttc-congratulations': 'Congratulations',
  'ttc-claim-offer': 'Claim Offer',
  'ttc-choose-plan': 'Choose Plan',
  'ttc-confirmation': 'Payment Confirmed',
  'ttc-app-download': 'Download App',
  'program-knowledge': 'Program Knowledge',
  'program-selection': 'Choose Programs',
  'quiz-landing': 'Quiz Landing',
  'quiz-flow': 'Take Quiz',
  'quiz-results': 'Quiz Results',
  'paywall': 'Subscription',
  'success': 'Success',
};

export function ProgressIndicator() {
  const { state } = useFunnel();

  if (!state.showProgressIndicator) return null;

  const currentIndex = stepOrder.indexOf(state.currentStep);
  const progress = ((currentIndex + 1) / stepOrder.length) * 100;

  return (
    <div className="px-6 pt-4">
      <div className="progress-bar w-full mb-4">
        <div
          className="progress-fill transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function Breadcrumbs() {
  const { state } = useFunnel();

  if (!state.showBreadcrumbs) return null;

  const currentIndex = stepOrder.indexOf(state.currentStep);
  const visibleSteps = stepOrder.slice(0, currentIndex + 1);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {visibleSteps.map((step, index) => (
        <div key={step} className="flex items-center">
          <span className={index === currentIndex ? 'text-primary font-medium' : ''}>
            {stepLabels[step]}
          </span>
          {index < visibleSteps.length - 1 && (
            <span className="mx-2">→</span>
          )}
        </div>
      ))}
    </nav>
  );
}
