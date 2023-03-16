import styles from '@/styles';
import Image from 'next/image';
import UserButton from '../UserButton/UserButton';

const NavBar = (props) => {
  return (
    <>
      <nav className={`${styles.xPaddings} py-8 relative`}>
        <div className="w-[50%] absolute inset-0 gradient-01" />
        <div
          className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
        >
          <Image src="/lebaby-logo.png" alt="logo" width="168" height="48" />
          <UserButton
            type="submit"
            className="bg-[#a509ff] h-[48px] py-2 px-6 flex-center"
          >
            Login
          </UserButton>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
