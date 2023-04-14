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
import { useRef } from 'react';
import { useRouter } from 'next/router';
import HeightForm from '../MeasurementsForm/HeightForm';

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

  if (userLoading) return <div>Loading...</div>;

  const data = users.heightData;
  const labels = users.heightLabels;

  console.log(data, labels);

  // Logic for deleting data entries when clicking on a data point on the chart
  const onClick = async (event) => {
    const { current: chart } = chartRef;
    const element = getElementAtEvent(chart, event);

    if (element.length) {
      const { datasetIndex, index } = element[0];
      const confirmDelete = window.confirm(`Confirm delete?`);
      if (confirmDelete) {
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
            heightData: newData,
            heightLabels: newLabels,
          }),
        });

        const responseJson = response.json();
        console.log(responseJson);
      }
      router.reload();
    }
  };

  const options = {
    responsive: true,
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
      <div className="flex flex-col mx-auto items-center">
        <HeightForm
          currentAge={currentAge}
          gender={gender}
          users={users}
          userLoading={userLoading}
          heightData={data}
          heightLabels={labels}
        />
        <div className="w-[600px]">
          <Line
            options={options}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
          />
          <div className="text-center mt-3">
            <p>*Growth percentile for reference only.</p>
            <p>*Click on a data point to delete the data.</p>
          </div>
          <div>
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
