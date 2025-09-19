'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

export function PregnancyDueDateScreen() {
  const [dueDate, setDueDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const getDateLimits = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + (42 * 7)); // 42 weeks from today
    
    return {
      min: today.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  const calculateTrimester = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    
    // Calculate days until due date
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    
    // Calculate weeks pregnant (assuming 40 weeks = 280 days total pregnancy)
    const daysPregnant = 280 - daysUntilDue;
    
    if (daysPregnant < 0) {
      return { trimester: 'pre-pregnancy', message: 'You haven\'t conceived yet' };
    } else if (daysPregnant <= 84) { // Day 1 to Day 84 (Week 1-12)
      return { trimester: 'first', message: 'You\'re in your first trimester!' };
    } else if (daysPregnant <= 189) { // Day 85 to Day 189 (Week 12-27)
      return { trimester: 'second', message: 'You\'re in your second trimester!' };
    } else if (daysPregnant <= 294) { // Day 190 to Day 294 (Week 27-42)
      return { trimester: 'third', message: 'You\'re in your third trimester!' };
    } else {
      return { trimester: 'post-term', message: 'You\'re past your due date' };
    }
  };

  const validateDate = (dateString: string) => {
    if (!dateString) return true;
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    const limits = getDateLimits();
    
    if (selectedDate < today) {
      setDateError('Due date cannot be in the past');
      return false;
    }
    
    if (selectedDate > new Date(limits.max)) {
      setDateError('Due date cannot be more than 42 weeks away');
      return false;
    }
    
    setDateError('');
    return true;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDueDate(value);
    
    if (value) {
      validateDate(value);
    } else {
      setDateError('');
    }
  };

  const handleContinue = () => {
    if (dueDate && validateDate(dueDate)) {
      const trimesterInfo = calculateTrimester(dueDate);
      // Route to program knowledge question with due date and trimester context
      window.location.href = `/know-program?stage=pregnancy&dueDate=${dueDate}&trimester=${trimesterInfo.trimester}`;
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

  const getTrimesterInfo = () => {
    if (!dueDate) return null;
    return calculateTrimester(dueDate);
  };

  const limits = getDateLimits();
  const trimesterInfo = getTrimesterInfo();

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">🤰</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Congratulations!
          </h1>
          <p className="text-sm text-muted-foreground">
            What's your due date?
          </p>
        </div>
        
        {/* Date Picker */}
        <div className="flex-1 px-4 pb-4 pt-2">
          <MobileCard className="w-full">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Select Your Due Date</h2>
              
              <div className="mb-4">
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDateChange}
                  className={`w-full p-3 border rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    dateError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={limits.min}
                  max={limits.max}
                />
                {dateError && (
                  <p className="text-red-500 text-xs mt-2">{dateError}</p>
                )}
              </div>

              {dueDate && !dateError && trimesterInfo && (
                <div className="space-y-3 mb-4">
                  <div className="text-sm text-muted-foreground">
                    Due: {formatDate(dueDate)}
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        {trimesterInfo.message}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Don't worry if you're not sure - you can always update this later
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Continue Button */}
        {dueDate && !dateError && (
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
