import AnchorLink from '@/components/AnchorLink/AnchorLink';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
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
  }, []);

  return (
    <>
      <section className="w-[54rem] h-full ml-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="sm:text-[1.2rem] md:text-[1.4rem] text-[0.8rem] text-center">
            No baby found, start now by pressing the button below!
          </p>
          <AnchorLink href="/CreateBaby" className="px-4 py-2">
            Create Profile
          </AnchorLink>
        </div>
      </section>
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
