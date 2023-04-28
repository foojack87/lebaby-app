import styles from '@/styles';
import AnchorLink from '../AnchorLink/AnchorLink';

const CallToAction = (props) => {
  return (
    <>
      <section className="flex-grow lg:pt-36 sm:h-[48rem] h-[32rem] relative overflow-hidden sm:mb-[6rem]">
        <img
          src="/cta3.png"
          alt="create baby view"
          className="rounded-lg hidden sm:block absolute w-[28rem] shadow-xl left-[-6rem] top-[-6rem]"
        />
        <img
          src="/cta1.png"
          alt="create baby view"
          className="rounded-lg hidden sm:block  absolute w-[28rem] shadow-xl right-[-6rem] top-[-6rem]"
        />
        <img
          src="/cta2.png"
          alt="create baby view"
          className="rounded-lg hidden sm:block  absolute w-[28rem] shadow-xl left-[-6rem] bottom-[-8rem]"
        />
        <img
          src="/createbaby.png"
          alt="create baby view"
          className="rounded-lg hidden sm:block  absolute w-[28rem] shadow-xl right-[-6rem] bottom-[-8rem]"
        />
        <div className="mx-auto px-6 h-full flex justify-center items-center">
          <div className="text-center flex flex-col gap-8 sm:gap-12">
            <h1 className={`${styles.heroHeading} sm:text-6xl`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Free
              </span>{' '}
              to use{' '}
            </h1>
            <div>
              <AnchorLink
                href="/BabyProfile"
                className="bg-[#a509ff] sm:px-10 px-6 py-4 text-lg sm:text-xl"
              >
                Start Now
              </AnchorLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
