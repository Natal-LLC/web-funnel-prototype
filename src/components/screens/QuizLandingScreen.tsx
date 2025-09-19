'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

interface QuizLandingScreenProps {
  stage: 'pregnancy' | 'postpartum';
  dueDate?: string;
  deliveryDate?: string;
  trimester?: string;
}

export function QuizLandingScreen({ stage, dueDate, deliveryDate, trimester }: QuizLandingScreenProps) {
  const getStageContent = () => {
    if (stage === 'pregnancy') {
      return {
        emoji: '🤰',
        title: 'Find Your Program',
        subtitle: 'Personalized recommendations for your pregnancy',
        description: 'We\'ll ask about your fitness level, goals, and preferences to match you with the right pregnancy programs.',
        features: [
          'Takes less than 2 minutes',
          'Personalized program recommendations',
          'Based on your trimester and goals',
          'Safe, expert-designed workouts'
        ],
        buttonText: 'Start Quiz',
        quizUrl: `/pregnancy-quiz?dueDate=${dueDate}&trimester=${trimester}`
      };
    } else {
      return {
        emoji: '👶',
        title: 'Find Your Perfect Program',
        subtitle: 'Answer a few quick questions to get personalized recommendations',
        description: 'We\'ll ask about your recovery status, goals, and preferences to match you with the right postpartum programs.',
        features: [
          'Takes less than 2 minutes',
          'Personalized program recommendations',
          'Based on your recovery timeline and goals',
          'Safe, expert-designed recovery plans'
        ],
        buttonText: 'Get Started',
        quizUrl: `/postpartum-quiz?deliveryDate=${deliveryDate}`
      };
    }
  };

  const content = getStageContent();

  const handleStartQuiz = () => {
    window.location.href = content.quizUrl;
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">{content.emoji}</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        {/* Description Card */}
        <div className="px-4 pb-4">
          <MobileCard className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {content.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-2 text-left">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Start Quiz Button */}
        <div className="px-4 pb-6">
          <MobileButton 
            size="lg"
            onClick={handleStartQuiz}
            className="w-full"
          >
            {content.buttonText}
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
