'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFunnel } from './FunnelProvider';

export function QuizLanding() {
  const { state, goToStep, dispatch } = useFunnel();

  const stageLabel = state.userData.stage === 'pregnancy' ? 'pregnancy' : 'postpartum';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Let's Find Your Perfect {stageLabel.charAt(0).toUpperCase() + stageLabel.slice(1)} Program
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Answer a few questions to get personalized program recommendations
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
            <CardDescription>
              This quiz will take about 5-10 minutes and will help us understand your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left space-y-2">
              <p className="text-sm">• 15 personalized questions</p>
              <p className="text-sm">• Based on your current stage and goals</p>
              <p className="text-sm">• Get customized program recommendations</p>
              <p className="text-sm">• No personal information required</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => goToStep('quiz-flow')}
          >
            Start Quiz
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              dispatch({ type: 'SET_KNOWS_PROGRAM', knows: true });
              goToStep('program-selection');
            }}
          >
            Skip Quiz & Browse Programs
          </Button>
        </div>
      </div>
    </div>
  );
}
