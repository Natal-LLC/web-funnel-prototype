import { PostpartumQuizScreen } from '@/components/screens/PostpartumQuizScreen';
import { Suspense } from 'react';

function PostpartumQuizContent() {
  return <PostpartumQuizScreen />;
}

export default function PostpartumQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostpartumQuizContent />
    </Suspense>
  );
}