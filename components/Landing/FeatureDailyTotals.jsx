import styles from '@/styles';
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from 'react-icons/tb';

const FeatureDailyTotals = (props) => {
  return (
    <>
      <section className={`${styles.paddings} relative z-10 sm:mt-8`}>
        <div className="flex flex-col sm:flex-row gap-12 ">
          <div className="basis-1/2 relative order-2 sm:order-1">
            <img
              src="/totals-mobile.png"
              alt="record activity"
              className="rounded-lg w-[16rem] mx-auto shadow-xl"
            />
          </div>
          <div className="flex flex-col justify-center basis-1/2 order-1 sm:order-2">
            <h2 className="bg-gradient-to-r from-pink-200 to-violet-200 px-[16px] text-center -skew-x-12">
              <span className="sm:text-[1.5rem] font-bold text-violet-500 flex flex-col items-center gap-4">
                Daily Totals Tracker
              </span>
            </h2>
            <div className="mt-6">
              <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-gray-500">
                <span className="font-extrabold text-violet-500">Lebaby </span>
                calculates and displays the total values of your babies daily
                activity for{' '}
                <span className="font-extrabold text-violet-500">
                  easy{' '}
                </span>{' '}
                tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureDailyTotals;
