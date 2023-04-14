import { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import WeightChart from '@/components/Charts/WeightChart';
import HeightChart from '@/components/Charts/HeightChart';
import HeadChart from '@/components/Charts/HeadChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Growth Chart',
    },
  },
};

const GrowthChart = ({ users, userLoading }) => {
  const [measurement, setMeasurement] = useState('weight');

  if (userLoading) return <div>loading...</div>;
  if (!users.baby) return <div>Create a baby first!</div>;

  const weightMeasurement = () => {
    setMeasurement('weight');
  };
  const heightMeasurement = () => {
    setMeasurement('height');
  };
  const headMeasurement = () => {
    setMeasurement('head');
  };
  const { firstName, lastName, height, weight, head, gender, birthday } =
    users.baby;

  // Logic for getting current age of baby
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthDate;
  const ageInDays = ageInMilliseconds / (24 * 60 * 60 * 1000);
  let age;

  if (ageInDays < 7) {
    // Convert to age in days
    age = Math.floor(ageInDays) + ' days';
  } else if (ageInDays < 30) {
    // Convert to age in weeks
    const ageInWeeks = Math.floor(ageInDays / 7);
    age = ageInWeeks === 1 ? '1 week' : ageInWeeks + ' weeks';
  } else {
    // Convert to age in months
    const ageInMonths = Math.floor(ageInDays / 30);
    age = ageInMonths === 1 ? '1 month' : ageInMonths + ' months';
  }

  console.log('Current Age: ' + age);

  return (
    <>
      <div className="flex flex-col rounded-xl w-[14rem] h-[16rem] items-center justify-center mx-auto shadow-lg ml-8">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-bold border-b-2 border-violet-500 mb-10">
          Record Growth
        </h1>
        <div className="flex flex-col gap-6">
          <button
            className={`shadow-lg rounded py-0.5 px-2 ${
              measurement === 'weight'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={weightMeasurement}
          >
            Weight
          </button>
          <button
            className={`shadow-lg rounded py-0.5 px-2 ${
              measurement === 'height'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={heightMeasurement}
          >
            Height
          </button>
          <button
            className={`shadow-lg rounded py-0.5 px-2 ${
              measurement === 'head'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={headMeasurement}
          >
            Head Circumfrence
          </button>
        </div>
      </div>
      <div className="flex w-[65%] h-[50%]">
        {measurement === 'weight' && (
          <WeightChart
            currentAge={age}
            gender={gender}
            users={users}
            userLoading={userLoading}
          />
        )}
        {measurement === 'height' && (
          <HeightChart
            currentAge={age}
            gender={gender}
            users={users}
            userLoading={userLoading}
          />
        )}

        {measurement === 'head' && (
          <HeadChart
            currentAge={age}
            gender={gender}
            users={users}
            userLoading={userLoading}
          />
        )}
      </div>
    </>
  );
};

export default GrowthChart;

export const getServerSideProps = withPageAuthRequired();
