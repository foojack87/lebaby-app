import AnchorLink from '@/components/AnchorLink/AnchorLink';
import BabyInfo from '@/components/BabyInfo/BabyInfo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const BabyProfile = ({ users, userLoading }) => {
  console.log(users);

  if (userLoading) return <div>loading...</div>;

  // Refactor nested ternary operator

  return (
    <>
      <section className="w-[54rem] h-full ml-4">
        {users && users.baby ? (
          <BabyInfo users={users} />
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
