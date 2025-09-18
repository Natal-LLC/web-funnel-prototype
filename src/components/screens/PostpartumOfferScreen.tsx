'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';
import { validateEmailForSubscription, validateEmailRealTime, formatEmailSuggestions } from '@/lib/emailValidation';

interface PostpartumOfferScreenProps {
  programs?: string;
  deliveryDate?: string;
}

export function PostpartumOfferScreen({ programs, deliveryDate }: PostpartumOfferScreenProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProgramNames = () => {
    if (!programs) return 'our postpartum recovery programs';
    
    const programMap: { [key: string]: string } = {
      'abrx': 'Ab Recovery',
      'bs': 'Body Strong',
      'abrx-plus': 'Ab Recovery Plus',
      'prolapse': 'Prolapse Recovery',
      'slim-down': 'Slim Down',
      'easy-eats': 'Easy Eats'
    };
    
    const programList = programs.split(',').map(p => programMap[p] || p).join(', ');
    return programList;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Real-time validation
    const realTimeValidation = validateEmailRealTime(value);
    if (realTimeValidation.isValid && emailError) {
      setEmailError('');
      setEmailSuggestions([]);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive validation
    const validation = validateEmailForSubscription(email.trim());
    if (!validation.isValid) {
      setEmailError(validation.error || 'Please enter a valid email address');
      setEmailSuggestions(validation.suggestions || []);
      return;
    }

    setEmailError('');
    setEmailSuggestions([]);
    
    try {
      // Here you would typically save the email to your backend
      console.log('Email captured:', email);
      console.log('Programs:', programs);
      console.log('Delivery Date:', deliveryDate);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to paywall (plan selection) with email and context
      const params = new URLSearchParams({
        stage: 'postpartum',
        email: encodeURIComponent(email)
      });
      
      if (programs) params.append('programs', programs);
      if (deliveryDate) params.append('deliveryDate', deliveryDate);
      
      window.location.href = `/choose-plan?${params.toString()}`;
    } catch (error) {
      console.error('Error capturing email:', error);
      setEmailError('Something went wrong. Please try again.');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`Continue with ${provider}`);
    
    const params = new URLSearchParams({
      stage: 'postpartum',
      provider
    });
    
    if (programs) params.append('programs', programs);
    if (deliveryDate) params.append('deliveryDate', deliveryDate);
    
    window.location.href = `/choose-plan?${params.toString()}`;
  };

  const offerContent = {
    emoji: '👶',
    title: "You've Unlocked Your Special Postpartum Offer!",
    subtitle: `Get exclusive access to ${getProgramNames()}`,
    programName: 'Exclusive Postpartum Recovery Programs',
    discount: '40% OFF',
    features: [
      'Personalized recovery guidance',
      'Expert-led workout programs',
      'Nutrition support & meal plans',
      'Community support & accountability',
      '30-day money-back guarantee'
    ],
    buttonText: 'Claim Your Special Offer'
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">{offerContent.emoji}</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            {offerContent.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {offerContent.subtitle}
          </p>
        </div>

        {/* Offer Details */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <MobileCard className="h-full">
            <div className="p-4 space-y-4">
              {/* Program Highlight */}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-primary mb-2">
                  {offerContent.programName}
                </h2>
                <div className="text-2xl font-bold text-primary mb-3">
                  {offerContent.discount}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">What's included:</h3>
                {offerContent.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Email Capture Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3 pt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter your email to claim your offer
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your.email@example.com"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                  {emailSuggestions.length > 0 && (
                    <p className="text-blue-500 text-xs mt-1">
                      {formatEmailSuggestions(emailSuggestions)}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : offerContent.buttonText}
                </button>
              </form>

              {/* Social Login */}
              <div className="space-y-3 pt-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('apple')}
                    className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">Apple</span>
                  </button>
                </div>
              </div>
            </div>
          </MobileCard>
        </div>
      </div>
    </MobileLayout>
  );
}
