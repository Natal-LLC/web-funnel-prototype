'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

export function StageSelectionScreen() {
  const handleStageSelection = (stage: Stage) => {
    console.log('Stage selected:', stage);
    
    if (stage === 'ttc') {
      // TTC goes to timeline collection
      window.location.href = `/ttc-timeline`;
    } else if (stage === 'pregnancy') {
      // Pregnancy goes to due date collection
      window.location.href = `/pregnancy-due-date`;
    } else if (stage === 'postpartum') {
      // Postpartum goes to delivery date collection
      window.location.href = `/postpartum-delivery-date`;
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header - More Compact */}
        <div className="text-center px-4 pt-4 pb-3">
          <h1 className="text-xl font-bold text-foreground mb-1 leading-tight">
            Welcome to nātal 
          </h1>
          <p className="text-sm text-muted-foreground">
            Let's find the perfect program for you! <br /> Choose from one of the following options to get started.</p>
        </div>  
        
        {/* Stage Selection Cards - More Compact */}
        <div className="flex-1 px-4 pb-4">
          <div className="space-y-3 flex flex-col justify-center min-h-0">
            <MobileCard 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center py-6"
              onClick={() => handleStageSelection('postpartum')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👶</div>
                <h2 className="text-lg font-bold mb-1">Postpartum</h2>
                <p className="text-xs text-muted-foreground font-medium">
                Fourth Trimester
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recovery and support
                </p>
              </div>
            </MobileCard>

            <MobileCard 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center py-6"
              onClick={() => handleStageSelection('pregnancy')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🤰</div>
                <h2 className="text-lg font-bold mb-1">Pregnancy</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Currently Pregnant
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Customized solutions
                </p>
              </div>
            </MobileCard>

            <MobileCard 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center py-6"
              onClick={() => handleStageSelection('ttc')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🌱</div>
                <h2 className="text-lg font-bold mb-1">Conception</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Trying to Conceive
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Preparing your body
                </p>
              </div>
            </MobileCard>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="px-4 pb-6 pt-4">
          <MobileButton
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Back to Home
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
