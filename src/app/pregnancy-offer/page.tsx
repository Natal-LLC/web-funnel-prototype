'use client';

import { PregnancyOfferScreen } from '@/components/screens/PregnancyOfferScreen';
import { useSearchParams } from 'next/navigation';

export default function PregnancyOfferPage() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs') || undefined;
  const trimester = searchParams.get('trimester') || undefined;

  return <PregnancyOfferScreen programs={programs} trimester={trimester} />;
}
