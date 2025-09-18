'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Stage } from '@/types';


interface PaywallScreenProps {
  stage: Stage;
  email?: string;
}

export function PaywallScreen({ stage, email }: PaywallScreenProps) {
  const getStagePricing = () => {
    switch (stage) {
      case 'ttc':
        return {
          monthly: 25,
          annual: 120,
          savings: '60%',
          regularPrice: 300
        };
      case 'pregnancy':
        return {
          monthly: 30,
          annual: 150,
          savings: '58%',
          regularPrice: 360
        };
      case 'postpartum':
        return {
          monthly: 20,
          annual: 100,
          savings: '58%',
          regularPrice: 240
        };
      default:
        return {
          monthly: 25,
          annual: 120,
          savings: '60%',
          regularPrice: 300
        };
    }
  };

  const pricing = getStagePricing();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Choose Your Plan
          </h1>
          <p className="text-sm text-muted-foreground">
            Select the plan that works best for your {stage === 'ttc' ? 'TTC' : stage === 'pregnancy' ? 'pregnancy' : 'postpartum'} journey
          </p>
        </div>

        {/* Timer - Compact */}
        <div className="px-4 pb-3">
          <MobileCard className="border-2 border-red-500 bg-red-50">
            <div className="text-center">
              <div className="text-lg mb-1">⏰</div>
              <h3 className="text-sm font-semibold text-red-600 mb-1">Limited Time Offer</h3>
              <CountdownTimer initialMinutes={15} />
            </div>
          </MobileCard>
        </div>
        
        {/* Subscription Options - Compact */}
        <div className="flex-1 px-4 pb-4">
          <div className="space-y-2 h-full flex flex-col">
            {/* Free Trial */}
            <MobileCard className="flex-1 border-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-base font-semibold mb-1">Free Trial</h3>
                <div className="text-xl font-bold text-foreground mb-1">$0</div>
                <div className="text-xs text-muted-foreground mb-2">7 days free, then ${pricing.monthly}/month</div>
                <MobileButton 
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = `/payment?stage=${stage}&plan=trial${email ? `&email=${encodeURIComponent(email)}` : ''}`}
                >
                  Start Free Trial
                </MobileButton>
              </div>
            </MobileCard>

            {/* Monthly Plan */}
            <MobileCard className="flex-1 border-2 border-primary flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-base font-semibold mb-1">Monthly</h3>
                <div className="text-xl font-bold text-primary mb-1">${pricing.monthly}</div>
                <div className="text-xs text-muted-foreground mb-2">per month</div>
                <MobileButton 
                  size="sm"
                  onClick={() => window.location.href = `/payment?stage=${stage}&plan=monthly${email ? `&email=${encodeURIComponent(email)}` : ''}`}
                >
                  Choose Monthly
                </MobileButton>
              </div>
            </MobileCard>

            {/* Annual Plan - Most Popular */}
            <MobileCard className="flex-1 border-2 border-primary bg-primary/5 relative flex items-center justify-center">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold mb-1">Annual</h3>
                <div className="text-xl font-bold text-primary mb-1">${pricing.annual}</div>
                <div className="text-xs text-muted-foreground mb-1">per year ({pricing.savings} savings!)</div>
                <div className="text-xs text-muted-foreground line-through mb-2">Regular: ${pricing.regularPrice}</div>
                <MobileButton 
                  size="sm"
                  onClick={() => window.location.href = `/payment?stage=${stage}&plan=annual${email ? `&email=${encodeURIComponent(email)}` : ''}`}
                >
                  Choose Annual
                </MobileButton>
              </div>
            </MobileCard>
          </div>
        </div>

        {/* Money Back Guarantee - Compact */}
        <div className="px-4 pb-2">
          <MobileCard className="bg-green-50 border-2 border-green-200">
            <div className="text-center">
              <div className="text-sm mb-1">🛡️</div>
              <h3 className="text-sm font-semibold text-green-800 mb-1">30-Day Money-Back Guarantee</h3>
              <p className="text-xs text-green-700">
                If you're not completely satisfied, we'll refund your payment, no questions asked.
              </p>
            </div>
          </MobileCard>
        </div>

        {/* Security Badge - Compact */}
        <div className="text-center text-xs text-muted-foreground px-4 pb-4">
          <div className="flex items-center justify-center mb-1">
            <span className="mr-1">🔒</span>
            <span>Secure payment • SSL encrypted</span>
          </div>
          <div>Cancel anytime • No hidden fees</div>
        </div>
      </div>
    </MobileLayout>
  );
}
