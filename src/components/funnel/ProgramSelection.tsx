'use client';

import { MobileLayout, MobileCard, MobileButton } from './MobileLayout';
import { useFunnel } from './FunnelProvider';
import { PREGNANCY_PROGRAMS, POSTPARTUM_PROGRAMS } from '@/types';

export function ProgramSelection() {
  const { state, updateUserData, goToStep, dispatch } = useFunnel();

  const programs = state.userData.stage === 'pregnancy' ? PREGNANCY_PROGRAMS : POSTPARTUM_PROGRAMS;
  const stageLabel = state.userData.stage === 'pregnancy' ? 'Pregnancy' : 'Postpartum';

  const handleProgramSelection = (programId: string) => {
    const currentPrograms = state.userData.selectedPrograms;
    const newPrograms = currentPrograms.includes(programId)
      ? currentPrograms.filter(id => id !== programId)
      : [...currentPrograms, programId];
    
    updateUserData({ selectedPrograms: newPrograms });
  };

  const handleContinue = () => {
    // This would route to the next step (paywall, auth, etc.)
    console.log('Selected programs:', state.userData.selectedPrograms);
    goToStep('paywall'); // Placeholder for now
  };

  const handleDontKnow = () => {
    // Route to quiz
    goToStep('quiz-landing');
  };

  const handleBack = () => {
    dispatch({ type: 'SET_KNOWS_PROGRAM', knows: false });
    goToStep('program-knowledge');
  };

  return (
    <MobileLayout>
      <div className="text-center">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Choose Your {stageLabel} Programs
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Select all programs that interest you
          </p>
        </div>
        
        {/* Program Cards */}
        <div className="space-y-4 mb-6">
          {programs.map((program) => (
            <MobileCard 
              key={program.id}
              className={`cursor-pointer transition-all ${
                state.userData.selectedPrograms.includes(program.id)
                  ? 'ring-2 ring-primary shadow-lg bg-primary/5'
                  : 'hover:shadow-lg border-2 border-transparent hover:border-primary'
              }`}
              onClick={() => handleProgramSelection(program.id)}
            >
              <div className="text-center">
                {/* Selection Indicator */}
                <div className="flex justify-end mb-2">
                  {state.userData.selectedPrograms.includes(program.id) && (
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  )}
                </div>
                
                {/* Program Info */}
                <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {program.description}
                </p>
                
                {/* Price and Duration */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-primary">{program.price}</div>
                  <div className="text-sm text-muted-foreground">{program.duration}</div>
                </div>
                
                {/* Features */}
                <div className="space-y-2 text-left">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </MobileCard>
          ))}
        </div>

        {/* I Don't Know Option */}
        <MobileCard className="mb-6 border-2 border-dashed border-muted-foreground/50">
          <div className="text-center">
            <div className="text-4xl mb-3">🤔</div>
            <h3 className="text-lg font-semibold mb-2">I'm Not Sure</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Take our quiz to get personalized program recommendations
            </p>
            <MobileButton 
              size="lg"
              variant="outline"
              onClick={handleDontKnow}
            >
              Take Quiz Instead
            </MobileButton>
          </div>
        </MobileCard>

        {/* Action Buttons */}
        <div className="space-y-3">
          <MobileButton 
            size="xl"
            disabled={state.userData.selectedPrograms.length === 0}
            onClick={handleContinue}
          >
            Continue with {state.userData.selectedPrograms.length} Program{state.userData.selectedPrograms.length !== 1 ? 's' : ''}
          </MobileButton>
          
          <MobileButton 
            variant="outline" 
            size="lg"
            onClick={handleBack}
          >
            ← Back
          </MobileButton>
        </div>
      </div>
    </MobileLayout>
  );
}
