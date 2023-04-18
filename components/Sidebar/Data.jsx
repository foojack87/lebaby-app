import { RxCalendar } from 'react-icons/rx';
import { RiLineChartLine } from 'react-icons/ri';
import { FiLogOut, FiActivity } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

export const datas = [
  {
    id: 1,
    icon: <CgProfile className="text-pink-500" />,
    text: 'Profile',
    path: '/BabyProfile',
  },
  {
    id: 2,
    icon: <FiActivity className="text-pink-500" />,
    text: 'Activity',
    path: '/BabyDailies',
  },
  {
    id: 3,
    icon: <RxCalendar className="text-pink-500" />,
    text: 'Dailies',
    path: '/BabyActivity',
  },
  {
    id: 4,
    icon: <RiLineChartLine className="text-pink-500" />,
    text: 'Growth Chart',
    path: '/GrowthChart',
  },
  {
    id: 8,
    icon: <FiLogOut className="text-pink-500" />,
    text: 'Logout',
    path: '/api/auth/logout',
  },
];
