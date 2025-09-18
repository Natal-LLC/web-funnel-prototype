'use client';

import { PaymentConfirmationScreen } from '@/components/screens/PaymentConfirmationScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <PaymentConfirmationScreen stage={stage} />;
}
