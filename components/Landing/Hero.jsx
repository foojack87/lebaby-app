import styles from '@/styles';
import AnchorLink from '../AnchorLink/AnchorLink';

const Hero = (props) => {
  return (
    <>
      <section className="flex-grow">
        <div className="2xl:max-w-[1280px] w-full mx-auto px-6">
          <div className="text-center flex flex-col gap-8 sm:gap-12">
            <h1 className={`${styles.heroHeading} text-4xl sm:text-6xl`}>
              Track your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                babies{' '}
              </span>
              <div className="inline-block sm:mr-[24px] mr-[12px] -skew-x-12">
                <span className="bg-gradient-to-r from-pink-200 to-violet-200 px-[16px] sm:px-[24px] rounded">
                  daily
                </span>{' '}
              </div>
              activities.
            </h1>
            <div>
              <AnchorLink
                href="/BabyProfile"
                className="bg-[#a509ff] sm:px-10 px-6 py-4 text-lg sm:text-xl w-[14rem] h-[4rem] mx-auto"
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

export default Hero;
