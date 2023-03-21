import { useEffect } from 'react';
import { useUser, useSetUser } from '@/context/UserContext';

const GrowthChart = () => {
  const setUser = useSetUser();
  const user = useUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);
    })();
  }, []);

  return <>This is the GrowthChart page.</>;
};

export default GrowthChart;
