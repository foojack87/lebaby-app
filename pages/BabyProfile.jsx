import AnchorLink from '@/components/AnchorLink/AnchorLink';
import BabyInfo from '@/components/BabyInfo/BabyInfo';
import NoBaby from '@/components/NoBaby/NoBaby';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ImSpinner3 } from 'react-icons/im';

const BabyProfile = ({ users, userLoading }) => {
  console.log(users);

  // check if still fetching user data
  if (userLoading)
    return (
      <div className="w-[100%] h-[100%] flex justify-center text-6xl text-pink-500">
        <ImSpinner3 className="animate-spin" />
      </div>
    );

  // check to see if they created a baby yet
  if (!users.baby)
    return (
      <div className="w-[54rem] h-full ml-4">
        <NoBaby />
      </div>
    );

  return (
    <>
      <section className="w-[54rem] h-full ml-4">
        <BabyInfo users={users} />
      </section>
    </>
  );
};

export default BabyProfile;

export const getServerSideProps = withPageAuthRequired();
