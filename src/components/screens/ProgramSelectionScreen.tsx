'use client';

import { MobileLayout, MobileCard, MobileButton } from '@/components/ui/MobileLayout';
import { Stage, Program, PREGNANCY_PROGRAMS, POSTPARTUM_PROGRAMS } from '@/types';
import { useState } from 'react';

interface ProgramSelectionScreenProps {
  stage: Stage;
  trimester?: string;
  dueDate?: string;
  deliveryDate?: string;
}

export function ProgramSelectionScreen({ stage, trimester, dueDate, deliveryDate }: ProgramSelectionScreenProps) {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  // Enhanced pregnancy programs with descriptions
  const getPregnancyPrograms = () => {
    const programs = [
      {
        id: 'ea-1t',
        name: 'Expecting Athletes First Trimester',
        code: 'EA-1T',
        stage: 'pregnancy' as const,
        description: 'Safe exercises for early pregnancy, energy management, and nausea relief'
      },
      {
        id: 'ea-2t',
        name: 'Expecting Athletes Second Trimester',
        code: 'EA-2T',
        stage: 'pregnancy' as const,
        description: 'Strength building and core stability as your bump grows'
      },
      {
        id: 'ea-3t',
        name: 'Expecting Athletes Third Trimester',
        code: 'EA-3T',
        stage: 'pregnancy' as const,
        description: 'Preparation for labor and maintaining fitness in late pregnancy'
      },
      {
        id: 'beginner-bump',
        name: 'Beginner Bump',
        code: 'BB',
        stage: 'pregnancy' as const,
        description: 'Gentle introduction to pregnancy fitness for beginners'
      },
      {
        id: 'ab-prehab',
        name: 'Ab Prehab',
        code: 'AP',
        stage: 'pregnancy' as const,
        description: 'Core strengthening and diastasis recti prevention'
      },
      {
        id: 'labor-prep',
        name: 'Labor Prep',
        code: 'LP',
        stage: 'pregnancy' as const,
        description: 'Pelvic floor exercises and labor preparation techniques'
      }
    ];

    // Filter by trimester if provided - only show the relevant EA program for their trimester
    if (trimester && trimester !== 'pre-pregnancy') {
      const trimesterMap = {
        'first': ['ea-1t'],
        'second': ['ea-2t'],
        'third': ['ea-3t']
      };
      
      const relevantEAProgram = trimesterMap[trimester as keyof typeof trimesterMap] || [];
      // Only show the relevant EA program + the 3 other programs
      return programs.filter(p => 
        relevantEAProgram.includes(p.id) || 
        ['beginner-bump', 'ab-prehab', 'labor-prep'].includes(p.id)
      );
    }

    return programs;
  };

  const programs = stage === 'pregnancy' ? getPregnancyPrograms() : POSTPARTUM_PROGRAMS;

  const getStageContent = () => {
    switch (stage) {
      case 'pregnancy':
        const trimesterText = trimester && trimester !== 'pre-pregnancy' 
          ? ` for your ${trimester} trimester` 
          : '';
        return {
          emoji: '🤰',
          title: 'Select Your Programs',
          subtitle: `Choose one or more programs that match your needs${trimesterText}. You can select multiple programs.`,
          stageName: 'pregnancy'
        };
      case 'postpartum':
        return {
          emoji: '👶',
          title: 'Select Your Programs',
          subtitle: 'Choose one or more programs that match your recovery needs. You can select multiple programs.',
          stageName: 'postpartum'
        };
      default:
        return {
          emoji: '❓',
          title: 'Select Your Programs',
          subtitle: 'Choose one or more programs that match your needs. You can select multiple programs.',
          stageName: 'program'
        };
    }
  };

  const content = getStageContent();

  const toggleProgram = (programId: string) => {
    setSelectedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleContinue = () => {
    if (selectedPrograms.length > 0) {
      // Route to offer screen with selected programs and trimester info
      const programIds = selectedPrograms.join(',');
      const params = new URLSearchParams({
        stage,
        programs: programIds
      });
      
      if (trimester) params.append('trimester', trimester);
      
      window.location.href = `/choose-plan?${params.toString()}`;
    }
  };

  const handleIDontKnow = () => {
    // Route to quiz landing to help them choose
    if (stage === 'pregnancy') {
      window.location.href = `/pregnancy-quiz-landing?dueDate=${dueDate}&trimester=${trimester}`;
    } else if (stage === 'postpartum') {
      window.location.href = `/postpartum-quiz-landing?deliveryDate=${deliveryDate}`;
    }
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
        
        {/* Program List - Scrollable */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="space-y-2">
            {programs.map((program) => (
              <MobileCard 
                key={program.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPrograms.includes(program.id)
                    ? 'border-2 border-primary bg-primary/5'
                    : 'border-2 border-transparent hover:border-primary/50'
                }`}
                onClick={() => toggleProgram(program.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {program.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {program.code}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {(program as any).description || 'Comprehensive program for your needs'}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 mt-1 ${
                    selectedPrograms.includes(program.id)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedPrograms.includes(program.id) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </MobileCard>
            ))}
          </div>
        </div>

        {/* Not Sure Link - Only show when no programs selected */}
        {selectedPrograms.length === 0 && (
          <div className="px-4 pb-2 text-center">
            <button 
              onClick={handleIDontKnow}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              I'm not sure which programs I need
            </button>
          </div>
        )}

        {/* Continue Button - Only show if programs selected */}
        {selectedPrograms.length > 0 && (
          <div className="px-4 pb-4">
            <MobileButton 
              size="lg"
              onClick={handleContinue}
            >
              Enroll in {selectedPrograms.length} program{selectedPrograms.length > 1 ? 's' : ''}
            </MobileButton>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
