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

const HeightChart = () => {
  const [data, setData] = useState([]);
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const weight = Number(event.target.weight.value);
    const newData = { weight };
    setData([...data, newData]);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Height',
        data: data.map((datum) => datum.weight),
        fill: false,
        borderColor: 'red',
      },
    ],
  };

  return (
    <>
      <div>
        <h2>Height Chart</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Height:
            <input type="number" name="weight" />
          </label>
          <button type="submit">Add Data</button>
        </form>
      </div>
      <Line options={options} data={chartData} />
    </>
  );
};

export default HeightChart;
