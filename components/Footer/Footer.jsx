import styles from '@/styles';
import Image from 'next/image';

const Footer = (props) => {
  return (
    <>
      <footer className={`${styles.xPaddings} py-8 relative`}>
        <div className="footer-gradient z-0 absolute" />
        <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
          <div className="flex flex-col">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Image
                src="/lebaby-logo.png"
                width="168"
                height="24"
                alt="logo"
                className="sm:w-[168px] w-[128px]"
              />
              <p className="font-normal text-[14px] text-[#25618B] opacity-50">
                Copyright © 2022 - 2023 LeBaby. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
