'use client';

import { PostpartumOfferScreen } from '@/components/screens/PostpartumOfferScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PostpartumOfferContent() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs') || undefined;
  const deliveryDate = searchParams.get('deliveryDate') || undefined;

  return <PostpartumOfferScreen programs={programs} deliveryDate={deliveryDate} />;
}

export default function PostpartumOfferPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostpartumOfferContent />
    </Suspense>
  );
}
