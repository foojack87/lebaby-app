import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser, useSetUser } from '@/context/UserContext';
import { useEffect } from 'react';

const BabyDailies = () => {
  const setUser = useSetUser();
  const user = useUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);
    })();
  }, []);

  return <>{user.nickname}</>;
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
