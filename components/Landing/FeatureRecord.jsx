import styles from '@/styles';
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from 'react-icons/tb';

const FeatureRecord = (props) => {
  return (
    <>
      <section className={`${styles.paddings} relative z-10 sm:mt-16 mx-auto`}>
        <div className="gradient-06 z-0" />
        <div className="flex flex-col sm:flex-row gap-12 ">
          <div className="flex flex-col basis-1/2 justify-center">
            <h2 className="bg-gradient-to-r from-pink-200 to-violet-200 px-[16px] text-center lg:text-left -skew-x-12">
              <span className="sm:text-[1.5rem] text-2xl font-bold text-violet-500 flex flex-col items-center gap-4">
                Record Activity
              </span>
            </h2>
            <div className="mt-6 bg-white bg-opacity-55 shadow-md -skew-x-12 rounded p-6">
              <ul className="mt-[8px] font-normal sm:text-[18px] lg:text-[24px] text-[16px] text-gray-500 flex skew-x-12 flex-col gap-4">
                <li className="flex items-center ml-9 gap-2">
                  <TbCircleNumber1 className="text-4xl text-violet-500 opacity-80 w-[4rem]" />
                  <span className="font-bold">Select an activity</span>
                </li>
                <li className="flex items-center ml-5 gap-2">
                  <TbCircleNumber2 className="text-4xl text-violet-500 opacity-80 w-[4rem]" />
                  <span className="font-bold">Input activity details</span>
                </li>
                <li className="flex items-center gap-2">
                  <TbCircleNumber3 className="text-4xl text-violet-500 opacity-80 w-[4rem]" />
                  <span className="font-bold">Visualize on a scheduler</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-1/2 relative mx-auto flex flex-col sm:flex-row gap-8">
            {/* <img
              src="/activity.png"
              alt="record activity"
              className="rounded-lg hidden sm:block sm:absolute top-[8rem] left-[2rem] shadow-xl mb-6 sm:mb-0"
            /> */}
            <img
              src="/activity-mobile.png"
              alt="record activity mobile view"
              className="rounded-lg sm:w-[10rem] sm:inline shadow-xl mx-auto object-contain"
            />
            <img
              src="/activityday-mobile.png"
              alt="record activity mobile view"
              className="rounded-lg sm:w-[10rem] sm:inline sm:hidden md:block shadow-xl mx-auto object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureRecord;
