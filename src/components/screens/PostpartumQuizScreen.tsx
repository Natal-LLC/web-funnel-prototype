'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';

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
    // Question 2: Recovery Status
    {
      id: 2,
      title: 'Have you already completed a formal recovery protocol since your most recent birth?',
      type: 'single-select',
      options: [
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" },
        { value: 'yes', label: 'Yes' }
      ]
    },
    // Question 3: Program Style (only if recovered = yes)
    {
      id: 3,
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
    // Question 4: Nutrition
    {
      id: 4,
      title: 'Would you like additional guidance and support with your nutrition?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes, please!' },
        { value: 'no', label: 'No, thank you!' }
      ]
    },
    // Question 5: Meal Plan (only if nutrition = yes)
    {
      id: 5,
      title: 'What type of nutritional guidance do you prefer?',
      type: 'single-select',
      options: [
        { value: 'full-detailed', label: 'Full Detailed Meal Plans' },
        { value: 'grab-go', label: 'Easy Grab & Go Options' }
      ],
      condition: () => answers.nutrition === 'yes'
    },
    // Question 6: Diastasis
    {
      id: 6,
      title: 'Do you suffer from diastasis (i.e. ab separation)?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 7: Leaking
    {
      id: 7,
      title: 'Do you experience leaking?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 8: Pelvic Floor Strength
    {
      id: 8,
      title: 'How would you describe your pelvic floor strength?',
      type: 'single-select',
      options: [
        { value: 'too-weak', label: 'Too weak' },
        { value: 'just-right', label: 'Just right' },
        { value: 'too-strong', label: 'Too strong' }
      ]
    },
    // Question 9: Core Strength
    {
      id: 9,
      title: 'How would you describe your core strength?',
      type: 'single-select',
      options: [
        { value: 'good', label: 'Good' },
        { value: 'bad', label: 'Bad' }
      ]
    },
    // Question 10: Pain Areas
    {
      id: 10,
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
    // Question 11: Prolapse
    {
      id: 11,
      title: 'Do you suffer from prolapse?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'idk', label: "I don't know" }
      ]
    },
    // Question 12: Posture
    {
      id: 12,
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
    // Question 13: Pooch (only if C-section)
    {
      id: 13,
      title: 'Do you notice a shelf / pooch / pouch above your C-Section scar?',
      type: 'single-select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      condition: () => answers.deliveryType === 'c-section'
    },
    // Question 14: Coaching
    {
      id: 14,
      title: 'What kind of guidance do you prefer?',
      type: 'single-select',
      options: [
        { value: 'left-alone', label: 'I prefer to be left alone' },
        { value: 'expert-guidance', label: 'I prefer expert guidance' }
      ]
    },
    // Question 15: Motivation
    {
      id: 15,
      title: 'What motivation style works for you?',
      type: 'single-select',
      options: [
        { value: 'challenges-prizes', label: 'Challenges / Prizes / Community' },
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
      // Single select - update the appropriate field
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'recovered',
        3: 'programStyle',
        4: 'nutrition',
        5: 'mealPlan',
        6: 'diastasis',
        7: 'leaking',
        8: 'pelvicFloorStrength',
        9: 'coreStrength',
        11: 'prolapse',
        12: 'posture',
        13: 'pooch',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      if (field) {
        setAnswers(prev => ({ ...prev, [field]: optionValue as any }));
      }
    } else if (currentQuestionData?.type === 'multi-select') {
      // Multi select - toggle in array
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        10: 'painAreas'
      };
      
      const field = fieldMap[currentQuestionData.id];
      if (field) {
        const currentArray = (answers[field] as string[]) || [];
        const newArray = currentArray.includes(optionValue)
          ? currentArray.filter(item => item !== optionValue)
          : [...currentArray, optionValue];
        
        setAnswers(prev => ({ ...prev, [field]: newArray }));
      }
    }
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestionData) return false;
    
    if (currentQuestionData.type === 'single-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'recovered',
        3: 'programStyle',
        4: 'nutrition',
        5: 'mealPlan',
        6: 'diastasis',
        7: 'leaking',
        8: 'pelvicFloorStrength',
        9: 'coreStrength',
        11: 'prolapse',
        12: 'posture',
        13: 'pooch',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? !!answers[field] : false;
    } else if (currentQuestionData.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        10: 'painAreas'
      };
      
      const field = fieldMap[currentQuestionData.id];
      const array = field ? (answers[field] as string[]) || [] : [];
      return array.length > 0;
    }
    
    return false;
  };

  // Program mapping logic
  const getRecommendedPrograms = () => {
    const programs: string[] = [];

    // Main program mapping logic
    if (answers.recovered === 'no' || answers.recovered === 'idk') {
      // Maps to ABRX (Ab Recovery)
      programs.push('abrx');
    } else if (answers.recovered === 'yes') {
      // BS vs ABRX+ mapping
      if (answers.programStyle === 'quick-simple' || answers.programStyle === 'fun-follow') {
        programs.push('bs'); // Body Strong
      } else if (answers.programStyle === 'step-by-step' || answers.programStyle === 'extra-support') {
        programs.push('abrx-plus'); // Ab Recovery Plus
      }
    }

    // Prolapse mapping
    if (answers.prolapse === 'yes') {
      programs.push('prolapse');
    }

    // Nutrition mapping
    if (answers.nutrition === 'yes') {
      if (answers.mealPlan === 'full-detailed') {
        programs.push('slim-down');
      } else if (answers.mealPlan === 'grab-go') {
        programs.push('easy-eats');
      }
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

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Check if option is selected
  const isOptionSelected = (optionValue: string) => {
    if (currentQuestionData?.type === 'single-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'deliveryType',
        2: 'recovered',
        3: 'programStyle',
        4: 'nutrition',
        5: 'mealPlan',
        6: 'diastasis',
        7: 'leaking',
        8: 'pelvicFloorStrength',
        9: 'coreStrength',
        11: 'prolapse',
        12: 'posture',
        13: 'pooch',
        14: 'coaching',
        15: 'motivation',
        16: 'community',
        17: 'postureAssessment'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? answers[field] === optionValue : false;
    } else if (currentQuestionData?.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        10: 'painAreas'
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
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <MobileCard className="h-full">
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

        {/* Navigation */}
        <div className="px-4 pb-4 flex space-x-3">
          {currentQuestion > 1 && (
            <MobileButton 
              size="lg"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </MobileButton>
          )}
          
          <MobileButton 
            size="lg"
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered() || isLoading}
            className="flex-1"
          >
            {isLoading ? 'Finding Your Programs...' : 
             currentQuestion === availableQuestions.length ? 'Get My Recommendations' : 'Next'}
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
