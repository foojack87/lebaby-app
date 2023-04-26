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
import { Line, getElementAtEvent, getDatasetAtEvent } from 'react-chartjs-2';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import WeightForm from '../MeasurementsForm/WeightForm';
import ConfirmationModal from '../Confirmation/ConfirmationModal';

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

const WeightChart = ({ currentAge, gender, users, userLoading }) => {
  const chartRef = useRef();
  const router = useRouter();

  const [inputDisabled, setInputDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [chartWeightEvent, setChartWeightEvent] = useState(null);

  if (userLoading) return <div>Loading...</div>;

  const data = users.weightData;
  const labels = users.weightLabels;

  console.log(users.weightData);
  console.log(users.weightLabels);

  // Logic for deleting data entries when clicking on a data point on the chart

  const onClick = (event) => {
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, event);
    console.log(element);

    if (element.length === 0) return;

    setChartWeightEvent(event);
    console.log(chartWeightEvent);

    setTitle('Delete Activity');
    setMessage(`Press 'Confirm' to delete`);
    setIsModalOpen(true);
  };

  const confirmHandler = async (props) => {
    setInputDisabled(false);
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, chartWeightEvent);

    if (element.length) {
      const { datasetIndex, index } = element[0];

      console.log(data[index]);
      const newData = data.filter((_, i) => i !== index);
      const newLabels = labels.filter((_, i) => i !== index);
      console.log(newData, newLabels);

      const response = await fetch('/api/baby', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: users._id,
          weightData: newData,
          weightLabels: newLabels,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      setIsModalOpen(false);
      setInputDisabled(true);
      router.reload();
    }
  };

  const cancelHandler = (props) => {
    setIsModalOpen(false);
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 8,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 6,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Growth Chart',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let label = chartData.labels[tooltipItem.dataIndex];
            let value =
              chartData.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.datasetIndex
              ];
          },
        },
      },
    },
  };

  const chartData = {
    labels: labels?.map((datum) => datum.age),
    datasets: [
      {
        label: 'Weight (grams)',
        data: data?.map((datum) => datum.weight),
        fill: false,
        borderColor: 'red',
      },
    ],
  };

  return (
    <>
      <ConfirmationModal
        title={title}
        message={message}
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <div className="flex flex-col mx-auto items-center overflow-hidden">
        <WeightForm
          currentAge={currentAge}
          gender={gender}
          users={users}
          userLoading={userLoading}
          weightData={data}
          weightLabels={labels}
        />
        <div className="w-full">
          <Line
            options={options}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
          />

          <div>
            <div className="text-center text-sm mt-3">
              <p>*Growth percentile for reference only.</p>
              <p>*Click on a data point to delete the data.</p>
            </div>
            <div className="hidden sm:block sm:text-sm mt-3">
              <p className="underline">References</p>
              <p>
                LMS Parameters for Girls: Weight-for-age. World Health
                Organization 2006, Child Growth Standards.
              </p>
              <p>
                LMS Parameters for Boys: Weight-for-age. World Health
                Organization 2006, Child Growth Standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightChart;
