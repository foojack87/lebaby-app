import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

const BabyForm = ({ users, userLoading }) => {
  const router = useRouter();
  const [inputDisabled, setInputDisabled] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      height: '',
      weight: '',
      head: '',
      birthday: new Date(Date.now()).toJSON(),
    },
  });

  const onSubmitBaby = async (data) => {
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
        className="py-8 pr-12 sm:pl-0 pl-12"
        onSubmit={handleSubmit(onSubmitBaby)}
      >
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Firstname"
            className="border border-gray-400 py-1 px-2"
            id="firstname"
            {...register('firstName', { required: true, maxLength: 20 })}
          />
          <input
            type="text"
            placeholder="Lastname"
            className="border border-gray-400 py-1 px-2"
            id="lastname"
            {...register('lastName', {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <input
            type="number"
            placeholder="Height: 60 (cm)"
            className="border border-gray-400 p-1.5 text-sm"
            id="height"
            {...register('height', {
              required: true,
              maxLength: 2,
              minLength: 2,
            })}
          />
          <input
            type="number"
            placeholder="Weight: 3150 (g)"
            className="border border-gray-400 p-1.5 text-sm"
            id="weight"
            {...register('weight', {
              required: true,
              maxLength: 4,
              minLength: 4,
            })}
          />
        </div>
        <div className="mt-5">
          <input
            type="number"
            placeholder="Head Circumfrence: 34 (cm)"
            className="border border-gray-400 py-1 px-2 w-full"
            id="head"
            {...register('head', {
              required: true,
              maxLength: 2,
              minLength: 2,
            })}
          />
        </div>
        <div className="mt-5">
          <input
            type="date"
            placeholder="Birth Date (MM/DD/YYYY)"
            className="border border-gray-400 py-1 px-2 w-full"
            id="bday"
            {...register('birthday')}
          />
        </div>
        <div className="flex mt-5 border rounded-full overflow-hidden select-none ">
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
        <div className="mt-5">
          <button
            className="w-full border rounded bg-purple-500 py-3 text-center text-white"
            type="submit"
            disabled={inputDisabled}
          >
            Done
          </button>
        </div>
      </form>
    </>
  );
};

export default BabyForm;
