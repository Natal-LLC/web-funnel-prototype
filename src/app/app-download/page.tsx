'use client';

import { AppDownloadScreen } from '@/components/screens/AppDownloadScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';
import { Suspense } from 'react';

function AppDownloadContent() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <AppDownloadScreen stage={stage} />;
}

export default function AppDownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppDownloadContent />
    </Suspense>
  );
}
