



'use client';

import { KnowProgramScreen } from '@/components/screens/KnowProgramScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function KnowProgramPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'pregnancy';
  const trimester = searchParams.get('trimester') || undefined;
  const dueDate = searchParams.get('dueDate') || undefined;
  
  return <KnowProgramScreen stage={stage} trimester={trimester} dueDate={dueDate} />;
}
