import { useState } from 'react';
import { useRouter } from 'next/router';

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

// LMS data for boys up to 6 months

const lms = {
  boy: [
    { age: 0, L: 1, M: 49.8842, S: 0.03795 },
    { age: 1, L: 1, M: 54.7244, S: 0.03557 },
    { age: 2, L: 1, M: 58.4249, S: 0.03424 },
    { age: 3, L: 1, M: 61.4292, S: 0.03328 },
    { age: 4, L: 1, M: 63.886, S: 0.03257 },
    { age: 5, L: 1, M: 65.9026, S: 0.03204 },
    { age: 6, L: 1, M: 67.6236, S: 0.03165 },
    { age: 7, L: 1, M: 69.1645, S: 0.03139 },
    { age: 8, L: 1, M: 70.5994, S: 0.03124 },
    { age: 9, L: 1, M: 71.9687, S: 0.03117 },
    { age: 10, L: 1, M: 73.2812, S: 0.03118 },
    { age: 11, L: 1, M: 74.5388, S: 0.03125 },
    { age: 12, L: 1, M: 75.7488, S: 0.03137 },
    { age: 13, L: 1, M: 76.9186, S: 0.03154 },
    { age: 14, L: 1, M: 78.0497, S: 0.03174 },
    { age: 15, L: 1, M: 79.1458, S: 0.03197 },
    { age: 16, L: 1, M: 80.2113, S: 0.03222 },
    { age: 17, L: 1, M: 81.2487, S: 0.0325 },
    { age: 18, L: 1, M: 82.2587, S: 0.03279 },
    { age: 19, L: 1, M: 83.2418, S: 0.0331 },
    { age: 20, L: 1, M: 84.1996, S: 0.03342 },
  ],
  girl: [
    { age: 0, L: 1, M: 49.1477, S: 0.0379 },
    { age: 1, L: 1, M: 53.6872, S: 0.0364 },
    { age: 2, L: 1, M: 57.0673, S: 0.03568 },
    { age: 3, L: 1, M: 59.8029, S: 0.0352 },
    { age: 4, L: 1, M: 62.0899, S: 0.03486 },
    { age: 5, L: 1, M: 62.0899, S: 0.03463 },
    { age: 6, L: 1, M: 64.0301, S: 0.03448 },
    { age: 7, L: 1, M: 65.7311, S: 0.03441 },
    { age: 8, L: 1, M: 67.2873, S: 0.0344 },
    { age: 9, L: 1, M: 68.7498, S: 0.03444 },
    { age: 10, L: 1, M: 70.1435, S: 0.03452 },
    { age: 11, L: 1, M: 71.4818, S: 0.03464 },
    { age: 12, L: 1, M: 72.771, S: 0.03479 },
    { age: 13, L: 1, M: 74.015, S: 0.03496 },
    { age: 14, L: 1, M: 75.2176, S: 0.03514 },
    { age: 15, L: 1, M: 76.3817, S: 0.03534 },
    { age: 16, L: 1, M: 77.5099, S: 0.03555 },
    { age: 17, L: 1, M: 78.6055, S: 0.03576 },
    { age: 18, L: 1, M: 79.671, S: 0.03598 },
    { age: 19, L: 1, M: 80.7079, S: 0.0362 },
    { age: 20, L: 1, M: 81.7182, S: 0.03643 },
  ],
};

function calculateLengthZScoreAndPercentile(ageMonths, lengthCm, gender) {
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
    ((lengthCm / closestAge.M) ** closestAge.L - 1) /
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
const lengthCm = 54;
const gender = 'boy';
const result = calculateLengthZScoreAndPercentile(ageMonths, lengthCm, gender);
console.log(result);

const HeightForm = ({
  heightData,
  heightLabels,
  currentAge,
  gender,
  users,
  userLoading,
}) => {
  const [data, setData] = useState(heightData === undefined ? [] : heightData);
  const [labels, setLabels] = useState(
    heightLabels === undefined ? [] : heightLabels
  );
  const [inputDisabled, setInputDisabled] = useState(false);

  const router = useRouter();
  if (userLoading) return <div>Loading...</div>;

  // Logic for submitting weight data of the baby
  const handleSubmit = async (event) => {
    event.preventDefault();

    const height = Number(event.target.height.value);
    const age = currentAge;
    const babyGender = gender;
    const newData = { height };

    const percentile = calculateLengthZScoreAndPercentile(
      parseInt(age),
      height,
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
        heightLabels: newLabel,
        heightData: newMeasurementData,
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
        <div className="flex flex-col gap-2 mb-6">
          <label>
            Height:
            <input
              type="number"
              placeholder="cm"
              name="height"
              className="w-[6rem] ml-3"
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="age"
              disabled
              value={currentAge}
              className="w-[6rem] ml-3 text-center"
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="age"
              disabled
              value={gender}
              className="w-[6rem] ml-3 text-center"
            />
          </label>
        </div>
        <div className="place-self-center">
          <button
            type="submit"
            className="shadow-lg rounded-xl border bg-purple-500 text-center text-white px-2 py-1"
            disabled={inputDisabled}
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeightForm;
