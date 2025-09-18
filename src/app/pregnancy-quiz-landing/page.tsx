'use client';

import { QuizLandingScreen } from '@/components/screens/QuizLandingScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PregnancyQuizLandingContent() {
  const searchParams = useSearchParams();
  const dueDate = searchParams.get('dueDate') || '';
  const trimester = searchParams.get('trimester') || '';

  return (
    <QuizLandingScreen 
      stage="pregnancy" 
      dueDate={dueDate}
      trimester={trimester}
    />
  );
}

export default function PregnancyQuizLandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PregnancyQuizLandingContent />
    </Suspense>
  );
}
