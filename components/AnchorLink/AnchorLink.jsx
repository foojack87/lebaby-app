import { useRouter } from 'next/router';
import { useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';

function AnchorLink({ children, href, className }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const spinner = (
    <div className="w-[100%] h-[100%] flex items-center justify-center text-xl text-white">
      <ImSpinner3 className="animate-spin " />
    </div>
  );

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <a
      href={href}
      onClick={handleClick}
      className={
        `shadow-md flex items-center justify-center uppercase rounded-md font-semibold text-white ease-in-out duration-150 bg-[#a509ff] hover:bg-[#34acc7] hover:-translate-y-0.5` +
        ' ' +
        className
      }
    >
      {!isLoading ? children : spinner}
    </a>
  );
}

export default AnchorLink;
