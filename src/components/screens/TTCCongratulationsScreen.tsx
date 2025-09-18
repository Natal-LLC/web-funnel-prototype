'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

interface CongratulationsScreenProps {
  stage: Stage;
}

export function TTCCongratulationsScreen({ stage }: CongratulationsScreenProps) {
  const getStageContent = () => {
    switch (stage) {
      case 'ttc':
        return {
          emoji: '🎉',
          title: "You've Unlocked Your Special TTC Offer!",
          subtitle: 'Get exclusive access to our comprehensive TTC program',
          programName: 'Exclusive TTC Program',
          discount: '50% OFF',
          features: [
            'Personalized nutrition plan',
            'Fertility tracking tools',
            'Expert support community',
            '30-day money-back guarantee'
          ],
          buttonText: 'Claim Your Special Offer'
        };
      case 'pregnancy':
        return {
          emoji: '🤰',
          title: "You've Unlocked Your Special Pregnancy Offer!",
          subtitle: 'Get exclusive access to our comprehensive pregnancy program',
          programName: 'Exclusive Pregnancy Program',
          discount: '40% OFF',
          features: [
            'Weekly pregnancy guidance',
            'Nutrition & exercise plans',
            'Expert support community',
            '30-day money-back guarantee'
          ],
          buttonText: 'Claim Your Special Offer'
        };
      case 'postpartum':
        return {
          emoji: '👶',
          title: "You've Unlocked Your Special Postpartum Offer!",
          subtitle: 'Get exclusive access to our comprehensive postpartum program',
          programName: 'Exclusive Postpartum Program',
          discount: '35% OFF',
          features: [
            'Recovery & healing guidance',
            'New mom support community',
            'Expert nutrition plans',
            '30-day money-back guarantee'
          ],
          buttonText: 'Claim Your Special Offer'
        };
      default:
        return {
          emoji: '🎉',
          title: "You've Unlocked Your Special Offer!",
          subtitle: 'Get exclusive access to our comprehensive program',
          programName: 'Exclusive Program',
          discount: '50% OFF',
          features: [
            'Personalized guidance',
            'Expert support community',
            'Comprehensive resources',
            '30-day money-back guarantee'
          ],
          buttonText: 'Claim Your Special Offer'
        };
    }
  };

  const content = getStageContent();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Hero Section - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">{content.emoji}</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        {/* Offer Details Card - Compact */}
        <div className="flex-1 px-4 pb-4">
          <MobileCard className="h-full border-2 border-primary bg-primary/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h2 className="text-lg font-bold text-primary mb-2">{content.programName}</h2>
              <div className="text-3xl font-bold text-primary mb-2">{content.discount}</div>
              <div className="text-xs text-muted-foreground mb-4">Limited time only</div>
              
              <div className="space-y-2 mb-4 text-left">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
              
              <MobileButton 
                size="lg"
                onClick={() => window.location.href = `/choose-plan?stage=${stage}`}
              >
                {content.buttonText}
              </MobileButton>
            </div>
          </MobileCard>
        </div>
      </div>
    </MobileLayout>
  );
}
