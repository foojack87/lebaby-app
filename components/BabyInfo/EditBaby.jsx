import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner3 } from 'react-icons/im';

const EditBaby = ({
  users,
  firstName,
  lastName,
  head,
  weight,
  height,
  gender,
  birthday,
  closeModal,
}) => {
  const [inputDisabled, setInputDisabled] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName,
      lastName,
      height,
      weight,
      head,
      birthday,
      gender,
    },
  });

  // spinner for loading state

  const spinner = inputDisabled && (
    <div className="w-[100%] h-[100%] flex items-center justify-center text-xl text-white">
      <ImSpinner3 className="animate-spin" />
    </div>
  );

  // Handler for editing baby info

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
                {...register('gender', { required: true })}
              />
              <div className="pl-1 pr-2 text-[0.8rem]">Boy</div>
            </label>
            <label className="flex radio cursor-pointer place-items-center">
              <input
                className="transform scale-95"
                type="radio"
                value="girl"
                id="field-girl"
                {...register('gender', { required: true })}
              />
              <div className="pl-1 pr-2 text-[0.8rem]">Girl</div>
            </label>
            <label className="flex radio cursor-pointer place-items-center">
              <input
                className="transform scale-95"
                type="radio"
                value="neutral"
                id="field-neutral"
                {...register('gender', { required: true })}
              />
              <div className="pl-1 pr-4 text-[0.8rem]">Neutral</div>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8 items-center justify-center">
          <button
            className="w-[6rem] h-[3rem] border rounded bg-purple-500 py-2 text-center text-white"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="w-[6rem] h-[3rem] border rounded bg-purple-500 py-2 text-center text-white"
            disabled={inputDisabled}
          >
            {inputDisabled ? spinner : 'Edit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBaby;
