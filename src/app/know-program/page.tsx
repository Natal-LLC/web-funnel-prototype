



'use client';

import { KnowProgramScreen } from '@/components/screens/KnowProgramScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function KnowProgramContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'pregnancy';
  const trimester = searchParams.get('trimester') || undefined;
  const dueDate = searchParams.get('dueDate') || undefined;
  
  return <KnowProgramScreen stage={stage} trimester={trimester} dueDate={dueDate} />;
}

export default function KnowProgramPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnowProgramContent />
    </Suspense>
  );
}
