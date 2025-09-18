'use client';

import { ProgramSelectionScreen } from '@/components/screens/ProgramSelectionScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function ProgramSelectionPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'pregnancy';
  const trimester = searchParams.get('trimester') || undefined;
  
  return <ProgramSelectionScreen stage={stage} trimester={trimester} />;
}
