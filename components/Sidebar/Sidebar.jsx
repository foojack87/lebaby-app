import { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import SidebarData from './SidebarData';
import UserProfile from '../UserProfile/UserProfile';

const Sidebar = (props) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <div
      className={`${
        toggle ? 'w-[5.8rem]' : 'sm:w-[12rem] md:w-[14rem] w-[10rem]'
      } sidebar-container `}
    >
      <UserProfile toggle={toggle} />
      <SidebarData toggle={toggle} />
      <div
        className="absolute top-[12rem] -right-5 flex justify-center items-center w-10 h-10 bg-[glass] rounded-full cursor-pointer"
        onClick={toggleHandler}
      >
        <BiChevronLeft
          className={`${
            toggle ? 'rotate-180' : ''
          } text-3xl transition-all duration-300`}
        />
      </div>
    </div>
  );
};

export default Sidebar;
