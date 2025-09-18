'use client';

import { MobileLayout, MobileCard } from '@/components/ui/MobileLayout';
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
        {/* Header - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Welcome to Your Wellness Journey
          </h1>
          <p className="text-sm text-muted-foreground">
            Let's find the perfect program for your stage
          </p>
        </div>
        
        {/* Stage Selection Cards - Compact and Responsive */}
        <div className="flex-1 px-4 pb-4">
          <div className="space-y-2 h-full flex flex-col">
            <MobileCard 
              className="flex-1 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center"
              onClick={() => handleStageSelection('ttc')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🌱</div>
                <h2 className="text-lg font-bold mb-1">TTC</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Trying to Conceive
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Preparing your body for conception
                </p>
              </div>
            </MobileCard>

            <MobileCard 
              className="flex-1 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center"
              onClick={() => handleStageSelection('pregnancy')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🤰</div>
                <h2 className="text-lg font-bold mb-1">Pregnancy</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Currently Pregnant
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supporting you through your pregnancy journey
                </p>
              </div>
            </MobileCard>

            <MobileCard 
              className="flex-1 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 border-2 border-transparent hover:border-primary flex items-center justify-center"
              onClick={() => handleStageSelection('postpartum')}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👶</div>
                <h2 className="text-lg font-bold mb-1">Postpartum</h2>
                <p className="text-xs text-muted-foreground font-medium">
                  New Mom
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recovery and adjustment support
                </p>
              </div>
            </MobileCard>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
