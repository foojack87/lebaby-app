import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import BabyForm from '@/components/BabyForm/BabyForm';
import { useRouter } from 'next/router';

const CreateBaby = ({ users, userLoading }) => {
  const router = useRouter();
  if (userLoading) return <div>Loading...</div>;
  if (users.baby) {
    router.push('/BabyProfile');
  }

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 lg:py-16 pt-8 px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl mb-4 text-violet-500">Welcome!</h2>
            <p className="text-center hidden sm:block">
              Taking care of a newborn can be tough, and we are here to make it
              easier!
            </p>
          </div>
          <BabyForm users={users} />
        </div>
      </div>
    </div>
  );
};

export default CreateBaby;

export const getServerSideProps = withPageAuthRequired();
