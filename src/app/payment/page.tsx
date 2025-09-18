'use client';

import { PaymentFormScreen } from '@/components/screens/PaymentFormScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function PaymentContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  const planType = (searchParams.get('plan') as 'trial' | 'monthly' | 'quarterly' | 'annual') || 'monthly';
  const email = searchParams.get('email') || '';

  return <PaymentFormScreen stage={stage} planType={planType} email={email} />;
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
