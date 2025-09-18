'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

interface ConfirmationScreenProps {
  stage: Stage;
}

export function PaymentConfirmationScreen({ stage }: ConfirmationScreenProps) {
  const getStageContent = () => {
    switch (stage) {
      case 'ttc':
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your TTC program is ready. Let\'s get you set up in the app.',
          programName: 'TTC program'
        };
      case 'pregnancy':
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your pregnancy program is ready. Let\'s get you set up in the app.',
          programName: 'pregnancy program'
        };
      case 'postpartum':
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your postpartum program is ready. Let\'s get you set up in the app.',
          programName: 'postpartum program'
        };
      default:
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your program is ready. Let\'s get you set up in the app.',
          programName: 'program'
        };
    }
  };

  const content = getStageContent();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Success Animation - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">{content.emoji}</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        {/* Next Steps Card - Compact */}
        <div className="flex-1 px-4 pb-4">
          <MobileCard className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-3">What's Next?</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <span className="text-sm">Download our mobile app</span>
                </div>
                <div className="flex items-start">
                  <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <span className="text-sm">Complete your profile setup</span>
                </div>
                <div className="flex items-start">
                  <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <span className="text-sm">Start your {stage === 'ttc' ? 'TTC' : stage === 'pregnancy' ? 'pregnancy' : 'postpartum'} journey</span>
                </div>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Download Button - Bottom */}
        <div className="px-4 pb-4">
          <MobileButton 
            size="lg"
            onClick={() => window.location.href = `/app-download?stage=${stage}`}
          >
            Download App
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
