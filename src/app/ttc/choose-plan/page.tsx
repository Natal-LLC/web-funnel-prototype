'use client';

import { PaywallScreen } from '@/components/screens/PaywallScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function ChoosePlanPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <PaywallScreen stage={stage} />;
}
