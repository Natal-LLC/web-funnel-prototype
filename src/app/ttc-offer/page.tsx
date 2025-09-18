'use client';

import { TTCOfferScreen } from '@/components/screens/TTCOfferScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TTCOfferContent() {
  const searchParams = useSearchParams();
  const timeline = searchParams.get('timeline') || undefined;

  return <TTCOfferScreen timeline={timeline} />;
}

export default function TTCOfferPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TTCOfferContent />
    </Suspense>
  );
}
