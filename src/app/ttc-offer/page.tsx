'use client';

import { TTCOfferScreen } from '@/components/screens/TTCOfferScreen';
import { useSearchParams } from 'next/navigation';

export default function TTCOfferPage() {
  const searchParams = useSearchParams();
  const timeline = searchParams.get('timeline') || undefined;

  return <TTCOfferScreen timeline={timeline} />;
}
