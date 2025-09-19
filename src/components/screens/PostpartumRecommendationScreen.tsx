'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

interface PostpartumRecommendationScreenProps {
  programs: string[];
  deliveryDate?: string;
}

export function PostpartumRecommendationScreen({ programs, deliveryDate }: PostpartumRecommendationScreenProps) {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(programs);
  const [isLoading, setIsLoading] = useState(false);

  const getProgramDetails = (programId: string) => {
    const programMap: { [key: string]: { name: string; description: string; features: string[] } } = {
      'abrx': {
        name: 'Ab Recovery',
        description: 'Heal and strengthen your core after pregnancy',
        features: ['Diastasis recti healing', 'Core strengthening', 'Safe progression']
      },
      'bs': {
        name: 'Body Strong',
        description: 'Rebuild strength and confidence postpartum',
        features: ['Full-body workouts', 'Strength training', 'Energy restoration']
      },
      'abrx-plus': {
        name: 'Ab Recovery Plus',
        description: 'Advanced core recovery for active moms',
        features: ['Advanced exercises', 'Sport-specific training', 'Performance focus']
      },
      'prolapse': {
        name: 'Prolapse Recovery',
        description: 'Specialized support for pelvic organ prolapse',
        features: ['Pelvic floor therapy', 'Safe exercises', 'Medical guidance']
      },
      'slim-down': {
        name: 'Slim Down',
        description: 'Healthy weight loss and body composition',
        features: ['Nutrition guidance', 'Fat loss workouts', 'Lifestyle coaching']
      },
      'easy-eats': {
        name: 'Easy Eats',
        description: 'Simple, nutritious meals for busy moms',
        features: ['Quick recipes', 'Meal prep guides', 'Family-friendly options']
      }
    };

    return programMap[programId] || {
      name: programId,
      description: 'Customized program for your recovery needs',
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
    
    // Navigate to subscription options with selected programs
    const params = new URLSearchParams({
      stage: 'postpartum',
      programs: selectedPrograms.join(','),
      source: 'recommendation'
    });
    
    if (deliveryDate) params.append('deliveryDate', deliveryDate);
    
    window.location.href = `/choose-plan?${params.toString()}`;
  };

  const getRecoveryStage = () => {
    if (!deliveryDate) return 'your recovery journey';
    
    const delivery = new Date(deliveryDate);
    const now = new Date();
    const diffTime = now.getTime() - delivery.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return 'early recovery';
    if (diffDays < 90) return 'active recovery';
    if (diffDays < 365) return 'strength building';
    return 'long-term wellness';
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">💪</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            Your Recovery Recommendations
          </h1>
          <p className="text-sm text-muted-foreground">
            Based on your quiz answers, we recommend these programs for {getRecoveryStage()}
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
