'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage } from '@/types';

interface KnowProgramScreenProps {
  stage: Stage;
  trimester?: string;
  dueDate?: string;
}

export function KnowProgramScreen({ stage, trimester, dueDate }: KnowProgramScreenProps) {
  const getStageContent = () => {
    switch (stage) {
      case 'pregnancy':
        return {
          emoji: '🤰',
          title: 'Do you know which program you want to enroll in?',
          subtitle: 'We have several pregnancy programs designed for different needs and fitness levels.',
          yesButton: 'Yes, I know which program',
          noButton: 'No, help me choose'
        };
      case 'postpartum':
        return {
          emoji: '👶',
          title: 'Do you know which program you want to enroll in?',
          subtitle: 'We have several postpartum programs designed for different recovery needs and goals.',
          yesButton: 'Yes, I know which program',
          noButton: 'No, help me choose'
        };
      default:
        return {
          emoji: '❓',
          title: 'Do you know which program you want to enroll in?',
          subtitle: 'We have several programs designed for different needs and goals.',
          yesButton: 'Yes, I know which program',
          noButton: 'No, help me choose'
        };
    }
  };

  const content = getStageContent();

  const handleYes = () => {
    const params = new URLSearchParams({ stage });
    if (trimester) params.append('trimester', trimester);
    if (dueDate) params.append('dueDate', dueDate);
    window.location.href = `/program-selection?${params.toString()}`;
  };

  const handleNo = () => {
    window.location.href = `/${stage}-quiz`;
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header - Compact */}
        <div className="text-center px-4 pt-6 pb-4">
          <div className="text-4xl mb-3">{content.emoji}</div>
          <h1 className="text-xl font-bold text-foreground mb-2 leading-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        {/* Button Options - Compact */}
        <div className="flex-1 px-4 pb-4 flex flex-col justify-center">
          <div className="space-y-3">
            <MobileButton 
              size="lg"
              onClick={handleYes}
            >
              {content.yesButton}
            </MobileButton>
            
            <MobileButton 
              size="lg"
              variant="outline"
              onClick={handleNo}
            >
              {content.noButton}
            </MobileButton>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
