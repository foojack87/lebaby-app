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
import { useState } from 'react';

// Chartjs related settings

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

// Logic for calculating percentile of babies weight
const zScoreTable = [
  { zScore: -4, percentile: 0.01 },
  { zScore: -3.5, percentile: 0.05 },
  { zScore: -3, percentile: 0.1 },
  { zScore: -2.7, percentile: 0.2 },
  { zScore: -2.5, percentile: 0.31 },
  { zScore: -2.3, percentile: 0.45 },
  { zScore: -2, percentile: 0.62 },
  { zScore: -1.8, percentile: 1.0 },
  { zScore: -1.5, percentile: 1.87 },
  { zScore: -1.3, percentile: 3.1 },
  { zScore: -1, percentile: 6.68 },
  { zScore: -0.8, percentile: 10.87 },
  { zScore: -0.7, percentile: 13.59 },
  { zScore: -0.5, percentile: 20.86 },
  { zScore: -0.3, percentile: 30.12 },
  { zScore: 0, percentile: 50 },
  { zScore: 0.3, percentile: 69.88 },
  { zScore: 0.5, percentile: 79.14 },
  { zScore: 0.7, percentile: 86.41 },
  { zScore: 0.8, percentile: 89.13 },
  { zScore: 1, percentile: 84.13 },
  { zScore: 1.3, percentile: 96.89 },
  { zScore: 1.5, percentile: 93.32 },
  { zScore: 1.8, percentile: 98.13 },
  { zScore: 2, percentile: 97.72 },
  { zScore: 2.3, percentile: 99.55 },
  { zScore: 2.5, percentile: 99.38 },
  { zScore: 2.7, percentile: 99.8 },
  { zScore: 3, percentile: 99.9 },
  { zScore: 3.5, percentile: 99.95 },
  { zScore: 4, percentile: 99.99 },
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

  console.log(zScore);

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

const WeightChart = ({ currentAge, gender }) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  console.log(currentAge);
  console.log(data, labels);

  const handleSubmit = (event) => {
    event.preventDefault();

    const weight = Number(event.target.weight.value);
    const age = currentAge;
    const babyGender = gender;
    const newData = { weight };

    const percentile = calculateWeightPercentile(
      weight,
      parseInt(age),
      babyGender
    );
    console.log('Percentile: ' + percentile + '%');

    setData([...data, newData]);
    setLabels([...labels, { age: `${age} (${percentile}%)` }]);
  };

  const chartData = {
    labels: labels.map((datum) => datum.age),
    datasets: [
      {
        label: 'Weight',
        data: data.map((datum) => datum.weight),
        fill: false,
        borderColor: 'red',
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col backdrop:justify-center items-center">
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <label>
              Weight:
              <input
                type="number"
                placeholder="Weight in grams"
                name="weight"
              />
            </label>
            <label>
              Age:
              <input type="text" name="age" disabled value={currentAge} />
            </label>
            <label>
              Gender:
              <input type="text" name="age" disabled value={gender} />
            </label>
            <button type="submit">Add Data</button>
          </form>
        </div>
        <div className="w-[600px]">
          <Line options={options} data={chartData} />
          <div>
            *Growth percentile for reference only. Please consult doctor for
            more reliable readings.
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightChart;
