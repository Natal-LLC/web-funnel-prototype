'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

interface PregnancyRecommendationScreenProps {
  programs: string[];
  trimester?: string;
  dueDate?: string;
}

export function PregnancyRecommendationScreen({ programs, trimester, dueDate }: PregnancyRecommendationScreenProps) {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(programs);
  const [isLoading, setIsLoading] = useState(false);

  const getProgramDetails = (programId: string) => {
    const programMap: { [key: string]: { name: string; description: string; features: string[] } } = {
      'bb': {
        name: 'Beginner Bump',
        description: 'Perfect for first-time moms or those new to fitness during pregnancy',
        features: ['Gentle workouts', 'Basic nutrition guidance', 'Community support']
      },
      'ea-first': {
        name: 'Expecting Athletes - First Trimester',
        description: 'For active women maintaining fitness through early pregnancy',
        features: ['Modified athletic training', 'Performance nutrition', 'Recovery protocols']
      },
      'ea-second': {
        name: 'Expecting Athletes - Second Trimester',
        description: 'Optimized training for your energy peak trimester',
        features: ['Strength training', 'Cardio modifications', 'Core stability']
      },
      'ea-third': {
        name: 'Expecting Athletes - Third Trimester',
        description: 'Preparing for labor with safe, effective workouts',
        features: ['Labor preparation', 'Pelvic floor focus', 'Recovery techniques']
      },
      'ab-prehab': {
        name: 'Ab Prehab',
        description: 'Prevent and manage diastasis recti during pregnancy',
        features: ['Core assessment', 'Safe ab exercises', 'Posture correction']
      },
      'labor-prep': {
        name: 'Labor Prep',
        description: 'Physical and mental preparation for childbirth',
        features: ['Labor positions', 'Breathing techniques', 'Partner exercises']
      }
    };

    return programMap[programId] || {
      name: programId,
      description: 'Customized program for your needs',
      features: ['Personalized guidance', 'Expert support', 'Community access']
    };
  };

  const toggleProgram = (programId: string) => {
    setSelectedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleContinue = () => {
    if (selectedPrograms.length === 0) return;
    
    setIsLoading(true);
    
    // Navigate to offer screen with selected programs
    const params = new URLSearchParams({
      stage: 'pregnancy',
      programs: selectedPrograms.join(','),
      source: 'recommendation'
    });
    
    if (trimester) params.append('trimester', trimester);
    if (dueDate) params.append('dueDate', dueDate);
    
    window.location.href = `/choose-plan?${params.toString()}`;
  };

  const getTrimesterText = () => {
    switch (trimester) {
      case 'first': return 'first trimester';
      case 'second': return 'second trimester';
      case 'third': return 'third trimester';
      default: return 'your pregnancy journey';
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Your Personalized Recommendations
          </h1>
          <p className="text-sm text-muted-foreground">
            Based on your quiz answers, we recommend these programs for {getTrimesterText()}
          </p>
        </div>

        {/* Program Recommendations */}
        <div className="flex-1 px-4 pb-4">
          <div className="space-y-3">
            {programs.map((programId) => {
              const program = getProgramDetails(programId);
              const isSelected = selectedPrograms.includes(programId);
              
              return (
                <MobileCard 
                  key={programId}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-2 border-primary bg-primary/5' 
                      : 'border border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => toggleProgram(programId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-base font-semibold text-foreground mr-2">
                          {program.name}
                        </h3>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {program.description}
                      </p>
                      <div className="space-y-1">
                        {program.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </MobileCard>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-4 pb-4">
          <MobileButton 
            size="lg"
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : `Continue with ${selectedPrograms.length} program${selectedPrograms.length > 1 ? 's' : ''}`}
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}