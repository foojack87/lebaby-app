import styles from '@/styles';
import UserButton from '../UserButton/UserButton';
const Hero = (props) => {
  return (
    <>
      <section className="sm:py-16 xs:py-8 py-12">
        <div className={`${styles.innerWidth} mx-auto`}>
          <div className="uppercase text-center flex flex-col gap-12">
            <h1 className={`${styles.heroHeading}`}>
              Track your babies daily activities.
            </h1>
            <div>
              <UserButton className="bg-[#a509ff] px-24 py-6 text-xl">
                Start Now
              </UserButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
