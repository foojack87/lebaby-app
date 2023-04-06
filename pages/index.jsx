import Hero from '@/components/Hero/Hero';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home({ babies, users }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/BabyProfile');
    }
  });

  return (
    <>
      <Hero />
    </>
  );
}
