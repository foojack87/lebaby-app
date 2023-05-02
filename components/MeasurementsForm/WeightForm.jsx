import { useState, useRef } from 'react';
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

function calculateWeightPercentile(weightGrams, ageMonths, gender) {
  // WHO weight-for-age percentile values
  const percentiles = {
    boy: [
      { month: 0, L: 0.3487, M: 3.3467, S: 0.14602 },
      { month: 1, L: 0.2297, M: 4.4709, S: 0.13395 },
      { month: 2, L: 0.1974, M: 5.5675, S: 0.12344 },
      { month: 3, L: 0.173, M: 6.5633, S: 0.11503 },
      { month: 4, L: 0.1539, M: 7.4684, S: 0.10807 },
      { month: 5, L: 0.1382, M: 8.292, S: 0.10214 },
      { month: 6, L: 0.1244, M: 9.048, S: 0.09697 },
      { month: 7, L: 0.1122, M: 9.7467, S: 0.09238 },
      { month: 8, L: 0.1012, M: 10.3956, S: 0.08818 },
      { month: 9, L: 0.0913, M: 11.0013, S: 0.0843 },
      { month: 10, L: 0.0821, M: 11.5682, S: 0.08067 },
      { month: 11, L: 0.0736, M: 12.1011, S: 0.07727 },
      { month: 12, L: 0.0655, M: 12.6032, S: 0.07407 },
    ],
    girl: [
      { month: 0, L: 0.3802, M: 3.3038, S: 0.14602 },
      { month: 1, L: 0.207, M: 3.9856, S: 0.12841 },
      { month: 2, L: 0.1635, M: 4.8085, S: 0.11868 },
      { month: 3, L: 0.1394, M: 5.6564, S: 0.11228 },
      { month: 4, L: 0.1248, M: 6.475, S: 0.10805 },
      { month: 5, L: 0.1153, M: 7.2466, S: 0.10525 },
      { month: 6, L: 0.1083, M: 7.9725, S: 0.10338 },
      { month: 7, L: 0.1028, M: 8.6542, S: 0.10213 },
      { month: 8, L: 0.0981, M: 9.2931, S: 0.10126 },
      { month: 9, L: 0.094, M: 9.891, S: 0.10065 },
      { month: 10, L: 0.0901, M: 10.4494, S: 0.10023 },
      { month: 11, L: 0.0864, M: 10.9699, S: 0.09995 },
      { month: 12, L: 0.0829, M: 11.4543, S: 0.09979 },
    ],
  };

  const data = percentiles[gender]; // get percentile data for the gender

  // Find the closest month in the data
  let closestMonth = data[0];
  for (let i = 1; i < data.length; i++) {
    if (
      Math.abs(data[i].month - ageMonths) <
      Math.abs(closestMonth.month - ageMonths)
    ) {
      closestMonth = data[i];
    }
  }

  // Convert weight from grams to kilograms
  const weightKg = weightGrams / 1000;

  // Calculate Z-score
  const L = closestMonth.L;
  const M = closestMonth.M;
  const S = closestMonth.S;
  const zScore = ((weightKg / M) ** L - 1) / (S * L);

  // Lookup percentile from table
  let percentile = null;
  for (let i = 0; i < zScoreTable.length; i++) {
    if (zScore <= zScoreTable[i].zScore) {
      percentile = zScoreTable[i].percentile;
      break;
    }
  }

  return percentile;
}

calculateWeightPercentile(weight, age, gender);

const WeightForm = ({
  weightData,
  weightLabels,
  currentAge,
  gender,
  users,
  userLoading,
}) => {
  const [data, setData] = useState(weightData === undefined ? [] : weightData);
  const [labels, setLabels] = useState(
    weightLabels === undefined ? [] : weightLabels
  );
  const [inputDisabled, setInputDisabled] = useState(false);
  const weightRef = useRef(null);
  const ageRef = useRef(null);

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

    const weight = Number(weightRef.current.value);
    const age = Number(ageRef.current.value) + ' month';
    const babyGender = gender;
    const newData = { weight };

    const percentile = calculateWeightPercentile(
      weight,
      parseInt(age),
      babyGender
    );

    const newMeasurementData = [...data, newData];
    const newLabel = [...labels, { age: `${age} (${percentile}%)` }];

    setData(newMeasurementData);
    setLabels(newLabel);

    const response = await fetch('/api/baby', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: users._id,
        weightLabels: newLabel,
        weightData: newMeasurementData,
      }),
    });

    const responseJson = response.json();

    setInputDisabled(false);
    router.reload();
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:gap-12"
      >
        <div className="flex flex-col items-end gap-2 mb-4 sm:mb-6">
          <label htmlFor="weight" className="text-gray-600 font-medium mb-1">
            Weight:
            <input
              required
              type="number"
              placeholder="grams"
              name="weight"
              id="weight"
              ref={weightRef}
              className="ml-2 w-[6rem] border border-gray-400 rounded-md py-0.5 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </label>
          <label htmlFor="age" className="text-gray-600 font-medium mb-1">
            Age:
            <input
              required
              type="number"
              placeholder="months"
              name="age"
              id="age"
              ref={ageRef}
              className="ml-2 w-[6rem] border border-gray-400 rounded-md py-0.5 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </label>
          <label htmlFor="gender" className="text-gray-600 font-medium mb-1">
            Gender:
            <input
              type="text"
              name="gender"
              id="gender"
              disabled
              value={gender}
              className="ml-2 w-[6rem] border border-gray-400 rounded-md py-0.5 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </label>
        </div>
        <div className="place-self-center">
          <button
            type="submit"
            className="shadow-lg rounded-xl border w-[6rem] h-[2.5rem] bg-purple-500 text-center text-white px-2 py-1 mb-4 "
            disabled={inputDisabled}
          >
            {inputDisabled ? spinner : 'Add Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeightForm;
