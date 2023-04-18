import profilepic from '../../public/55.jpg';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import EditBaby from './EditBaby';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import {
  GiPisces,
  GiAquarius,
  GiAries,
  GiTaurus,
  GiCancer,
  GiGemini,
  GiCapricorn,
  GiScorpio,
  GiLibra,
  GiSagittarius,
  GiVirgo,
  GiLeo,
  GiMonkey,
  GiRooster,
  GiSittingDog,
  GiPig,
  GiRat,
  GiBull,
  GiTiger,
  GiRabbit,
  GiSeaDragon,
  GiSnake,
  GiHorseHead,
  GiSheep,
  GiWeightScale,
} from 'react-icons/gi';
import { FaBirthdayCake } from 'react-icons/fa';
import { TfiRuler } from 'react-icons/tfi';
import { RxRulerHorizontal } from 'react-icons/rx';
import { TbMoodBoy } from 'react-icons/tb';

const BabyInfo = ({ users }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { firstName, lastName, height, weight, head, gender, birthday } =
    users.baby;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName,
      lastName,
      height,
      weight,
      head,
      birthday,
    },
  });

  // Logic for getting current age of baby
  const birthDate = new Date(birthday);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthDate;
  const ageInDays = ageInMilliseconds / (24 * 60 * 60 * 1000);
  let age;

  if (ageInDays < 7) {
    // Convert to age in days
    age = Math.floor(ageInDays) + ' days old';
  } else if (ageInDays < 30) {
    // Convert to age in weeks and days
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInRemainingDays = Math.floor(ageInDays % 7);
    age = ageInWeeks === 1 ? '1 week' : ageInWeeks + ' weeks';
    if (ageInRemainingDays > 0) {
      age += ' and ' + ageInRemainingDays + ' days old';
    }
  } else {
    // Convert to age in months and days
    const ageInMonths = Math.floor(ageInDays / 30);
    const ageInRemainingDays = Math.floor(ageInDays % 30);
    age = ageInMonths === 1 ? '1 month' : ageInMonths + ' months';
    if (ageInRemainingDays > 0 && ageInRemainingDays !== 1) {
      age += ' ' + ageInRemainingDays + ' days';
    }
  }

  // logic for finding zodiac sign

  const chineseZodiacs = [
    { name: 'Monkey', icon: <GiMonkey /> },
    { name: 'Rooster', icon: <GiRooster /> },
    { name: 'Dog', icon: <GiSittingDog /> },
    { name: 'Pig', icon: <GiPig /> },
    { name: 'Rat', icon: <GiRat /> },
    { name: 'Ox', icon: <GiBull /> },
    { name: 'Tiger', icon: <GiTiger /> },
    { name: 'Rabbit', icon: <GiRabbit /> },
    { name: 'Dragon', icon: <GiSeaDragon /> },
    { name: 'Snake', icon: <GiSnake /> },
    { name: 'Horse', icon: <GiHorseHead /> },
    { name: 'Sheep', icon: <GiSheep /> },
  ];

  const chineseZodiacIndex = (year - 1900) % 12;
  const chineseZodiac = chineseZodiacs[chineseZodiacIndex];

  console.log(`Your Chinese zodiac sign is ${chineseZodiac.name}`);

  // logic for finding babies horoscope

  const horoscopes = [
    {
      name: 'Aquarius',
      icon: <GiAquarius />,
      range: { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    },
    {
      name: 'Pisces',
      icon: <GiPisces />,
      range: { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    },
    {
      name: 'Aries',
      icon: <GiAries />,
      range: { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    },
    {
      name: 'Taurus',
      icon: <GiTaurus />,
      range: { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    },
    {
      name: 'Gemini',
      icon: <GiGemini />,
      range: { startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    },
    {
      name: 'Cancer',
      icon: <GiCancer />,
      range: { startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    },
    {
      name: 'Leo',
      icon: <GiLeo />,
      range: { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    },
    {
      name: 'Virgo',
      icon: <GiVirgo />,
      range: { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    },
    {
      name: 'Libra',
      icon: <GiLibra />,
      range: { startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    },
    {
      name: 'Scorpio',
      icon: <GiScorpio />,
      range: { startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    },
    {
      name: 'Sagittarius',
      icon: <GiSagittarius />,
      range: { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
    },
    {
      name: 'Capricorn',
      icon: <GiCapricorn />,
      range: { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    },
  ];

  const horoscope = horoscopes.find(
    (sign) =>
      (month === sign.range.startMonth && day >= sign.range.startDay) ||
      (month === sign.range.endMonth && day <= sign.range.endDay)
  );

  console.log(`Your horoscope is ${horoscope.name}`);

  const editBabyHandler = (props) => {
    setModalOpened(true);
  };

  const genderIcon = gender === 'boy' ? <BsGenderMale /> : <BsGenderFemale />;

  return (
    <>
      {modalOpened && (
        <Modal>
          <EditBaby
            firstName={firstName}
            lastName={lastName}
            weight={weight}
            height={height}
            head={head}
            gender={gender}
            birthday={birthday}
            users={users}
          />
        </Modal>
      )}
      <div className="container w-[55%] bg-white rounded-xl mx-auto shadow-lg px-8 py-6 relative overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 h-[8rem] absolute w-full inset-0 ">
          <div className="absolute top-[2rem] right-[4rem] text-white flex items-center gap-2">
            <span className="text-2xl">Horoscope:</span>
            <span className="text-4xl">{horoscope.icon}</span>
          </div>
          <div className="absolute top-[4.5rem] right-[4rem] text-white flex items-center gap-2">
            <span className="text-2xl">Zodiac:</span>
            <span className="text-4xl">{chineseZodiac.icon}</span>
          </div>
        </div>
        <div className="flex items-center pt-[8rem] justify-between relative mr-6 ml">
          <div className="border-[6px] rounded-full absolute top-[1rem] overflow-hidden w-[10rem] h-[10rem] border-white">
            <Image src={profilepic} alt="profile pic" className="w-[10rem]" />
          </div>
          <div className="flex items-center mt-12 ml-4 gap-2">
            <span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
              {firstName} {lastName}
            </span>
            <span className="text-2xl text-violet-500">{genderIcon}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaBirthdayCake className="text-xl text-violet-500" /> {birthday}
            </div>

            <div className="flex items-center gap-2">
              <TfiRuler className="text-xl text-violet-500" /> {height}cm
            </div>
            <div className="flex items-center gap-2">
              <GiWeightScale className="text-xl text-violet-500" /> {weight}g
            </div>
            <div className="flex items-center gap-2">
              <RxRulerHorizontal className="text-xl text-violet-500" />
              {head}cm
            </div>
            <div className="flex items-center gap-2">
              <TbMoodBoy className="text-xl text-violet-500" />
              {age}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8 items-center justify-center">
          <button
            className="w-[6rem] border rounded bg-purple-500 py-2 text-center text-white"
            onClick={editBabyHandler}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default BabyInfo;
