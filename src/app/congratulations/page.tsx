'use client';

import { TTCCongratulationsScreen } from '@/components/screens/TTCCongratulationsScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function CongratulationsContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <TTCCongratulationsScreen stage={stage} />;
}

export default function CongratulationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratulationsContent />
    </Suspense>
  );
}
