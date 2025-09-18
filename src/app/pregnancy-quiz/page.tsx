'use client';

import { PregnancyQuizScreen } from '@/components/screens/PregnancyQuizScreen';
import { Suspense } from 'react';

export default function PregnancyQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PregnancyQuizScreen />
    </Suspense>
  );
}