'use client';

import { PostpartumOfferScreen } from '@/components/screens/PostpartumOfferScreen';
import { useSearchParams } from 'next/navigation';

export default function PostpartumOfferPage() {
  const searchParams = useSearchParams();
  const programs = searchParams.get('programs') || undefined;
  const deliveryDate = searchParams.get('deliveryDate') || undefined;

  return <PostpartumOfferScreen programs={programs} deliveryDate={deliveryDate} />;
}
