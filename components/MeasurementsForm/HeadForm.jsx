import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner3 } from 'react-icons/im';

// Logic for calculating percentile of babies weight
const zScoreTable = [
  { zScore: -3, percentile: 0.13 },
  { zScore: -2.9, percentile: 0.19 },
  { zScore: -2.8, percentile: 0.26 },
  { zScore: -2.7, percentile: 0.35 },
  { zScore: -2.6, percentile: 0.47 },
  { zScore: -2.5, percentile: 0.62 },
  { zScore: -2.4, percentile: 0.82 },
  { zScore: -2.3, percentile: 1.07 },
  { zScore: -2.2, percentile: 1.39 },
  { zScore: -2.1, percentile: 1.79 },
  { zScore: -2.0, percentile: 2.28 },
  { zScore: -1.9, percentile: 2.87 },
  { zScore: -1.8, percentile: 3.59 },
  { zScore: -1.7, percentile: 4.46 },
  { zScore: -1.6, percentile: 5.48 },
  { zScore: -1.5, percentile: 6.68 },
  { zScore: -1.4, percentile: 8.08 },
  { zScore: -1.3, percentile: 9.68 },
  { zScore: -1.2, percentile: 11.51 },
  { zScore: -1.1, percentile: 13.57 },
  { zScore: -1, percentile: 15.87 },
  { zScore: -0.9, percentile: 18.41 },
  { zScore: -0.8, percentile: 21.19 },
  { zScore: -0.7, percentile: 24.2 },
  { zScore: -0.6, percentile: 27.43 },
  { zScore: -0.5, percentile: 30.85 },
  { zScore: -0.4, percentile: 34.46 },
  { zScore: -0.3, percentile: 38.21 },
  { zScore: -0.2, percentile: 42.07 },
  { zScore: -0.1, percentile: 46.02 },
  { zScore: 0, percentile: 50 },
  { zScore: 0.1, percentile: 53.98 },
  { zScore: 0.2, percentile: 57.93 },
  { zScore: 0.3, percentile: 61.79 },
  { zScore: 0.4, percentile: 65.54 },
  { zScore: 0.5, percentile: 69.15 },
  { zScore: 0.6, percentile: 72.58 },
  { zScore: 0.7, percentile: 75.8 },
  { zScore: 0.8, percentile: 78.81 },
  { zScore: 0.9, percentile: 81.59 },
  { zScore: 1, percentile: 84.13 },
  { zScore: 1.1, percentile: 86.43 },
  { zScore: 1.2, percentile: 88.49 },
  { zScore: 1.3, percentile: 90.32 },
  { zScore: 1.4, percentile: 91.92 },
  { zScore: 1.5, percentile: 93.32 },
  { zScore: 1.6, percentile: 94.52 },
  { zScore: 1.7, percentile: 95.54 },
  { zScore: 1.8, percentile: 96.41 },
  { zScore: 1.9, percentile: 97.13 },
  { zScore: 2.0, percentile: 97.73 },
  { zScore: 2.1, percentile: 98.21 },
  { zScore: 2.2, percentile: 98.61 },
  { zScore: 2.3, percentile: 98.93 },
  { zScore: 2.4, percentile: 99.18 },
  { zScore: 2.5, percentile: 99.38 },
  { zScore: 2.6, percentile: 99.53 },
  { zScore: 2.7, percentile: 99.65 },
  { zScore: 2.8, percentile: 99.74 },
  { zScore: 2.9, percentile: 99.81 },
  { zScore: 3.0, percentile: 99.87 },
];

// LMS data up to 20 months

const lms = {
  boy: [
    { age: 0, L: 1, M: 34.4618, S: 0.03686 },
    { age: 1, L: 1, M: 37.2759, S: 0.03133 },
    { age: 2, L: 1, M: 39.1285, S: 0.02997 },
    { age: 3, L: 1, M: 40.5135, S: 0.02918 },
    { age: 4, L: 1, M: 41.6317, S: 0.02868 },
    { age: 5, L: 1, M: 42.5576, S: 0.02837 },
    { age: 6, L: 1, M: 43.3306, S: 0.02817 },
    { age: 7, L: 1, M: 43.9803, S: 0.02804 },
    { age: 8, L: 1, M: 44.53, S: 0.02796 },
    { age: 9, L: 1, M: 44.9998, S: 0.02792 },
    { age: 10, L: 1, M: 45.4051, S: 0.0279 },
    { age: 11, L: 1, M: 45.7573, S: 0.02789 },
    { age: 12, L: 1, M: 46.0661, S: 0.02789 },
    { age: 13, L: 1, M: 46.3395, S: 0.02789 },
    { age: 14, L: 1, M: 46.5844, S: 0.02791 },
    { age: 15, L: 1, M: 46.806, S: 0.02792 },
    { age: 16, L: 1, M: 47.0088, S: 0.02795 },
    { age: 17, L: 1, M: 47.1962, S: 0.02797 },
    { age: 18, L: 1, M: 47.3711, S: 0.028 },
    { age: 19, L: 1, M: 47.5357, S: 0.02803 },
    { age: 20, L: 1, M: 47.6919, S: 0.02806 },
  ],
  girl: [
    { age: 0, L: 1, M: 33.8787, S: 0.03496 },
    { age: 1, L: 1, M: 36.5463, S: 0.0321 },
    { age: 2, L: 1, M: 38.2521, S: 0.03168 },
    { age: 3, L: 1, M: 39.5328, S: 0.0314 },
    { age: 4, L: 1, M: 40.5817, S: 0.03119 },
    { age: 5, L: 1, M: 41.459, S: 0.03102 },
    { age: 6, L: 1, M: 42.1995, S: 0.03087 },
    { age: 7, L: 1, M: 42.829, S: 0.03075 },
    { age: 8, L: 1, M: 43.3671, S: 0.03063 },
    { age: 9, L: 1, M: 43.83, S: 0.03053 },
    { age: 10, L: 1, M: 44.2319, S: 0.03044 },
    { age: 11, L: 1, M: 44.5844, S: 0.03035 },
    { age: 12, L: 1, M: 44.8965, S: 0.03027 },
    { age: 13, L: 1, M: 45.1752, S: 0.03019 },
    { age: 14, L: 1, M: 45.4265, S: 0.03012 },
    { age: 15, L: 1, M: 45.6551, S: 0.03006 },
    { age: 16, L: 1, M: 45.865, S: 0.02999 },
    { age: 17, L: 1, M: 46.0598, S: 0.02993 },
    { age: 18, L: 1, M: 46.2424, S: 0.02987 },
    { age: 19, L: 1, M: 46.4152, S: 0.02982 },
    { age: 20, L: 1, M: 46.5801, S: 0.02977 },
  ],
};

function calculateHeadZScoreAndPercentile(ageMonths, headCm, gender) {
  const lmsData = lms[gender];

  // Find the closest age in the LMS data
  let closestAge = lmsData[0];
  for (let i = 1; i < lmsData.length; i++) {
    if (
      Math.abs(ageMonths - lmsData[i].age) <
      Math.abs(ageMonths - closestAge.age)
    ) {
      closestAge = lmsData[i];
    }
  }

  // Calculate Z-score
  const zScore =
    ((headCm / closestAge.M) ** closestAge.L - 1) /
    (closestAge.S * closestAge.L);

  // Percentile look-up
  let percentile = null;
  for (let i = 0; i < zScoreTable.length; i++) {
    if (zScore <= zScoreTable[i].zScore) {
      percentile = zScoreTable[i].percentile;
      break;
    }
  }

  return percentile;
}

const ageMonths = 1;
const headCm = 38;
const gender = 'boy';
const result = calculateHeadZScoreAndPercentile(ageMonths, headCm, gender);
console.log(result);

const HeadForm = ({ headData, headLabels, gender, users, userLoading }) => {
  const [data, setData] = useState(headData === undefined ? [] : headData);
  const [labels, setLabels] = useState(
    headLabels === undefined ? [] : headLabels
  );
  const [inputDisabled, setInputDisabled] = useState(false);

  // spinner

  const spinner = inputDisabled && (
    <div className="w-[100%] h-[100%] flex justify-center items-center text-xl text-white">
      <ImSpinner3 className="animate-spin" />
    </div>
  );
  const router = useRouter();
  if (userLoading) return <div>Loading...</div>;

  // Logic for submitting weight data of the baby
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputDisabled(true);

    console.log(event.target.age);

    const head = Number(event.target.head.value);
    const age = Number(event.target.age.value) + ' month';
    const babyGender = gender;
    const newData = { head };

    const percentile = calculateHeadZScoreAndPercentile(
      parseInt(age),
      head,
      babyGender
    );

    const newMeasurementData = [...data, newData];
    const newLabel = [...labels, { age: `${age} (${percentile}%)` }];

    setData(newMeasurementData);
    setLabels(newLabel);

    console.log(data, labels);

    const response = await fetch('/api/baby', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: users._id,
        headLabels: newLabel,
        headData: newMeasurementData,
      }),
    });

    const responseJson = response.json();
    console.log(responseJson);

    setInputDisabled(false);
    router.reload();
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="flex gap-12">
        <div className="flex flex-col gap-2 mb-6 items-end">
          <label htmlFor="head" className="text-gray-600 font-medium mb-1">
            Head Circumfrence:
            <input
              type="number"
              step="0.1"
              placeholder="cm"
              name="head"
              id="head"
              className="ml-2 w-[6rem] border border-gray-400 rounded-md py-0.5 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
              required
            />
          </label>
          <label htmlFor="age" className="text-gray-600 font-medium mb-1">
            Age:
            <input
              type="number"
              placeholder="months"
              name="age"
              id="age"
              required
              className="ml-2 w-[6rem] border border-gray-400 rounded-md py-0.5 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
              min="0"
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              disabled
              value={gender}
              className="w-[6rem] ml-3 text-center"
            />
          </label>
        </div>
        <div className="place-self-center">
          <button
            type="submit"
            className="shadow-lg rounded-xl border w-[6rem] h-[2.5rem] bg-purple-500 text-center text-white px-2 py-1"
            disabled={inputDisabled}
          >
            {inputDisabled ? spinner : 'Add Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeadForm;
