import { datas } from './Data';
import Link from 'next/link';

const SidebarData = ({ toggle }) => {
  return (
    <div className="flex mx-auto gap-2 sm:flex-col">
      {datas.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={` flex items-center sm:mt-2 sm:p-4 rounded-lg cursor-pointer hover:bg-white transition-all duration-300 sm:last:absolute sm:left-4 sm:bottom-4`}
          >
            <div className="px-1 sm:px-0 sm:text-[1.7rem] text-[1.2rem] text-brown">
              {link.icon}
            </div>
            <div
              className={`${
                toggle ? 'hidden' : 'sm:block'
              } hidden sm:ml-8 sm:text-[1rem] text-[0.8rem] text-brown whitespace-pre`}
            >
              {link.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarData;
