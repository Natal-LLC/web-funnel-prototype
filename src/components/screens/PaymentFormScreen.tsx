'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';
import { Stage } from '@/types';

interface PaymentFormScreenProps {
  stage: Stage;
  planType: 'trial' | 'monthly' | 'annual';
  email: string;
}

export function PaymentFormScreen({ stage, planType, email }: PaymentFormScreenProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    zipCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const getPlanDetails = () => {
    const basePricing = {
      ttc: { monthly: 25, annual: 120, trialDays: 7 },
      pregnancy: { monthly: 30, annual: 150, trialDays: 7 },
      postpartum: { monthly: 20, annual: 100, trialDays: 7 }
    };

    const pricing = basePricing[stage] || basePricing.ttc;

    switch (planType) {
      case 'trial':
        return {
          title: 'Free Trial',
          price: '$0',
          billing: '7 days free, then $25/month',
          description: 'Start your free trial'
        };
      case 'annual':
        return {
          title: 'Annual Plan',
          price: `$${pricing.annual}`,
          billing: 'Billed annually',
          description: 'Best value - save 60%'
        };
      default: // monthly
        return {
          title: 'Monthly Plan',
          price: `$${pricing.monthly}`,
          billing: 'Billed monthly',
          description: 'Cancel anytime'
        };
    }
  };

  const planDetails = getPlanDetails();

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit or Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Pay with Touch ID or Face ID'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '🔵',
      description: 'Quick and secure payment'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      icon: '💙',
      description: 'Pay with your Venmo balance'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: '🌸',
      description: 'Pay in 4 interest-free installments'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment method selection
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Validate card details only if credit card is selected
    if (selectedPaymentMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.name || !paymentData.zipCode) {
        alert('Please fill in all payment fields');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      // For front-end purposes only - log the data and proceed
      console.log('Payment data:', {
        email,
        stage,
        planType,
        paymentMethod: selectedPaymentMethod,
        paymentData: selectedPaymentMethod === 'card' ? {
          ...paymentData,
          cardNumber: paymentData.cardNumber.replace(/\s/g, '') // Remove spaces for processing
        } : null,
        timestamp: new Date().toISOString()
      });
      
      // Simulate brief processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to confirmation
      const params = new URLSearchParams({
        stage,
        plan: planType,
        email: encodeURIComponent(email),
        paymentMethod: selectedPaymentMethod
      });
      window.location.href = `/confirmation?${params.toString()}`;
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Payment Information
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete your purchase securely
          </p>
        </div>

        {/* Plan Summary */}
        <div className="px-4 pb-4">
          <MobileCard className="border-2 border-primary bg-primary/5">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-primary mb-1">{planDetails.title}</h2>
              <div className="text-2xl font-bold text-primary mb-1">{planDetails.price}</div>
              <div className="text-xs text-muted-foreground">{planDetails.billing}</div>
            </div>
          </MobileCard>
        </div>

        {/* Payment Form */}
        <div className="flex-1 px-4 pb-4">
          <MobileCard className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Choose Payment Method *
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`cursor-pointer p-3 border-2 rounded-lg transition-all ${
                            selectedPaymentMethod === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                        >
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{method.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{method.name}</div>
                              <div className="text-xs text-muted-foreground">{method.description}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedPaymentMethod === method.id
                                ? 'border-primary bg-primary'
                                : 'border-gray-300'
                            }`}>
                              {selectedPaymentMethod === method.id && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Details - Only show if credit card is selected */}
                  {selectedPaymentMethod === 'card' && (
                    <div className="space-y-4 pt-2 border-t">
                      {/* Card Number */}
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19} // 16 digits + 3 spaces
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={paymentData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      {/* Name on Card */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={paymentData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>

                      {/* ZIP Code */}
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-foreground mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          value={paymentData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value.replace(/\D/g, ''))}
                          placeholder="12345"
                          maxLength={5}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !selectedPaymentMethod}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isLoading ? 'Processing Payment...' : `Complete Purchase - ${planDetails.price}`}
                  </button>
                </form>
              </div>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Your payment information is secure and encrypted
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send your receipt to {email}
                </p>
              </div>
            </div>
          </MobileCard>
        </div>
      </div>
    </MobileLayout>
  );
}
