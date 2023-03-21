import Hero from '@/components/Hero/Hero';
import { useUser } from '@auth0/nextjs-auth0/client';
import BabyProfile from './BabyProfile';

export default function Home(props) {
  const { user, error, isLoading } = useUser();
  return (
    <>
      {!user && <Hero />}
      {user && <BabyProfile />}
    </>
  );
}
