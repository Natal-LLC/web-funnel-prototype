'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

export function TTCTimelineScreen() {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');

  const timelineOptions = [
    { id: 'today', label: 'Today', description: 'I want to start trying immediately' },
    { id: 'next-month', label: 'Next Month', description: 'I want to start trying next month' },
    { id: 'six-months', label: 'In 6 Months', description: 'I want to start trying in about 6 months' },
    { id: 'next-year', label: 'Sometime Next Year', description: 'I want to start trying sometime next year' }
  ];

  const handleTimelineSelect = (timelineId: string) => {
    setSelectedTimeline(timelineId);
  };

  const handleContinue = () => {
    if (selectedTimeline) {
      // Route to TTC offer screen with timeline context
      window.location.href = `/ttc-offer?timeline=${selectedTimeline}`;
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">🌱</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            How Exciting!
          </h1>
          <p className="text-sm text-muted-foreground">
            When would you like to get pregnant?
          </p>
        </div>
        
        {/* Timeline Options */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="space-y-2">
            {timelineOptions.map((option) => (
              <MobileCard 
                key={option.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTimeline === option.id
                    ? 'border-2 border-primary bg-primary/5'
                    : 'border-2 border-transparent hover:border-primary/50'
                }`}
                onClick={() => handleTimelineSelect(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {option.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTimeline === option.id
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedTimeline === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </MobileCard>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        {selectedTimeline && (
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
