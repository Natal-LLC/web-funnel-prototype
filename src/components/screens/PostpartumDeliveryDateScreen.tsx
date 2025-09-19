'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

export function PostpartumDeliveryDateScreen() {
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const getDateLimits = () => {
    const today = new Date();
    const farPast = new Date(1900, 0, 1); // January 1, 1900 - as far back as reasonable
    return {
      min: farPast.toISOString().split('T')[0],
      max: today.toISOString().split('T')[0]
    };
  };

  const validateDate = (dateString: string) => {
    if (!dateString) return true;
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    if (selectedDate > today) {
      setDateError('Delivery date cannot be in the future');
      return false;
    }
    
    setDateError('');
    return true;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDeliveryDate(value);
    if (value) {
      validateDate(value);
    } else {
      setDateError('');
    }
  };

  const handleContinue = () => {
    if (deliveryDate && validateDate(deliveryDate)) {
      // Route to program knowledge question with delivery date context
      window.location.href = `/know-program?stage=postpartum&deliveryDate=${deliveryDate}`;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysSinceDelivery = (dateString: string) => {
    if (!dateString) return 0;
    const delivery = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - delivery.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateChildAge = (dateString: string) => {
    if (!dateString) return null;
    
    const delivery = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - delivery.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return null; // Future date
    
    if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} old`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months === 1 ? '' : 's'} old`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      const months = Math.floor(remainingDays / 30);
      
      if (months === 0) {
        return `${years} year${years === 1 ? '' : 's'} old`;
      } else {
        return `${years} year${years === 1 ? '' : 's'} and ${months} month${months === 1 ? '' : 's'} old`;
      }
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">👶</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Hey there Mama!
          </h1>
          <p className="text-sm text-muted-foreground">
            When was your most recent delivery?
          </p>
        </div>
        
        {/* Date Picker */}
        <div className="flex-1 px-4 pb-4 pt-2">
          <MobileCard className="w-full">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Select Your Delivery Date</h2>
              
              <div className="mb-4">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={handleDateChange}
                  className={`w-full p-3 border rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    dateError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  max={getDateLimits().max}
                  min={getDateLimits().min}
                />
                {dateError && (
                  <p className="text-red-500 text-xs mt-2">{dateError}</p>
                )}
              </div>

              {deliveryDate && !dateError && (
                <div className="space-y-3 mb-4">
                  <div className="text-sm text-muted-foreground">
                    Delivered: {formatDate(deliveryDate)}
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        Your youngest is approximately {calculateChildAge(deliveryDate)}!
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getDaysSinceDelivery(deliveryDate)} days postpartum
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                This helps us recommend the right recovery programs for you
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Continue Button */}
        {deliveryDate && !dateError && (
          <div className="px-4 pb-4">
            <MobileButton 
              size="lg"
              onClick={handleContinue}
            >
              Continue
            </MobileButton>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
