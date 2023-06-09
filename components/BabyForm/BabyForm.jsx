import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';

const BabyForm = ({ users }) => {
  const [inputDisabled, setInputDisabled] = useState(false);

  const spinner = (
    <div className="w-[100%] h-[100%] flex items-center justify-center text-xl text-white">
      <ImSpinner3 className="animate-spin" />
    </div>
  );

  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      height: '',
      weight: '',
      head: '',
      birthday: formattedDate,
    },
  });

  // Form submit to database

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

    setInputDisabled(false);
    window.location.href = '/BabyProfile';
  };

  return (
    <>
      <form
        className="py-8 px-12 lg:pl-0"
        onSubmit={handleSubmit(onSubmitBaby)}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Firstname"
            className={`border border-gray-400 py-1 px-2 w-full ${
              errors.firstName ? 'border-red-500' : 'border-gray-400'
            }`}
            id="firstname"
            {...register('firstName', { required: true, maxLength: 20 })}
          />

          <input
            type="text"
            placeholder="Lastname"
            className={`border border-gray-400 py-1 px-2 w-full ${
              errors.lastName ? 'border-red-500' : 'border-gray-400'
            }`}
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
            className={`border border-gray-400 p-1.5 text-sm  ${
              errors.height ? 'border-red-500' : 'border-gray-400'
            }`}
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
            className={`border border-gray-400 p-1.5 text-sm  ${
              errors.weight ? 'border-red-500' : 'border-gray-400'
            }`}
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
            className={`border border-gray-400 py-1 px-2 w-full ${
              errors.head ? 'border-red-500' : 'border-gray-400'
            }`}
            id="head"
            {...register('head', {
              required: true,
              maxLength: 2,
              minLength: 2,
            })}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="bday">Date of Birth:</label>
          <input
            type="date"
            placeholder="Birth Date (MM/DD/YYYY)"
            className={`border border-gray-400 py-1 px-2 w-full ${
              errors.birthday ? 'border-red-500' : 'border-gray-400'
            }`}
            id="bday"
            {...register('birthday', {
              required: true,
            })}
          />
        </div>
        <div
          className={`flex mt-5 border rounded-full overflow-hidden select-none ${
            errors.gender && 'border-red-500'
          }`}
        >
          <div className="flex justify-center items-center px-2 sm:py-1 bg-purple-500 text-white text-sm font-semibold">
            <p>Gender</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full items-center justify-center py-1 sm:py-0">
            <label className="flex radio cursor-pointer justify-center">
              <input
                className="transform scale-95"
                type="radio"
                value="boy"
                id="field-boy"
                {...register('gender', { required: true })}
              />
              <div className="pl-1 pr-2 text-[0.7rem] sm:text-[0.8rem]">
                Boy
              </div>
            </label>
            <label className="flex radio cursor-pointer justify-center">
              <input
                className="transform scale-95"
                type="radio"
                value="girl"
                id="field-girl"
                {...register('gender', { required: true })}
              />
              <div className="pl-1 pr-2 text-[0.7rem] sm:text-[0.8rem]">
                Girl
              </div>
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="w-full border rounded bg-purple-500 py-3 text-center text-white"
            type="submit"
            disabled={inputDisabled}
          >
            {inputDisabled ? spinner : 'Done'}
          </button>
        </div>
      </form>
    </>
  );
};

export default BabyForm;
