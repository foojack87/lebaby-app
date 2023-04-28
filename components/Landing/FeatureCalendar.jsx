import styles from '@/styles';

const FeatureCalendar = (props) => {
  return (
    <>
      <section className={`${styles.paddings} relative z-10 sm:mt-8`}>
        <div className="flex flex-col sm:flex-row gap-12">
          <div className="gradient-03 z-0" />
          <div className="flex flex-col justify-center basis-1/2 order-1 sm:order-1">
            <h2 className="bg-gradient-to-r from-pink-500 to-violet-500 px-[16px] text-center -skew-x-12">
              <span className="sm:text-[1.5rem] font-bold text-white flex flex-col items-center gap-4">
                Calendar Activity
              </span>
            </h2>
            <div className="mt-6">
              <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-gray-500">
                <span className="font-extrabold text-violet-500">
                  Easily find
                </span>{' '}
                and lookup your babies detailed past activities through a
                calendar UI.
              </p>
            </div>
          </div>
          <div className="basis-1/2 relative order-2 sm:order-2">
            <img
              src="/totals.png"
              alt="calendar view"
              className="rounded-lg hidden md:block md:absolute bottom-[-4rem] left-[-8rem] z-10 w-[24rem] shadow-xl"
            />
            <img
              src="/calendarmobile.png"
              alt="mobile calendar view"
              className="rounded-lg mx-auto shadow-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureCalendar;
