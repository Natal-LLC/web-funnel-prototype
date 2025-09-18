'use client';

import { useFunnel } from './FunnelProvider';
import { SplashScreen } from './SplashScreen';
import { StageSelection } from './StageSelection';
import { 
  TTCCongratulations, 
  TTCClaimOffer, 
  TTCChoosePlan, 
  TTCConfirmation, 
  TTCAppDownload 
} from './TTCFlow';
import { ProgramKnowledgeQuestion } from './ProgramKnowledgeQuestion';
import { ProgramSelection } from './ProgramSelection';
import { QuizLanding } from './QuizLanding';
import { QuizFlow, QuizResults, Paywall, SuccessPage } from './PlaceholderComponents';
import { ProgressIndicator } from './ProgressIndicator';
import { Breadcrumbs } from './Breadcrumbs';

export function FunnelRouter() {
  const { state } = useFunnel();

  console.log('Current step:', state.currentStep);

  const renderStep = () => {
    switch (state.currentStep) {
      case 'splash':
        return <SplashScreen />;
      
      case 'stage-selection':
        return <StageSelection />;
      
      case 'ttc-congratulations':
        return <TTCCongratulations />;
      
      case 'ttc-claim-offer':
        return <TTCClaimOffer />;
      
      case 'ttc-choose-plan':
        return <TTCChoosePlan />;
      
      case 'ttc-confirmation':
        return <TTCConfirmation />;
      
      case 'ttc-app-download':
        return <TTCAppDownload />;
      
      case 'program-knowledge':
        return <ProgramKnowledgeQuestion />;
      
      case 'program-selection':
        return <ProgramSelection />;
      
      case 'quiz-landing':
        return <QuizLanding />;
      
      case 'quiz-flow':
        return <QuizFlow />;
      
      case 'quiz-results':
        return <QuizResults />;
      
      case 'paywall':
        return <Paywall />;
      
      case 'success':
        return <SuccessPage />;
      
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {renderStep()}
    </div>
  );
}
