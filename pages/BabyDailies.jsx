import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const BabyDailies = () => {
  const [tasks, setTasks] = useState([]);
  const now = new Date();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newTask = {
      time: formatTime(now),
      task: data.task,
    };
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.time === newTask.time);
    if (index !== -1) {
      newTasks[index] = newTask;
    } else {
      newTasks.push(newTask);
    }
    setTasks(newTasks);
    reset();
    console.log(tasks);
  };
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
  };

  const renderTasks = () => {
    const taskMap = new Map(tasks.map((task) => [task.time, task.task]));
    return [...Array(24)].map((_, i) => {
      const time = formatTime(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), i)
      );
      const task = taskMap.get(time);
      return (
        <div
          key={time}
          className="flex flex-col bg-gray-100 rounded-lg mb-2 p-2"
        >
          <div className="flex items-center border-b border-gray-200 mb-2">
            <span className="font-bold text-xl">{time}</span>
          </div>
          <div>
            {task ? task : <span className="text-gray-400">No task</span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center pt-10 w-full max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-5">
        Schedule for{' '}
        {now.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-5 w-full">
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mb-5"
          >
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter task here..."
                {...register('task')}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderTasks()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
