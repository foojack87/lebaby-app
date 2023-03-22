import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useUserData from '@/utils/useUserData';
import BabyForm from '@/components/BabyForm/BabyForm';

const CreateBaby = ({ setBaby, baby }) => {
  return (
    <div
    // style="background-image: linear-gradient(115deg, #9F7AEA, #FEE2FE)"
    >
      <div className="container mx-auto w-[54rem] h-full ml-4">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 py-16 px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl mb-4">Welcome!</h2>
            <p className="mb-4 text-center">
              Taking care of a newborn can be tough, and we are here to make it
              easier!
            </p>
          </div>
          <BabyForm baby={baby} setBaby={setBaby} />
        </div>
      </div>
    </div>
  );
};

export default CreateBaby;

export const getServerSideProps = withPageAuthRequired();
