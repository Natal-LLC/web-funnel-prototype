'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

interface AppDownloadScreenProps {
  stage: Stage;
}

export function AppDownloadScreen({ stage }: AppDownloadScreenProps) {
  const getStageContent = () => {
    switch (stage) {
      case 'ttc':
        return {
          emoji: '📱',
          title: 'Download Our App',
          subtitle: 'Complete your setup and start your TTC journey',
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
          emoji: '📱',
          title: 'Download Our App',
          subtitle: 'Complete your setup and start your pregnancy journey',
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
          emoji: '📱',
          title: 'Download Our App',
          subtitle: 'Complete your setup and start your postpartum journey',
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
          emoji: '📱',
          title: 'Download Our App',
          subtitle: 'Complete your setup and start your journey',
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

  const content = getStageContent();

  const handleAppDownload = () => {
    // This would handle deep linking to the mobile app
    console.log(`Deep linking to mobile app with ${stage} program access`);
    // For now, we'll just show a success message
    alert('App download initiated! You will be redirected to the App Store/Google Play.');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* App Download Section - Compact */}
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
        <div className="flex-1 px-4 pb-4">
          <MobileCard className="h-full flex items-center justify-center">
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
        <div className="px-4 pb-3">
          <div className="space-y-2">
            <MobileButton 
              size="lg"
              onClick={handleAppDownload}
            >
              Download for iOS
            </MobileButton>
            <MobileButton 
              size="lg"
              onClick={handleAppDownload}
            >
              Download for Android
            </MobileButton>
          </div>
        </div>

        {/* Back Button - Bottom */}
        <div className="px-4 pb-4">
          <MobileButton 
            variant="outline" 
            size="md"
            onClick={() => window.location.href = '/stage-selection'}
          >
            ← Back to Stage Selection
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
