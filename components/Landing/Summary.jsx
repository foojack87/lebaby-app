import styles from '@/styles';
import { RxCalendar } from 'react-icons/rx';
import { RiLineChartLine } from 'react-icons/ri';
import { FiActivity } from 'react-icons/fi';
import { BsCalculator } from 'react-icons/bs';

const Summary = (props) => {
  return (
    <>
      <section className={`${styles.paddings} relative z-10`}>
        <div className="gradient-02 z-0" />
        <div className="flex gap-24">
          <div className="flex relative basis-1/2 w-[100%]">
            <img
              src="/createbaby-mobile.png"
              alt="create baby welcome"
              className="absolute w-[16rem] rounded-lg"
            />
            <img
              src="/babyinfo-mobile.png"
              alt="create baby welcome"
              className="absolute left-[10rem] top-[12rem] w-[16rem] rounded-lg"
            />
          </div>
          <div className="flex flex-col basis-1/2">
            <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-gray-500">
              <span className="font-extrabold text-violet-500">Lebaby</span> is
              a web application that provides users with an assistance tool to
              <span className="font-extrabold text-violet-500">
                {' '}
                easily input, track, and find
              </span>{' '}
              your babies activities.
            </p>
            <div className="flex flex-col mt-6 gap-6">
              <div>
                <h2 className="sm:text-[1.5rem] font-bold text-[#ec4899] flex items-center gap-4">
                  <FiActivity className="text-pink-500 text-4xl" /> Record
                  Activity
                </h2>
                <p className="text-gray-700">
                  Record and visualize baby activities.
                </p>
              </div>
              <div>
                <h2 className="sm:text-[1.5rem] font-bold text-[#ec4899] flex items-center gap-4">
                  <BsCalculator className="text-pink-500 text-4xl" />
                  Daily Totals
                </h2>
                <p className="text-gray-700">
                  Calculate and display daily totals.
                </p>
              </div>
              <div>
                <h2 className="sm:text-[1.5rem] font-bold text-[#ec4899] flex items-center gap-4">
                  <RxCalendar className="text-pink-500 text-4xl" />
                  Calender Activity
                </h2>
                <p className="text-gray-700">
                  Calendar to find, search and display past baby activities.
                </p>
              </div>
              <div>
                <h2 className="sm:text-[1.5rem] font-bold text-[#ec4899] flex items-center gap-4">
                  <RiLineChartLine className="text-pink-500 text-4xl" />
                  Growth Chart
                </h2>
                <p className="text-gray-700">
                  Record weight, height and head circumfrence growth with a
                  chart and percentile calculator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Summary;
