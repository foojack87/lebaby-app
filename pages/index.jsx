import Hero from '@/components/Landing/Hero';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Summary from '@/components/Landing/Summary';
import FeatureRecord from '@/components/Landing/FeatureRecord';
import FeatureDailyTotals from '@/components/Landing/FeatureDailyTotals';

export default function Home({ babies, users }) {
  const { user } = useUser();
  const router = useRouter();

  console.log(users);

  useEffect(() => {
    if (user) {
      router.push('/BabyProfile');
    }
  });

  return (
    <div>
      <Hero />
      <Summary />
      <FeatureRecord />
      <FeatureDailyTotals />
    </div>
  );
}
