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
          programName: 'TTC Program',
          features: [
            'Personalized daily guidance',
            'Fertility tracking & insights',
            'Expert nutrition plans',
            'Community support'
          ]
        };
      case 'pregnancy':
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your pregnancy program is ready. Let\'s get you set up in the app.',
          programName: 'Pregnancy Program',
          features: [
            'Weekly pregnancy guidance',
            'Nutrition & exercise plans',
            'Expert support community',
            'Progress tracking'
          ]
        };
      case 'postpartum':
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your postpartum program is ready. Let\'s get you set up in the app.',
          programName: 'Postpartum Program',
          features: [
            'Recovery & healing guidance',
            'New mom support community',
            'Expert nutrition plans',
            'Wellness tracking'
          ]
        };
      default:
        return {
          emoji: '✅',
          title: 'Payment Confirmed!',
          subtitle: 'Your program is ready. Let\'s get you set up in the app.',
          programName: 'Program',
          features: [
            'Personalized daily guidance',
            'Expert support community',
            'Comprehensive resources',
            'Progress tracking'
          ]
        };
    }
  };

  const handleAppDownload = (platform: 'ios' | 'android') => {
    if (platform === 'ios') {
      // iOS App Store link
      window.open('https://apps.apple.com/us/app/natal-pregnancy-postpartum/id6596773195', '_blank');
    } else {
      // Google Play Store link
      window.open('https://play.google.com/store/apps/details?id=com.natalllc.prod&hl=en_US', '_blank');
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
        
        {/* App Features - Compact */}
        <div className="px-4 pb-4">
          <MobileCard className="p-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-3">Your {content.programName} Awaits</h2>
              <div className="space-y-2 text-left">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Download Buttons - Compact */}
        <div className="px-4 pb-4">
          <div className="space-y-2">
            <MobileButton 
              size="lg"
              onClick={() => handleAppDownload('ios')}
            >
              Download for iOS
            </MobileButton>
            <MobileButton 
              size="lg"
              onClick={() => handleAppDownload('android')}
            >
              Download for Android
            </MobileButton>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
