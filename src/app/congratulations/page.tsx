'use client';

import { TTCCongratulationsScreen } from '@/components/screens/TTCCongratulationsScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function CongratulationsPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <TTCCongratulationsScreen stage={stage} />;
}
