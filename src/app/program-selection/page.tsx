'use client';

import { ProgramSelectionScreen } from '@/components/screens/ProgramSelectionScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function ProgramSelectionContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'pregnancy';
  const trimester = searchParams.get('trimester') || undefined;
  
  return <ProgramSelectionScreen stage={stage} trimester={trimester} />;
}

export default function ProgramSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramSelectionContent />
    </Suspense>
  );
}
