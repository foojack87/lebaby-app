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
import HeadForm from '../MeasurementsForm/HeadForm';
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

const HeadChart = ({ currentAge, gender, users, userLoading }) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [chartHeadEvent, setChartHeadEvent] = useState(null);

  const chartRef = useRef();
  const router = useRouter();

  if (userLoading) return <div>Loading...</div>;

  const data = users.headData;
  const labels = users.headLabels;

  console.log(data, labels);

  // Logic for deleting data entries when clicking on a data point on the chart
  const onClick = async (event) => {
    setChartHeadEvent(event);
    console.log(chartHeadEvent);

    setTitle('Delete Activity');
    setMessage(`Press 'Confirm' to delete`);
    setIsModalOpen(true);
  };

  const confirmHandler = async (props) => {
    setInputDisabled(false);
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, chartHeadEvent);

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
          headData: newData,
          headLabels: newLabels,
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
        label: 'Head Circumfrence (cm)',
        data: data?.map((datum) => datum.head),
        fill: false,
        borderColor: 'blue',
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
        <HeadForm
          currentAge={currentAge}
          gender={gender}
          users={users}
          userLoading={userLoading}
          headData={data}
          headLabels={labels}
        />
        <div className="w-full">
          <Line
            options={options}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
          />
          <div className="text-center text-sm mt-3">
            <p>*Growth percentile for reference only.</p>
            <p>*Click on a data point to delete the data.</p>
          </div>
          <div className="hidden sm:block sm:text-sm mt-3">
            <p className="underline">References</p>
            <p>
              LMS Parameters for Girls: Head-circumference-for-age. World Health
              Organization 2006, Child Growth Standards.
            </p>
            <p>
              LMS Parameters for Boys: Head-circumference-for-age. World Health
              Organization 2006, Child Growth Standards.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadChart;
