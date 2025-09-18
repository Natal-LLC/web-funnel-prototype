'use client';

import { PregnancyOfferScreen } from '@/components/screens/PregnancyOfferScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PregnancyOfferContent() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs') || undefined;
  const trimester = searchParams.get('trimester') || undefined;

  return <PregnancyOfferScreen programs={programs} trimester={trimester} />;
}

export default function PregnancyOfferPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PregnancyOfferContent />
    </Suspense>
  );
}
