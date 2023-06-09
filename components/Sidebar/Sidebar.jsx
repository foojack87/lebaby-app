import { useState, useEffect, useRef } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import SidebarData from './SidebarData';
import UserProfile from '../UserProfile/UserProfile';

const Sidebar = ({ users }) => {
  const [toggle, setToggle] = useState(true);

  const { baby } = !users?.baby ? '' : users.baby;

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="sticky top-0 z-10">
      <div
        className={`${
          toggle ? 'sm:w-[5.8rem]' : 'sm:w-[12rem] md:w-[14rem]'
        } sm:bg-glass bg-white bg-opacity-75 sm:h-[36rem] h-[6rem] mb-2 sm:mb-0 rounded-3xl sm:ml-6 p-4 border transition-all duration-500 border-solid border-glass relative place-self-start `}
      >
        <div className="flex sm:flex-col">
          <UserProfile toggle={toggle} />
          <SidebarData toggle={toggle} />
        </div>

        <div
          className="absolute top-[12rem] -right-5 sm:flex justify-center items-center w-10 h-10 bg-[glass] rounded-full cursor-pointer hidden"
          onClick={toggleHandler}
        >
          <BiChevronLeft
            className={`text-pink-500 ${
              toggle ? 'text-3xl rotate-180' : ''
            } text-3xl transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
