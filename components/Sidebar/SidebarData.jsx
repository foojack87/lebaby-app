import { datas } from './Data';
import Link from 'next/link';

const SidebarData = ({ toggle }) => {
  return (
    <div className="flex sm:flex-col">
      {datas.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={`${
              toggle ? 'last:w-[3.6rem]' : 'last:w-[12rem]'
            } flex items-center mt-2 p-4 rounded-lg cursor-pointer hover:bg-white transition-all duration-300 sm:last:absolute sm:left-4 sm:bottom-4`}
          >
            <div className="sm:mr-8 sm:text-[1.7rem] text-[1.2rem] text-brown">
              {link.icon}
            </div>
            <div
              className={`${
                toggle ? 'hidden' : 'sm:block'
              } hidden sm:text-[1rem] text-[0.8rem] text-brown whitespace-pre`}
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
