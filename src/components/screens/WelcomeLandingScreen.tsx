'use client';

import { MobileLayout, MobileButton } from '@/components/ui/MobileLayout';

export function WelcomeLandingScreen() {
  return (
    <MobileLayout>
      <div className="splash-simple">
        {/* NATAL Logo at top */}
        <div className="splash-logo">
          <img 
            src="/images/logos/natal-logo.png" 
            alt="NATAL" 
            className="splash-logo-img"
          />
        </div>

        {/* Action buttons at bottom */}
        <div className="splash-buttons">
          <MobileButton 
            size="lg"
            onClick={() => window.location.href = '/stage-selection'}
          >
            Start My Journey
          </MobileButton>
          <MobileButton 
            size="lg"
            variant="outline"
            onClick={() => window.location.href = '/sign-in'}
          >
            Existing User
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
