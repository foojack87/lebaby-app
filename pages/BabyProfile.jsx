import Sidebar from '@/components/Sidebar/Sidebar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import { useSetUser, useUser } from '../context/UserContext';

const BabyProfile = (props) => {
  const setUser = useSetUser();
  const user = useUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);
    })();
  }, [user.id, setUser]);

  const onClickHandler = (props) => {
    console.log(user);
  };

  return (
    <>
      <section>this is the baby profile</section>
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
