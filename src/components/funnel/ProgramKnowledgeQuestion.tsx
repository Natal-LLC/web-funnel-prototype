'use client';

import { MobileLayout, MobileButton } from './MobileLayout';
import { useFunnel } from './FunnelProvider';

export function ProgramKnowledgeQuestion() {
  const { state, goToStep, dispatch, resetFunnel } = useFunnel();

  const handleProgramKnowledge = (knowsProgram: boolean) => {
    dispatch({ type: 'SET_KNOWS_PROGRAM', knows: knowsProgram });
    
    if (knowsProgram) {
      goToStep('program-selection');
    } else {
      goToStep('quiz-landing');
    }
  };

  const stageLabel = state.userData.stage === 'pregnancy' ? 'pregnancy' : 'postpartum';

  return (
    <MobileLayout>
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Do you know which program you want to take?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We have several {stageLabel} programs to choose from
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <MobileButton 
            size="xl"
            onClick={() => handleProgramKnowledge(true)}
          >
            Yes, I know what I want
          </MobileButton>
          <MobileButton 
            size="xl"
            variant="outline"
            onClick={() => handleProgramKnowledge(false)}
          >
            No, help me choose
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
