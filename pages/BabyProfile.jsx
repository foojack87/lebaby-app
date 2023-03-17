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
      <div>THIS THE IS BABYPROFILE PAGE AFTER LOGGING IN.</div>
      <div onClick={onClickHandler}>user data</div>
      {!user ? <div>not logged in.</div> : <div>logged in</div>}
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
