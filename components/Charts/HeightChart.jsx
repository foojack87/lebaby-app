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
import HeightForm from '../MeasurementsForm/HeightForm';
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

const HeightChart = ({ currentAge, gender, users, userLoading }) => {
  const chartRef = useRef();
  const router = useRouter();

  const [inputDisabled, setInputDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [chartHeightEvent, setChartHeightEvent] = useState(null);

  if (userLoading) return <div>Loading...</div>;

  const data = users.heightData;
  const labels = users.heightLabels;

  const onClick = (event) => {
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, event);

    if (element.length === 0) return;

    setChartHeightEvent(event);

    setTitle('Delete Activity');
    setMessage(`Press 'Confirm' to delete`);
    setIsModalOpen(true);
  };

  const confirmHandler = async (props) => {
    setInputDisabled(false);
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, chartHeightEvent);

    if (element.length) {
      const { datasetIndex, index } = element[0];

      const newData = data.filter((_, i) => i !== index);
      const newLabels = labels.filter((_, i) => i !== index);

      const response = await fetch('/api/baby', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: users._id,
          heightData: newData,
          heightLabels: newLabels,
        }),
      });

      const responseJson = await response.json();

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
        label: 'Height (cm)',
        data: data?.map((datum) => datum.height),
        fill: false,
        borderColor: 'green',
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
        <HeightForm
          currentAge={currentAge}
          gender={gender}
          users={users}
          userLoading={userLoading}
          heightData={data}
          heightLabels={labels}
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

          <div className="hidden sm:block text-sm mt-3">
            <p className="underline">References</p>
            <p>
              LMS Parameters for Girls: Length-for-age. World Health
              Organization 2006, Child Growth Standards.
            </p>
            <p>
              LMS Parameters for Boys: Length-for-age. World Health Organization
              2006, Child Growth Standards.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeightChart;
