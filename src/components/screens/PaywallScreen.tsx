'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Stage } from '@/types';
import { useState } from 'react';


interface PaywallScreenProps {
  stage: Stage;
  email?: string;
}

export function PaywallScreen({ stage, email }: PaywallScreenProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    // Auto-navigate to payment screen after a short delay
    setTimeout(() => {
      window.location.href = `/payment?stage=${stage}&plan=${plan}${email ? `&email=${encodeURIComponent(email)}` : ''}`;
    }, 500);
  };
  const getStagePricing = () => {
    // All stages now have the same pricing structure
    return {
      monthly: 20,
      quarterly: 45,
      annual: 120,
      annualSavings: 120, // $120 savings (50% off $240)
      quarterlySavings: 60, // $60 savings (25% off $180)
      regularMonthly: 20,
      regularQuarterly: 60,
      regularAnnual: 240
    };
  };

  const pricing = getStagePricing();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Subscription Options
          </h1>
          <p className="text-sm text-muted-foreground">
            Select the plan that fits your lifestyle and wallet
          </p>
        </div>

        {/* Free Trial Notice - Moved to top */}
        <div className="px-4 pb-3">
          <MobileCard className="bg-blue-50 border-2 border-blue-200">
            <div className="text-center">
              <div className="text-sm mb-1">🎉</div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">3-Day Free Trial</h3>
              <p className="text-xs text-blue-700">
                All plans include a free 3-day trial. No payment required until after your trial period.
              </p>
            </div>
          </MobileCard>
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
          <div className="space-y-3">
            {/* Annual Plan - Best Value (Top) */}
            <MobileCard className="border-2 border-primary bg-primary/5 relative">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                  BEST VALUE
                </div>
              </div>
              <div className="text-center pt-2">
                <h3 className="text-lg font-semibold mb-1">Annual</h3>
                <div className="text-2xl font-bold text-primary mb-1">${pricing.annual}</div>
                <div className="text-sm text-muted-foreground mb-1">per year</div>
                <div className="text-sm font-semibold text-green-600 mb-2">Save ${pricing.annualSavings} (50% off!)</div>
                <div className="text-xs text-muted-foreground line-through mb-3">Regular: ${pricing.regularAnnual}</div>
                    <MobileButton
                      size="lg"
                      onClick={() => handlePlanSelect('annual')}
                      className={`w-full ${selectedPlan === 'annual' ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      {selectedPlan === 'annual' ? 'Selected' : 'Choose Annual'}
                    </MobileButton>
              </div>
            </MobileCard>

            {/* Quarterly Plan - Good Value (Middle) */}
            <MobileCard className="border-2 border-primary">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">Quarterly</h3>
                <div className="text-2xl font-bold text-primary mb-1">${pricing.quarterly}</div>
                <div className="text-sm text-muted-foreground mb-1">every 3 months</div>
                <div className="text-sm font-semibold text-green-600 mb-2">Save ${pricing.quarterlySavings} (25% off!)</div>
                <div className="text-xs text-muted-foreground line-through mb-3">Regular: ${pricing.regularQuarterly}</div>
                    <MobileButton
                      size="lg"
                      onClick={() => handlePlanSelect('quarterly')}
                      className={`w-full ${selectedPlan === 'quarterly' ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      {selectedPlan === 'quarterly' ? 'Selected' : 'Choose Quarterly'}
                    </MobileButton>
              </div>
            </MobileCard>

            {/* Monthly Plan - Standard (Bottom) */}
            <MobileCard className="border-2 border-gray-300">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">Monthly</h3>
                <div className="text-2xl font-bold text-foreground mb-1">${pricing.monthly}</div>
                <div className="text-sm text-muted-foreground mb-3">per month</div>
                    <MobileButton
                      size="lg"
                      variant="outline"
                      onClick={() => handlePlanSelect('monthly')}
                      className={`w-full ${selectedPlan === 'monthly' ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      {selectedPlan === 'monthly' ? 'Selected' : 'Choose Monthly'}
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

        {/* FAQ Section */}
        <div className="px-4 pb-2">
          <div className="text-center mb-3">
            <h3 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-2">
            {/* FAQ 1 */}
            <MobileCard className="border border-gray-200">
              <button
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                className="w-full text-left p-3 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-foreground">How does the free trial work?</span>
                <span className="text-lg text-muted-foreground transform transition-transform duration-200">
                  {openFAQ === 1 ? '−' : '+'}
                </span>
              </button>
              {openFAQ === 1 && (
                <div className="px-3 pb-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground pt-2">
                    You get 3 days completely free to try our programs. No payment is required during the trial. 
                    After 3 days, your chosen plan will automatically begin billing.
                  </p>
                </div>
              )}
            </MobileCard>

            {/* FAQ 2 */}
            <MobileCard className="border border-gray-200">
              <button
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                className="w-full text-left p-3 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-foreground">Can I cancel anytime?</span>
                <span className="text-lg text-muted-foreground transform transition-transform duration-200">
                  {openFAQ === 2 ? '−' : '+'}
                </span>
              </button>
              {openFAQ === 2 && (
                <div className="px-3 pb-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground pt-2">
                    Yes! You can cancel your subscription at any time from your account settings. 
                    No cancellation fees or hidden charges.
                  </p>
                </div>
              )}
            </MobileCard>

            {/* FAQ 3 */}
            <MobileCard className="border border-gray-200">
              <button
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                className="w-full text-left p-3 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-foreground">What if I'm not satisfied?</span>
                <span className="text-lg text-muted-foreground transform transition-transform duration-200">
                  {openFAQ === 3 ? '−' : '+'}
                </span>
              </button>
              {openFAQ === 3 && (
                <div className="px-3 pb-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground pt-2">
                    We offer a 30-day money-back guarantee. If you're not completely satisfied, 
                    contact us and we'll refund your payment, no questions asked.
                  </p>
                </div>
              )}
            </MobileCard>

            {/* FAQ 4 */}
            <MobileCard className="border border-gray-200">
              <button
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                className="w-full text-left p-3 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-foreground">How do I access my programs?</span>
                <span className="text-lg text-muted-foreground transform transition-transform duration-200">
                  {openFAQ === 4 ? '−' : '+'}
                </span>
              </button>
              {openFAQ === 4 && (
                <div className="px-3 pb-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground pt-2">
                    After subscribing, you'll get access to our mobile app where you can access all your programs, 
                    track progress, and connect with our community.
                  </p>
                </div>
              )}
            </MobileCard>
          </div>
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
