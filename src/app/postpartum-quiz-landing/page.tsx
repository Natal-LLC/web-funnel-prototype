'use client';

import { QuizLandingScreen } from '@/components/screens/QuizLandingScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PostpartumQuizLandingContent() {
  const searchParams = useSearchParams();
  const deliveryDate = searchParams.get('deliveryDate') || '';

  return (
    <QuizLandingScreen 
      stage="postpartum" 
      deliveryDate={deliveryDate}
    />
  );
}

export default function PostpartumQuizLandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostpartumQuizLandingContent />
    </Suspense>
  );
}
