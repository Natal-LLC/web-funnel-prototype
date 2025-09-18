'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface QuizAnswers {
  // Question Set #1 - Starting Point
  birthType?: 'vaginal' | 'c-section';
  laborPrep?: 'interested' | 'not-interested';
  birthRecovery?: 'interested' | 'not-interested';
  activityLevel?: 'just-started' | 'moving-little' | 'fairly-active' | 'very-active' | 'training-strong';
  
  // Question Set #2 - Goals & Preferences
  goals?: string[];
  pacing?: 'gentle' | 'consistent' | 'all-in';
  workoutTypes?: string[];
  
  // Question Set #4 - Motivations
  coaching?: 'private' | 'group' | 'alone';
  motivation?: string[];
  community?: 'yes' | 'no';
}

export function PregnancyQuizScreen() {
  const searchParams = useSearchParams();
  const dueDate = searchParams.get('dueDate') || '';
  const trimester = searchParams.get('trimester') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  // Question definitions
  const questions = [
    // Question 1: Birth Type
    {
      id: 1,
      title: 'What type of birth are you planning for?',
      type: 'single-select',
      options: [
        { value: 'vaginal', label: 'Vaginal' },
        { value: 'c-section', label: 'C-Section' }
      ]
    },
    // Question 2: Labor Prep (only if vaginal)
    {
      id: 2,
      title: 'I am interested in preparing for labor...',
      type: 'single-select',
      options: [
        { value: 'interested', label: 'I am interested in preparing for labor' },
        { value: 'not-interested', label: 'I am not interested in preparing for labor' }
      ],
      condition: () => answers.birthType === 'vaginal'
    },
    // Question 3: Birth Recovery
    {
      id: 3,
      title: 'I am interested in recovering from birth...',
      type: 'single-select',
      options: [
        { value: 'interested', label: 'I am interested in recovering from birth' },
        { value: 'not-interested', label: 'I am NOT interested in recovering from birth' }
      ]
    },
    // Question 4: Activity Level
    {
      id: 4,
      title: 'How actively are you working out currently?',
      type: 'single-select',
      options: [
        { value: 'just-started', label: 'Just getting started' },
        { value: 'moving-little', label: 'Moving a little' },
        { value: 'fairly-active', label: 'Staying fairly active' },
        { value: 'very-active', label: 'Very Active' },
        { value: 'training-strong', label: 'Training Strong' }
      ]
    },
    // Question 5: Goals
    {
      id: 5,
      title: 'What feels most important during your pregnancy?',
      type: 'multi-select',
      options: [
        { value: 'Strength', label: 'Strength' },
        { value: 'Energy', label: 'Energy' },
        { value: 'Core', label: 'Core' },
        { value: 'Pelvic Floor', label: 'Pelvic Floor' }
      ]
    },
    // Question 6: Pacing
    {
      id: 6,
      title: 'What kind of pace feels most realistic for your life right now?',
      type: 'single-select',
      options: [
        { value: 'gentle', label: 'Gentle + flexible' },
        { value: 'consistent', label: 'Consistent and steady' },
        { value: 'all-in', label: 'All-in and ready to go' }
      ]
    },
    // Question 7: Workout Types
    {
      id: 7,
      title: 'What type of workouts do you prefer?',
      type: 'multi-select',
      options: [
        { value: 'Yoga', label: 'Yoga' },
        { value: 'Pilates', label: 'Pilates' },
        { value: 'Bodyweight', label: 'Bodyweight' },
        { value: 'Strength', label: 'Strength' },
        { value: 'Cardio', label: 'Cardio' },
        { value: 'None of the Above', label: 'None of the Above' }
      ]
    },
    // Question 8: Coaching
    {
      id: 8,
      title: 'What kind of coaching do you prefer?',
      type: 'single-select',
      options: [
        { value: 'private', label: 'Private Coaching (i.e. Chat)' },
        { value: 'group', label: 'Group Coaching (i.e. Community)' },
        { value: 'alone', label: 'Prefer to be left alone' }
      ]
    },
    // Question 9: Motivation
    {
      id: 9,
      title: 'What keeps you motivated?',
      type: 'multi-select',
      options: [
        { value: 'Community', label: 'Community' },
        { value: 'Prize Money', label: 'Prize Money' },
        { value: 'Rewards', label: 'Rewards' },
        { value: 'Recognition', label: 'Recognition' },
        { value: 'None of the Above', label: 'None of the Above' }
      ]
    },
    // Question 10: Community
    {
      id: 10,
      title: 'Do you value a supportive community?',
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
        1: 'birthType',
        2: 'laborPrep',
        3: 'birthRecovery',
        4: 'activityLevel',
        6: 'pacing',
        8: 'coaching',
        10: 'community'
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
              stage: 'pregnancy',
              programs: recommendedPrograms.join(','),
              source: 'quiz'
            });

            if (trimester) {
              params.append('trimester', trimester);
            }

            window.location.href = `/pregnancy-offer?${params.toString()}`;
          }
        }, 300);
      }
    } else if (currentQuestionData?.type === 'multi-select') {
      // Multi select - handle "none of the above" logic
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        5: 'goals',
        7: 'workoutTypes',
        9: 'motivation'
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
        1: 'birthType',
        2: 'laborPrep',
        3: 'birthRecovery',
        4: 'activityLevel',
        6: 'pacing',
        8: 'coaching',
        10: 'community'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? !!answers[field] : false;
    } else if (currentQuestionData.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        5: 'goals',
        7: 'workoutTypes',
        9: 'motivation'
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

    // BB vs EA mapping based on activity level
    if (['just-started', 'moving-little'].includes(answers.activityLevel || '')) {
      programs.push('beginner-bump');
    } else if (['fairly-active', 'very-active', 'training-strong'].includes(answers.activityLevel || '')) {
      // Map to appropriate EA trimester based on due date from URL params
      if (trimester) {
        const trimesterMap = {
          'first': 'ea-1t',
          'second': 'ea-2t', 
          'third': 'ea-3t'
        };
        const program = trimesterMap[trimester as keyof typeof trimesterMap];
        if (program) programs.push(program);
      }
    }

    // Labor Prep mapper
    if (answers.birthType === 'vaginal' && answers.laborPrep === 'interested') {
      programs.push('labor-prep');
    }

    // Ab Prehab mapper
    if (answers.birthRecovery === 'interested') {
      programs.push('ab-prehab');
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
        stage: 'pregnancy',
        programs: recommendedPrograms.join(','),
        source: 'quiz'
      });

      // Add trimester from URL params
      if (trimester) {
        params.append('trimester', trimester);
      }

      setIsLoading(true);
      window.location.href = `/pregnancy-offer?${params.toString()}`;
    }
  };


  // Check if option is selected
  const isOptionSelected = (optionValue: string) => {
    if (currentQuestionData?.type === 'single-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        1: 'birthType',
        2: 'laborPrep',
        3: 'birthRecovery',
        4: 'activityLevel',
        6: 'pacing',
        8: 'coaching',
        10: 'community'
      };
      
      const field = fieldMap[currentQuestionData.id];
      return field ? answers[field] === optionValue : false;
    } else if (currentQuestionData?.type === 'multi-select') {
      const fieldMap: { [key: number]: keyof QuizAnswers } = {
        5: 'goals',
        7: 'workoutTypes',
        9: 'motivation'
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
          <div className="text-4xl mb-3">🤰</div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Pregnancy Quiz
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s find the perfect programs for you
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
