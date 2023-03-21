import { useUser, useSetUser } from '@/context/UserContext';
import { useEffect } from 'react';

const BabyActivity = () => {
  const setUser = useSetUser();
  const user = useUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);
    })();
  }, []);

  return <>This is the babyactivity page.</>;
};

export default BabyActivity;
