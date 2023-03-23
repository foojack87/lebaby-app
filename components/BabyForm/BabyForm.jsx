import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useUserData from '@/utils/useUserData';
import { useState } from 'react';

const BabyForm = ({ babies }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUserData();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: 'Kyson',
      lastName: 'Foo',
      height: 55,
      weight: 2980,
      head: 28,
      birthday: new Date(Date.now()).toJSON(),
    },
  });

  const [inputDisabled, setInputDisabled] = useState(false);
  const [baby, setBaby] = useState([]);

  const onSubmitBaby = async (data) => {
    setInputDisabled(true);
    const baby = {
      postedAt: Date.now(),
      body: data,
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch('/api/flutter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(baby),
    });

    const responseJson = await response.json();

    setBaby((babies) => [
      {
        _id: responseJson.insertedId,
        ...baby,
      },
      ...babies,
    ]);
    setInputDisabled(false);
    router.reload();
  };

  // const onSubmit = (data) => console.log(new Date(data.birthday).toJSON());
  // console.log(new Date(Date.now()).toJSON());

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
              maxLength: 3,
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
