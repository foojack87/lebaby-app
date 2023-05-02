import Datetime from 'react-datetime';
import moment from 'moment';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner3 } from 'react-icons/im';
import 'react-datetime/css/react-datetime.css';

const ActivityForm = ({ users, events, userLoading }) => {
  const [title, setTitle] = useState('Breast fed');
  const [activityType, setActivityType] = useState('breastFeed');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [event, setEvent] = useState(events);
  const [inputDisabled, setInputDisabled] = useState(false);

  const router = useRouter();

  // Loading spinner

  if (userLoading) return <div>Loading...</div>;

  const spinner = inputDisabled && (
    <div className="w-[100%] h-[100%] flex justify-center text-xl text-white">
      <ImSpinner3 className="animate-spin" />
    </div>
  );

  // Getting form input data and setting activity state

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const startChangeHandler = (date) => {
    setStart(moment(date).toDate());
  };
  const endChangeHandler = (date) => {
    setEnd(moment(date).toDate());
  };

  const changeBreastFeed = (props) => {
    setActivityType('breastFeed');
    setTitle('Breast fed');
  };

  const changeBottleFeed = (props) => {
    setActivityType('bottleFeed');
    setTitle('');
  };

  const changeNap = (props) => {
    setActivityType('nap');
    setTitle('Nap');
  };

  const changePoop = (props) => {
    setActivityType('poop');
    setTitle('Poop');
  };

  const changePee = (props) => {
    setActivityType('pee');
    setTitle('Pee');
  };

  const changeBreastPump = (props) => {
    setActivityType('breastPump');
    setTitle('');
  };

  // Rendered different elements

  const bottleFeed = (
    <div className="flex flex-col">
      <label htmlFor="bottled" className="text-gray-600 font-medium mb-1">
        Bottle Fed Amount
      </label>
      <input
        required
        className="border w-[8rem] border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        placeholder="ie. 150mL"
        type="number"
        id="bottled"
        value={title}
        onChange={titleChangeHandler}
      />
    </div>
  );

  const breastFeed = (
    <div className="hidden flex-col">
      <label htmlFor="breastfed" className="text-gray-600 font-medium mb-1">
        Activity Type
      </label>
      <input
        className="border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        placeholder="Breast fed"
        type="text"
        id="breastfed"
        value={title}
        disabled
      />
    </div>
  );

  const nap = (
    <div className="hidden flex-col">
      <label htmlFor="nap" className="text-gray-600 font-medium mb-1">
        Activity Type
      </label>
      <input
        className="border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        placeholder="Nap"
        type="text"
        id="nap"
        value={title}
        disabled
      />
    </div>
  );

  const poop = (
    <div className="hidden flex-col">
      <label htmlFor="poop" className="text-gray-600 font-medium mb-1">
        Activity Type
      </label>
      <input
        className="border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        placeholder="Pooped"
        type="text"
        id="poop"
        value={title}
        disabled
      />
    </div>
  );

  const pee = (
    <div className="hidden flex-col">
      <label htmlFor="pee" className="text-gray-600 font-medium mb-1">
        Activity Type
      </label>
      <input
        className="border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        placeholder="Peed"
        type="text"
        id="pee"
        value={title}
        disabled
      />
    </div>
  );

  const breastPump = (
    <div className="flex-col flex">
      <label htmlFor="pumped" className="text-gray-600 font-medium mb-1">
        Pumped Amount
      </label>
      <input
        required
        className={`border w-[8rem] border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
        placeholder="ie. 150mL"
        type="number"
        id="pumped"
        value={title}
        onChange={titleChangeHandler}
      />
    </div>
  );

  // Form submit

  const onSubmitActivity = async (e) => {
    e.preventDefault();

    let newEvent = '';

    // find out what the activity state is
    if (activityType === 'bottleFeed') {
      newEvent = [
        ...event,
        { title: `Bottle fed - ${title}ml`, start, end, id: Date.now() },
      ];
    } else if (activityType === 'breastPump') {
      newEvent = [
        ...event,
        { title: `Pumped - ${title}ml`, start, end, id: Date.now() },
      ];
    } else {
      newEvent = [...event, { title, start, end, id: Date.now() }];
    }

    setEvent(newEvent);

    // Post form data to database

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: users._id,
        activity: newEvent,
      }),
    });

    const responseJson = response.json();

    setInputDisabled(false);
    router.reload();
  };

  return (
    <div className="flex flex-grow px-4 place-self-center">
      <div className="flex flex-col flex-grow lg:flex-row rounded-xl items-center justify-center mx-auto shadow-lg relative p-6">
        <div className="flex flex-col gap-4 mb-2 lg:mr-6">
          <h1 className="mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-bold border-b-2 border-violet-500">
            Record An Activity
          </h1>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'breastFeed'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changeBreastFeed}
          >
            Breast Feed
          </button>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'bottleFeed'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changeBottleFeed}
          >
            Bottle Feed
          </button>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'poop'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changePoop}
          >
            Poop
          </button>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'pee'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changePee}
          >
            Pee
          </button>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'nap'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changeNap}
          >
            Nap
          </button>
          <button
            className={`shadow-md rounded py-0.5 px-2 ${
              activityType === 'breastPump'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800'
            }`}
            onClick={changeBreastPump}
          >
            Breast Pump
          </button>
        </div>
        <form
          onSubmit={onSubmitActivity}
          className="flex flex-col items-center gap-6"
        >
          {activityType === 'bottleFeed' && bottleFeed}
          {activityType === 'breastFeed' && breastFeed}
          {activityType === 'poop' && poop}
          {activityType === 'pee' && pee}
          {activityType === 'nap' && nap}
          {activityType === 'breastPump' && breastPump}
          <div>
            <label htmlFor="start" className="text-gray-700">
              Started
            </label>
            <Datetime
              id="start"
              value={start}
              onChange={startChangeHandler}
              className="text-sm border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </div>
          <div>
            <label htmlFor="end" className="text-gray-700">
              Ended
            </label>
            <Datetime
              id="end"
              value={end}
              onChange={endChangeHandler}
              className="text-sm border border-gray-400 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </div>
          <button
            className="shadow-lg w-[9rem] h-[3rem] rounded-xl border bg-purple-500 text-center text-white px-6 py-3"
            disabled={inputDisabled}
          >
            {inputDisabled ? spinner : 'Add Activity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
