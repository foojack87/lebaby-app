import profilepic from '../../public/55.jpg';
import Image from 'next/image';

const BabyInfo = ({ users }) => {
  const { firstName, lastName, height, weight, head, gender, birthday } =
    users.baby;

  return (
    <div className="container w-[75%] bg-white rounded-xl mx-auto shadow-lg px-8 py-6 relative overflow-hidden">
      <div className="text-transparent bg-gradient-to-r from-pink-500 to-violet-500 h-[7rem] absolute w-full inset-0 " />
      <div className="flex justify-between pt-[8rem] relative">
        <div className="border-[6px] rounded-full absolute top-[1rem] overflow-hidden w-[10rem] h-[10rem] border-white">
          <Image src={profilepic} alt="profile pic" className="w-[10rem]" />
        </div>
        <div className="text-center flex items-center mt-12">
          <span className="mr-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
            {firstName} {lastName}
          </span>
          <span>{gender}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div>Horoscope: Gemini</div>
          <div>Zodiac Sign: Rabbit</div>
          <div>Birth Date: {birthday}</div>
          <div>Vaccinations:</div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Height: {height}cm</div>
          <div>Weight: {weight}g</div>
          <div>Head: {head}cm</div>
          <div>Age: 1MO</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <button className="w-[6rem] place-self-center border rounded bg-purple-500 py-2 text-center text-white">
          Edit
        </button>
      </div>
    </div>
  );
};

export default BabyInfo;
