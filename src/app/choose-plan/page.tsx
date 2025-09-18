'use client';

import { PaywallScreen } from '@/components/screens/PaywallScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function ChoosePlanContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  const email = searchParams.get('email') || undefined;
  
  return <PaywallScreen stage={stage} email={email} />;
}

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChoosePlanContent />
    </Suspense>
  );
}
