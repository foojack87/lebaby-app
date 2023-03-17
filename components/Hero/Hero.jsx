import styles from '@/styles';
import AnchorLink from '../AnchorLink/AnchorLink';

const Hero = (props) => {
  return (
    <>
      <section className="sm:py-16 xs:py-8 py-12">
        <div className={`${styles.innerWidth} mx-auto`}>
          <div className="text-center flex flex-col gap-12">
            <h1 className={`${styles.heroHeading}`}>
              Track your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                babies{' '}
              </span>
              <div className="inline-block sm:mr-[24px] mr-[12px] -skew-x-12">
                <span className="bg-gradient-to-r from-pink-200 to-violet-200 px-[24px] rounded">
                  daily
                </span>{' '}
              </div>
              activities.
            </h1>
            <div>
              <AnchorLink
                href="/BabyProfile"
                className="bg-[#a509ff] px-24 py-6 text-xl"
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
