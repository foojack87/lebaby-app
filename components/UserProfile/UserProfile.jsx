import user from '../../public/55.jpg';
import Image from 'next/image';

const UserProfile = ({ toggle }) => {
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
          src={user}
          alt="profile picture"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className={toggle ? 'opacity-0 delay-200' : ''}>
        <h3 className="text-xl">Silvia Chiu</h3>
        <span className="text-[0.75rem] opacity-60">silviachiu@gmail.com</span>
      </div>
    </div>
  );
};

export default UserProfile;
