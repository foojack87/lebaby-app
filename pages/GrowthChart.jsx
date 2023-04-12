import { useState } from 'react';
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
  if (userLoading) return <div>loading...</div>;

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
      <div className="flex flex-col w-[65%] h-[50%]">
        <WeightChart currentAge={age} gender={gender} />
        <HeightChart currentAge={age} />
        <HeadChart currentAge={age} />
      </div>
    </>
  );
};

export default GrowthChart;
