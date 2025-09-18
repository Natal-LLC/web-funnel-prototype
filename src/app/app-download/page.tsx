'use client';

import { AppDownloadScreen } from '@/components/screens/AppDownloadScreen';
import { useSearchParams } from 'next/navigation';
import { Stage } from '@/types';

export default function AppDownloadPage() {
  const searchParams = useSearchParams();
  const stage = (searchParams.get('stage') as Stage) || 'ttc';
  
  return <AppDownloadScreen stage={stage} />;
}
