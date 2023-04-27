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
        <div className="flex flex-col md:flex-row md:gap-24">
          <div className="relative flex-shrink-0 pt-8 order-2 md:order-1 md:pt-0 md:w-[16rem] md:self-center">
            <img
              src="/createbaby-mobile.png"
              alt="create baby welcome"
              className="w-full hidden md:block rounded-lg shadow-xl"
            />
            <img
              src="/babyinfo-mobile.png"
              alt="baby info"
              className="md:absolute md:left-10 md:top-12 w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="flex flex-col mt-6 md:mt-0 order-1 md:order-2">
            <p className="mt-2 font-normal text-2xl sm:text-3xl md:text-4xl text-gray-500">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ec4899] flex items-center gap-4">
                  <FiActivity className="text-pink-500 text-4xl md:text-5xl" />{' '}
                  Record Activity
                </h2>
                <p className="text-gray-700 mt-2">
                  Record and visualize baby activities.
                </p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ec4899] flex items-center gap-4">
                  <BsCalculator className="text-pink-500 text-4xl md:text-5xl" />
                  Daily Totals
                </h2>
                <p className="text-gray-700 mt-2">
                  Calculate and display daily totals.
                </p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ec4899] flex items-center gap-4">
                  <RxCalendar className="text-pink-500 text-4xl md:text-5xl" />
                  Calendar Activity
                </h2>
                <p className="text-gray-700 mt-2">
                  Calendar to find, search and display past baby activities.
                </p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ec4899] flex items-center gap-4">
                  <RiLineChartLine className="text-pink-500 text-4xl md:text-5xl" />
                  Growth Chart
                </h2>
                <p className="text-gray-700 mt-2">
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
