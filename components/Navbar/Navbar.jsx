import styles from '@/styles';
import Image from 'next/image';
import AnchorLink from '../AnchorLink/AnchorLink';
import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = (props) => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <nav className={`${styles.xPaddings} py-6 relative`}>
        <div className="w-[50%] absolute inset-0 gradient-01" />
        <div
          className={`${styles.innerWidth} mx-auto flex justify-between gap-8 ${styles.flexCenter}`}
        >
          <Image
            src="/lebaby-logo.png"
            alt="logo"
            width="168"
            height="48"
            className="sm:w-[168px] w-[128px]"
          />
          {!user && (
            <AnchorLink
              href="/BabyProfile"
              className="h-[48px] sm:py-2 sm:px-6 py-1 px-3 flex-center"
            >
              login
            </AnchorLink>
          )}
          {isLoading && <div>Logging in....</div>}
          {error && <div>Try again.</div>}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
