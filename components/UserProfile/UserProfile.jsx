import profilepic from '../../public/55.jpg';
import useUserData from '@/utils/useUserData';
import Image from 'next/image';

const UserProfile = ({ toggle }) => {
  const { user, error, userLoading } = useUserData();
  console.log(user);

  if (userLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // refactor nested ternary operator

  const username = user.baby?.firstName ? user.baby.firstName : user.nickname;

  return (
    <div
      className={`flex gap-3 items-center ${
        toggle
          ? 'bg-none transition-all duration-300 delay-200'
          : 'bg-white rounded-xl p-3'
      }}`}
    >
      <div className="min-w-[3.5rem] h-[3.5rem] p-1">
        <Image
          src={profilepic}
          alt="profile picture"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className={toggle ? 'opacity-0 delay-200' : ''}>
        <h3 className="md:text-xl text-sm">{username}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
