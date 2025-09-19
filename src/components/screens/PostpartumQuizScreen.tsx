'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface QuizAnswers {
  // Main mapping questions
  deliveryType?: 'vaginal' | 'vbac' | 'c-section';
  recovered?: 'no' | 'idk' | 'yes';
  programStyle?: 'quick-simple' | 'step-by-step' | 'fun-follow' | 'extra-support';
  nutrition?: 'yes' | 'no';
  mealPlan?: 'full-detailed' | 'grab-go';
  
  // Problem/symptom questions
  diastasis?: 'yes' | 'no' | 'idk';
  leaking?: 'yes' | 'no' | 'idk';
  pelvicFloorStrength?: 'too-weak' | 'just-right' | 'too-strong';
  coreStrength?: 'good' | 'bad';
  painAreas?: string[];
  prolapse?: 'yes' | 'no' | 'idk';
  posture?: 'very-bad' | 'bad' | 'good' | 'very-good' | 'perfect';
  pooch?: 'yes' | 'no';
  
  // Feature/benefit questions
  coaching?: 'left-alone' | 'expert-guidance';
  motivation?: 'challenges-prizes' | 'self-starter';
  community?: 'yes' | 'no';
  postureAssessment?: 'yes' | 'no';
}

export function PostpartumQuizScreen() {
  const searchParams = useSearchParams();
  const deliveryDate = searchParams.get('deliveryDate') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  // Question definitions
  const questions = [
    // Question 1: Delivery Type
    {
      id: 1,
      title: 'What type of birth did you have?',
      type: 'single-select',
      options: [
        { value: 'vaginal', label: 'Vaginal' },
        { value: 'vbac', label: 'Vaginal Birth After Cesarean (VBAC)' },
        { value: 'c-section', label: 'C-Section' }
      ]
    },
    // Question 2: C-section Pooch (only if C-section or VBAC)
    {
      id: 2,
      title: 'Do you notice a shelf / pooch / pouch above your C-Section scar?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      condition: () => answers.deliveryType === 'c-section' || answers.deliveryType === 'vbac'
    },
    // Question 3: Recovery Status
    {
      id: 3,
      title: 'Have you already completed a formal recovery protocol since your most recent birth?',
      type: 'single-select',
      options: [
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" },
        { value: 'yes', label: 'Yes' }
      ]
    },
    // Question 4: Program Style (only if recovered = yes)
    {
      id: 4,
      title: 'Which of the following best describes your preferred program style?',
      type: 'single-select',
      options: [
        { value: 'quick-simple', label: 'Quick & Simple Routines' },
        { value: 'step-by-step', label: 'Step-by-Step Recovery Plan' },
        { value: 'fun-follow', label: 'Fun, Follow Along Workouts' },
        { value: 'extra-support', label: 'Extra Support & Accountability from coach' }
      ],
      condition: () => answers.recovered === 'yes'
    },
    // Question 5: Nutrition
    {
      id: 5,
      title: 'Would you like additional guidance and support with your nutrition?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes, please!' },
        { value: 'no', label: 'No, thank you!' }
      ]
    },
    // Question 6: Meal Plan (only if nutrition = yes)
    {
      id: 6,
      title: 'What type of nutritional guidance do you prefer?',
      type: 'single-select',
      options: [
        { value: 'full-detailed', label: 'Full Detailed Meal Plans' },
        { value: 'grab-go', label: 'Easy Grab & Go Options' }
      ],
      condition: () => answers.nutrition === 'yes'
    },
    // Question 7: Diastasis
    {
      id: 7,
      title: 'Do you suffer from diastasis (i.e. ab separation)?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 8: Leaking
    {
      id: 8,
      title: 'Do you experience leaking?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 9: Pelvic Floor Strength
    {
      id: 9,
      title: 'How would you describe your pelvic floor strength?',
      type: 'single-select',
      options: [
        { value: 'too-weak', label: 'Too weak' },
        { value: 'just-right', label: 'Just right' },
        { value: 'too-strong', label: 'Too strong' }
      ]
    },
    // Question 10: Core Strength
    {
      id: 10,
      title: 'How would you describe your core strength?',
      type: 'single-select',
      options: [
        { value: 'good', label: 'Good' },
        { value: 'bad', label: 'Bad' }
      ]
    },
    // Question 11: Pain Areas
    {
      id: 11,
      title: 'Do you suffer from pain in the following areas?',
      type: 'multi-select',
      options: [
        { value: 'Head and Neck', label: 'Head and Neck' },
        { value: 'Shoulder', label: 'Shoulder' },
        { value: 'Upper Back', label: 'Upper Back' },
        { value: 'Lower Back', label: 'Lower Back' },
        { value: 'Hip', label: 'Hip' },
        { value: 'Knee', label: 'Knee' },
        { value: 'Feet and Ankles', label: 'Feet and Ankles' },
        { value: 'None of the Above', label: 'None of the Above' }
      ]
    },
    // Question 12: Prolapse
    {
      id: 12,
      title: 'Do you suffer from prolapse?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 13: Posture
    {
      id: 13,
      title: 'How would you describe your posture?',
      type: 'single-select',
      options: [
        { value: 'very-bad', label: 'Very Bad' },
        { value: 'bad', label: 'Bad' },
        { value: 'good', label: 'Good' },
        { value: 'very-good', label: 'Very Good' },
        { value: 'perfect', label: 'Perfect' }
      ]
    },
    // Question 14: Coaching
    {
      id: 14,
      title: 'What type of coaching do you prefer?',
      type: 'single-select',
      options: [
        { value: 'left-alone', label: 'Private Coaching' },
        { value: 'expert-guidance', label: 'Group Coaching' },
        { value: 'no-guidance', label: 'I do not need coaching' },
      ]
    },
    // Question 15: Motivation
    {
      id: 15,
      title: 'What type of motivation style works best for you?',
      type: 'single-select',
      options: [
        { value: 'challenges-prizes', label: 'Prizes and Rewards' },
        { value: 'public-recognition', label: 'Public Recognition' },
        { value: 'self-starter', label: "I'm a self starter" }
      ]
    },
    // Question 16: Community
    {
      id: 16,
      title: 'Do you value a supportive community?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    // Question 17: Posture Assessment
    {
      id: 17,
      title: 'Would you like a posture assessment?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    }
  ];

  // Filter questions based on conditions
  const availableQuestions = questions.filter(q => !q.condition || q.condition());
  const currentQuestionData = availableQuestions[currentQuestion - 1];

  // Handle option selection
  const handleOptionSelect = (optionValue: string) => {
    if (currentQuestionData?.type === 'single-select') {
      // Single select - update the appropriate field and auto-advance
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'pooch',
        3: 'recovered',
        4: 'programStyle',
        5: 'nutrition',
        6: 'mealPlan',
        7: 'diastasis',
        8: 'leaking',
        9: 'pelvicFloorStrength',
        10: 'coreStrength',
        11: 'painAreas',
        12: 'prolapse',
        13: 'posture',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      if (field) {
        setAnswers(prev => ({ ...prev, [field]: optionValue as string }));
        
        // Auto-advance to next question after a short delay
        setTimeout(() => {
          if (currentQuestion < availableQuestions.length) {
            setCurrentQuestion(prev => prev + 1);
          } else {
            // Quiz complete - navigate to offer screen
            const recommendedPrograms = getRecommendedPrograms();
            const params = new URLSearchParams({
              stage: 'postpartum',
              programs: recommendedPrograms.join(','),
              source: 'quiz'
            });

            if (deliveryDate) {
              params.append('deliveryDate', deliveryDate);
            }

            window.location.href = `/postpartum-offer?${params.toString()}`;
          }
        }, 300);
      }
    } else if (currentQuestionData?.type === 'multi-select') {
      // Multi select - handle "none of the above" logic
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        11: 'painAreas'
      };
      
      const field = fieldMap[currentQuestionData.id];
      if (field) {
        const currentArray = (answers[field] as string[]) || [];
        
        // Handle "none of the above" option
        if (optionValue === 'None of the Above') {
          // If selecting "none of the above", clear all other selections
          setAnswers(prev => ({ ...prev, [field]: ['None of the Above'] }));
        } else {
          // If selecting a regular option, remove "none of the above" if it exists
          let newArray;
          if (currentArray.includes(optionValue)) {
            // Deselecting the option
            newArray = currentArray.filter(item => item !== optionValue);
          } else {
            // Selecting the option - remove "none of the above" first
            newArray = [...currentArray.filter(item => item !== 'None of the Above'), optionValue];
          }
          
          setAnswers(prev => ({ ...prev, [field]: newArray }));
        }
      }
    }
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestionData) return false;
    
    if (currentQuestionData.type === 'single-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'pooch',
        3: 'recovered',
        4: 'programStyle',
        5: 'nutrition',
        6: 'mealPlan',
        7: 'diastasis',
        8: 'leaking',
        9: 'pelvicFloorStrength',
        10: 'coreStrength',
        11: 'painAreas',
        12: 'prolapse',
        13: 'posture',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? !!answers[field] : false;
    } else if (currentQuestionData.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        11: 'painAreas'
      };
      
      const field = fieldMap[currentQuestionData.id];
      const array = field ? (answers[field] as string[]) || [] : [];
      return array.length > 0;
    }
    
    return false;
  };

  // Helper function to calculate weeks postpartum
  const getWeeksPostpartum = () => {
    if (!deliveryDate) return null;
    
    const delivery = new Date(deliveryDate);
    const today = new Date();
    const diffTime = today.getTime() - delivery.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    return diffWeeks;
  };

  // Program mapping logic
  const getRecommendedPrograms = () => {
    const programs: string[] = [];
    const weeksPostpartum = getWeeksPostpartum();

    // 1. FITNESS PROGRAMS (Priority 1 - Always first)
    if (answers.recovered === 'no' || answers.recovered === 'idk') {
      // User has not formally completed recovery from pregnancy
      programs.push('ab-rehab');
    } else if (answers.recovered === 'yes') {
      // User has recovered from pregnancy
      if (answers.programStyle === 'quick-simple' || answers.programStyle === 'fun-follow') {
        programs.push('bod-squad');
      } else if (answers.programStyle === 'step-by-step' || answers.programStyle === 'extra-support') {
        programs.push('ab-rehab-plus');
      }
    }

    // 2. NUTRITION PROGRAMS (Priority 2 - If interested)
    if (answers.nutrition === 'yes') {
      if (answers.mealPlan === 'full-detailed') {
        programs.push('30-day-slim-down');
      } else if (answers.mealPlan === 'grab-go') {
        programs.push('easy-eats');
      }
    }

    // 3. SYMPTOMATIC PROGRAMS (Priority 3 - Last)
    // Early postpartum plan (if fewer than 6 weeks postpartum)
    if (weeksPostpartum !== null && weeksPostpartum < 6) {
      programs.push('early-postpartum');
    }

    // Prolapse program (if they have prolapse)
    if (answers.prolapse === 'yes') {
      programs.push('prolapse');
    }

    // C-section program (if they had C-section or VBAC)
    if (answers.deliveryType === 'c-section' || answers.deliveryType === 'vbac') {
      programs.push('c-section-recovery');
    }

    return programs;
  };

  const handleNext = () => {
    if (currentQuestion < availableQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz complete - navigate to offer screen with recommended programs
      const recommendedPrograms = getRecommendedPrograms();
      const params = new URLSearchParams({
        stage: 'postpartum',
        programs: recommendedPrograms.join(','),
        source: 'quiz'
      });

      setIsLoading(true);
      window.location.href = `/postpartum-offer?${params.toString()}`;
    }
  };


  // Check if option is selected
  const isOptionSelected = (optionValue: string) => {
    if (currentQuestionData?.type === 'single-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'pooch',
        3: 'recovered',
        4: 'programStyle',
        5: 'nutrition',
        6: 'mealPlan',
        7: 'diastasis',
        8: 'leaking',
        9: 'pelvicFloorStrength',
        10: 'coreStrength',
        11: 'painAreas',
        12: 'prolapse',
        13: 'posture',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? answers[field] === optionValue : false;
    } else if (currentQuestionData?.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        11: 'painAreas'
      };
      
      const field = fieldMap[currentQuestionData.id];
      const array = field ? (answers[field] as string[]) || [] : [];
      return array.includes(optionValue);
    }
    
    return false;
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">👶</div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Postpartum Quiz
          </h1>
          <p className="text-sm text-muted-foreground">
            Let's find the perfect recovery programs for you
          </p>
          <div className="mt-3 text-xs text-muted-foreground">
            Question {currentQuestion} of {availableQuestions.length}
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 px-4 pb-4">
          <MobileCard className="min-h-full">
            <div className="p-4">
              {currentQuestionData && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">
                    {currentQuestionData.title}
                  </h2>
                  
                  <div className="space-y-2">
                    {currentQuestionData.options.map((option) => (
                      <MobileCard
                        key={option.value}
                        className={`cursor-pointer transition-all duration-200 ${
                          isOptionSelected(option.value)
                            ? 'border-2 border-primary bg-primary/5'
                            : 'border-2 border-transparent hover:border-primary/50'
                        }`}
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-foreground">
                              {option.label}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                            isOptionSelected(option.value)
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {isOptionSelected(option.value) && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </MobileCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </MobileCard>
        </div>

        {/* Navigation - Only show for multi-select questions */}
        {currentQuestionData?.type === 'multi-select' && (
          <div className="px-4 pb-4">
            <MobileButton 
              size="lg"
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Finding Your Programs...' : 
               currentQuestion === availableQuestions.length ? 'Get My Recommendations' : 'Next'}
            </MobileButton>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

