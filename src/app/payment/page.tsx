'use client';

import { PaymentFormScreen } from '@/components/screens/PaymentFormScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  const planType = (searchParams.get('plan') as 'trial' | 'monthly' | 'annual') || 'monthly';
  const email = searchParams.get('email') || '';

  return <PaymentFormScreen stage={stage} planType={planType} email={email} />;
}
