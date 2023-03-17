import { useRouter } from 'next/router';
import { useUser, useSetUser } from '@/context/UserContext';

function AnchorLink({ children, href, className }) {
  const router = useRouter();
  const user = useUser();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
    console.log(user.id);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={
        `shadow-md inline-flex items-center uppercase border border-transparent rounded-md font-semibold text-white tracking-widesttransition ease-in-out duration-150 bg-[#a509ff] hover:bg-[#34acc7] hover:-translate-y-0.5` +
        className
      }
    >
      {children}
    </a>
  );
}

export default AnchorLink;
