import profilepic from '../../public/55.jpg';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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

  console.log('Current Age: ' + age);

  // Handler for editting baby info

  const editBabyHandler = (props) => {
    setModalOpened(true);
  };

  const closeModalHandler = (props) => {
    setModalOpened(false);
  };

  const onSubmitEditBaby = async (data) => {
    setInputDisabled(true);
    const baby = {
      _id: users._id,
      postedAt: Date.now(),
      baby: data,
    };

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baby),
    });

    const responseJson = await response.json();
    console.log(responseJson);

    setInputDisabled(false);
    window.location.href = '/BabyProfile';
  };

  return (
    <>
      {modalOpened && (
        <Modal>
          <div>
            <form
              className="border shadow rounded px-8 pt-6 pb-8"
              onSubmit={handleSubmit(onSubmitEditBaby)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="text"
                      id="firstName"
                      name="firstName"
                      {...register('firstName', {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="text"
                      id="lastName"
                      name="lastName"
                      {...register('lastName', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="birthday"
                    >
                      Birthday
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="date"
                      id="birthday"
                      name="birthday"
                      {...register('birthday')}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="height"
                    >
                      Height
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="number"
                      id="height"
                      name="height"
                      {...register('height', {
                        required: true,
                        maxLength: 2,
                        minLength: 2,
                      })}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="weight"
                    >
                      Weight
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="number"
                      id="weight"
                      name="weight"
                      {...register('weight', {
                        required: true,
                        maxLength: 3,
                        minLength: 4,
                      })}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="head"
                    >
                      Head
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="number"
                      id="head"
                      name="head"
                      {...register('head', {
                        required: true,
                        maxLength: 2,
                        minLength: 2,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-5 border rounded-full overflow-hidden select-none w-[70%] mx-auto">
                <div className=" px-2 py-1 bg-purple-500 text-white text-sm font-semibold mr-3">
                  Gender
                </div>
                <div className="flex mx-auto w-full justify-between">
                  <label className="flex radio cursor-pointer place-items-center">
                    <input
                      className="transform scale-95"
                      type="radio"
                      value="boy"
                      id="field-boy"
                      {...register('gender')}
                    />
                    <div className="pl-1 pr-2 text-[0.8rem]">Boy</div>
                  </label>
                  <label className="flex radio cursor-pointer place-items-center">
                    <input
                      className="transform scale-95"
                      type="radio"
                      value="girl"
                      id="field-girl"
                      {...register('gender')}
                    />
                    <div className="pl-1 pr-2 text-[0.8rem]">Girl</div>
                  </label>
                  <label className="flex radio cursor-pointer place-items-center">
                    <input
                      className="transform scale-95"
                      type="radio"
                      value="neutral"
                      id="field-neutral"
                      {...register('gender')}
                    />
                    <div className="pl-1 pr-4 text-[0.8rem]">Neutral</div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-8 items-center justify-center">
                <button
                  className="w-[6rem] border rounded bg-purple-500 py-2 text-center text-white"
                  onClick={closeModalHandler}
                >
                  Close
                </button>
                <button
                  className="w-[6rem] border rounded bg-purple-500 py-2 text-center text-white"
                  onClick={editBabyHandler}
                  disabled={inputDisabled}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="container w-[75%] bg-white rounded-xl mx-auto shadow-lg px-8 py-6 relative overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 h-[7rem] absolute w-full inset-0 ">
          <p className="absolute top-[3rem] right-[2rem] text-xl text-white border-b-2 border-white">
            I am {age} old today
          </p>
        </div>
        <div className="flex gap-10 pt-[8rem] relative">
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
          </div>
          <div className="flex flex-col gap-2">
            <div>Height: {height}cm</div>
            <div>Weight: {weight}g</div>
            <div>Head: {head}cm</div>
            <div>Age: {age}</div>
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
