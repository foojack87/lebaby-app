import AnchorLink from '@/components/AnchorLink/AnchorLink';
import BabyInfo from '@/components/BabyInfo/BabyInfo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import useUserData from '@/utils/useUserData';
import useBabyData from '@/utils/useBabyData';

const BabyProfile = () => {
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(`/api/user/`, fetcher);
  // console.log(data);

  // const { user, isLoading } = useUserData();
  // console.log(user);

  const { baby, isLoading } = useBabyData();
  console.log(baby);

  // const user = useUser();

  // useEffect(() => {
  //   (async () => {
  //     const getUser = await fetch('/api/user');
  //     const getUserJson = await getUser.json();
  //     setUser(getUserJson);
  //   })();
  // }, []);

  // console.log(user);

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <section className="w-[54rem] h-full ml-4">
        {baby ? (
          <BabyInfo userBaby={baby} />
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="sm:text-[1.2rem] md:text-[1.4rem] text-[0.8rem] text-center">
              No baby found, start now by pressing the button below!
            </p>
            <AnchorLink href="/CreateBaby" className="px-4 py-2">
              Create Profile
            </AnchorLink>
          </div>
        )}
      </section>
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
