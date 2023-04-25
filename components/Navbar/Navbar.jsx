import Image from 'next/image';
import AnchorLink from '../AnchorLink/AnchorLink';
import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = (props) => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <nav className="sm:px-16 px-6 py-6 relative">
        <div className="sm:w-[50%] absolute inset-0 gradient-01" />
        <div
          className={`2xl:max-w-[1280px] w-full mx-auto flex justify-between sm:gap-8 items-center`}
        >
          <div className="w-[168px] h-[48px] relative">
            <Image
              src="/lebaby-logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          {!user && (
            <AnchorLink
              href="/BabyProfile"
              className="h-[48px] sm:py-2 sm:px-6 py-1 px-3 flex-center z-[99]"
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
