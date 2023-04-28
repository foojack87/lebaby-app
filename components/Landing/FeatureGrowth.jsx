import styles from '@/styles';
import { TbMoodBoy } from 'react-icons/tb';
import { TfiRuler } from 'react-icons/tfi';
import { GiWeightScale } from 'react-icons/gi';

const FeatureGrowth = (props) => {
  return (
    <>
      <section
        className={`${styles.paddings} relative z-10 sm:pt-36 lg:pb-[12rem]`}
      >
        <div className="flex flex-col sm:flex-row gap-12 ">
          <div className="basis-1/2 relative order-2 sm:order-1">
            <img
              src="/growth-mobile.png"
              alt="growth tracker"
              className="rounded-lg w-[16rem] mx-auto lg:mx-0 shadow-xl"
            />
            <img
              src="/growth.png"
              alt="growth tracker"
              className="rounded-lg w-[18rem] hidden lg:block lg:absolute bottom-[-6rem] right-[-1rem] mx-auto shadow-xl"
            />
          </div>
          <div className="flex flex-col justify-center basis-1/2 order-1 sm:order-2">
            <h2 className="bg-gradient-to-r from-pink-500 to-violet-500 px-[16px] text-center -skew-x-12">
              <span className="sm:text-[1.5rem] font-bold text-white flex flex-col items-center gap-4">
                Growth Tracker
              </span>
            </h2>
            <div className="mt-6">
              <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-gray-500">
                A growth tracker that will record your babies growth on a chart
                and calculate their percentiles.
              </p>
              <div className="mt-6 flex flex-col gap-2 w-full text-violet-700 font-extrabold">
                <p className="bg-pink-200 px-6 py-1.5 flex items-center gap-4">
                  <GiWeightScale className="sm:text-2xl" /> Weight Measurements
                </p>
                <p className="bg-pink-200 px-6 py-1.5 flex items-center gap-4">
                  <TfiRuler className="sm:text-2xl" />
                  Height Measurements
                </p>
                <p className="bg-pink-200 px-6 py-1.5 flex items-center gap-4">
                  <TbMoodBoy className="sm:text-2xl" /> Head Circumfrence
                  Measurements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureGrowth;
