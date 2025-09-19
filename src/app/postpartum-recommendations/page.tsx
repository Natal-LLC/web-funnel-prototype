'use client';

import { PostpartumRecommendationScreen } from '@/components/screens/PostpartumRecommendationScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PostpartumRecommendationsContent() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs')?.split(',') || [];
  const deliveryDate = searchParams.get('deliveryDate') || undefined;

  return <PostpartumRecommendationScreen programs={programs} deliveryDate={deliveryDate} />;
}

export default function PostpartumRecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostpartumRecommendationsContent />
    </Suspense>
  );
}
