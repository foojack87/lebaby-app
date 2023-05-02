import BabyInfo from '@/components/BabyInfo/BabyInfo';
import NoBaby from '@/components/NoBaby/NoBaby';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ImSpinner3 } from 'react-icons/im';

const BabyProfile = ({ users, userLoading }) => {
  // check if still fetching user data
  if (userLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <ImSpinner3 className="animate-spin text-6xl text-pink-500" />
      </div>
    );

  // check to see if they created a baby yet
  if (!users.baby)
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[54rem]">
          <NoBaby />
        </div>
      </div>
    );

  return (
    <>
      <section className="w-full flex justify-center items-center">
        <div className="w-full sm:w-[32rem] px-6 flex">
          <BabyInfo users={users} />
        </div>
      </section>
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
