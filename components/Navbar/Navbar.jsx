import styles from '@/styles';
import Image from 'next/image';
import AnchorLink from '../AnchorLink/AnchorLink';
import { useUser } from '@/context/UserContext';

const NavBar = (props) => {
  const user = useUser();

  return (
    <>
      <nav className={`${styles.xPaddings} py-8 relative`}>
        <div className="w-[50%] absolute inset-0 gradient-01" />
        <div
          className={`${styles.innerWidth} mx-auto flex justify-between gap-8 ${styles.flexCenter}`}
        >
          <Image src="/lebaby-logo.png" alt="logo" width="168" height="48" />
          <AnchorLink
            href={user ? '/api/auth/logout' : '/BabyProfile'}
            className="h-[48px] py-2 px-6 flex-center"
          >
            {user ? 'logout' : 'login'}
          </AnchorLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
