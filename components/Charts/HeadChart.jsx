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

const HeadChart = () => {
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
    const head = Number(event.target.head.value);
    const newData = { head };
    setData([...data, newData]);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Head',
        data: data.map((datum) => datum.head),
        fill: false,
        borderColor: 'red',
      },
    ],
  };

  return (
    <>
      <div>
        <h2>Head Chart</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Head:
            <input type="number" name="head" />
          </label>
          <button type="submit">Add Data</button>
        </form>
      </div>
      <Line options={options} data={chartData} />
    </>
  );
};

export default HeadChart;
