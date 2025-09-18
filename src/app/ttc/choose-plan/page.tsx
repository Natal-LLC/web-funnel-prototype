'use client';

import { PaywallScreen } from '@/components/screens/PaywallScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function ChoosePlanContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <PaywallScreen stage={stage} />;
}

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChoosePlanContent />
    </Suspense>
  );
}
