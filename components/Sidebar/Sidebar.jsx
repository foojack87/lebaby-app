import styles from '@/styles';
import { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import AnchorLink from '../AnchorLink/AnchorLink';
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
      className={`${toggle ? 'w-[5.8rem]' : 'w-[14rem]'} sidebar-container `}
    >
      <UserProfile toggle={toggle} />
      <SidebarData toggle={toggle} />
      <div
        className="absolute top-[12rem] -right-5 flex justify-center items-center  w-10 h-10 bg-[glass] rounded-full cursor-pointer"
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
