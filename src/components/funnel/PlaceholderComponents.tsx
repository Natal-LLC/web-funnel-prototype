'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFunnel } from './FunnelProvider';

export function QuizFlow() {
  const { goToStep } = useFunnel();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Flow</CardTitle>
            <CardDescription>
              This is where the quiz questions would be implemented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The quiz system will be built out with 15 questions for each stage.
            </p>
            <Button onClick={() => goToStep('quiz-results')}>
              Complete Quiz (Placeholder)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function QuizResults() {
  const { goToStep } = useFunnel();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              Based on your answers, here are your recommended programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Program recommendations will be displayed here based on quiz answers.
            </p>
            <Button onClick={() => goToStep('paywall')}>
              Continue to Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Paywall() {
  const { goToStep } = useFunnel();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Your Subscription</CardTitle>
            <CardDescription>
              Select your billing plan to access your programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Subscription options and payment processing will be implemented here.
            </p>
            <Button onClick={() => goToStep('success')}>
              Subscribe (Placeholder)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SuccessPage() {
  const { resetFunnel } = useFunnel();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to Your Journey! 🎉</CardTitle>
            <CardDescription>
              Your subscription is confirmed and you're ready to begin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Deep linking to mobile app and onboarding will be implemented here.
            </p>
            <Button onClick={resetFunnel}>
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
