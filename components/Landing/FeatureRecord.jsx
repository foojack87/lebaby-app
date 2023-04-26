import styles from '@/styles';

const FeatureRecord = (props) => {
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
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureRecord;
