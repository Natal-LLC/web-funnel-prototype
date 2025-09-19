'use client';

import { PregnancyRecommendationScreen } from '@/components/screens/PregnancyRecommendationScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PregnancyRecommendationsContent() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs')?.split(',') || [];
  const trimester = searchParams.get('trimester') || undefined;
  const dueDate = searchParams.get('dueDate') || undefined;

  return <PregnancyRecommendationScreen programs={programs} trimester={trimester} dueDate={dueDate} />;
}

export default function PregnancyRecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PregnancyRecommendationsContent />
    </Suspense>
  );
}
