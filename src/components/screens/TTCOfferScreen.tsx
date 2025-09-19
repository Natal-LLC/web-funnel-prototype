'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';
import { validateEmailForSubscription, validateEmailRealTime, formatEmailSuggestions } from '@/lib/emailValidation';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

interface TTCOfferScreenProps {
  stage: Stage;
  timeline?: string;
}

export function TTCOfferScreen({ stage, timeline }: TTCOfferScreenProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const realTimeValidation = validateEmailRealTime(value);
    if (realTimeValidation.isValid && emailError) {
      setEmailError('');
      setEmailSuggestions([]);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEmailForSubscription(email.trim());

    if (!validation.isValid) {
      setEmailError(validation.error || 'Please enter a valid email address');
      setEmailSuggestions(validation.suggestions || []);
      return;
    }

    setIsLoading(true);
    setEmailError('');
    setEmailSuggestions([]);

    try {
      console.log('Email captured:', email);
      console.log('Timeline:', timeline);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const params = new URLSearchParams({
        stage,
        email: encodeURIComponent(email)
      });
      if (timeline) params.append('timeline', timeline);

      window.location.href = `/choose-plan?${params.toString()}`;
    } catch (error) {
      console.error('Error capturing email:', error);
      setEmailError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`Continue with ${provider}`);
    // Here you would integrate with actual social login providers
    // For now, just navigate to paywall (plan selection)
    window.location.href = `/choose-plan?stage=ttc&provider=${provider}&timeline=${timeline || ''}`;
  };


  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Login Options */}
        <div className="flex-1 px-4 pb-4 pt-6">
          <MobileCard className="h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="space-y-4">
                {/* Social Login Options - Primary */}
                <div className="space-y-3">
                  {/* Google Sign In */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  {/* Apple Sign In */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                {/* Email Option - Secondary */}
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleEmailSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Continue with Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="your@email.com"
                        className={`w-full px-3 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          emailError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {emailError && (
                        <div className="mt-1">
                          <p className="text-red-500 text-xs">{emailError}</p>
                          {emailSuggestions.length > 0 && (
                            <p className="text-blue-600 text-xs mt-1">
                              💡 {formatEmailSuggestions(emailSuggestions)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!email.trim() || !validateEmailRealTime(email).isValid || isLoading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      {isLoading ? 'Processing...' : 'Continue with Email'}
                    </button>
                  </form>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </MobileCard>
        </div>
      </div>
    </MobileLayout>
  );
}