import { RxDashboard } from 'react-icons/rx';
import { MdInsights } from 'react-icons/md';
import { RiCouponLine } from 'react-icons/ri';
import { FiUser, FiLogOut } from 'react-icons/fi';

export const datas = [
  {
    id: 1,
    icon: <RxDashboard />,
    text: 'Profile',
    path: '/BabyProfile',
  },
  {
    id: 2,
    icon: <MdInsights />,
    text: 'Activity',
    path: '/BabyActivity',
  },
  {
    id: 3,
    icon: <RiCouponLine />,
    text: 'Dailies',
    path: '/BabyDailies',
  },
  {
    id: 4,
    icon: <FiUser />,
    text: 'Growth Chart',
    path: '/GrowthChart',
  },
  {
    id: 8,
    icon: <FiLogOut />,
    text: 'Logout',
    path: '/api/auth/logout',
  },
];
