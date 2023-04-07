import Datetime from 'react-datetime';
import moment from 'moment';
import { useState, useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';

const ActivityForm = ({ users, events }) => {
  const [title, setTitle] = useState('');
  const [activityType, setActivityType] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [event, setEvent] = useState(events);
  const [inputDisabled, setInputDisabled] = useState(false);

  // get existing events through props.
  // pass the existing events + new event through PUT

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
    setTitle('Breast Fed');
    console.log(activityType);
  };

  const changeBottleFeed = (props) => {
    setActivityType('bottleFeed');
    setTitle('');
    console.log(activityType);
  };

  const changeNap = (props) => {
    setActivityType('nap');
    setTitle('Nap');
    console.log(activityType);
  };

  const changePoop = (props) => {
    setActivityType('poop');
    setTitle('Poop');
    console.log(activityType);
  };

  const changePee = (props) => {
    setActivityType('pee');
    setTitle('Pee');
    console.log(activityType);
  };

  const bottleFeed = (
    <div className="flex flex-col">
      <label>Bottle Fed Amount</label>
      <input
        required
        placeholder="ie. 150mL"
        type="number"
        id="title"
        value={title}
        onChange={titleChangeHandler}
      />
    </div>
  );

  const breastFeed = (
    <div className="flex flex-col">
      <label>Activity Type</label>
      <input
        placeholder="Breast Fed"
        type="text"
        id="title"
        value={title}
        disabled
      />
    </div>
  );

  const nap = (
    <div className="flex flex-col">
      <label>Activity Type</label>
      <input placeholder="Nap" type="text" id="title" value={title} disabled />
    </div>
  );
  const poop = (
    <div className="flex flex-col">
      <label>Activity Type</label>
      <input
        placeholder="Pooped"
        type="text"
        id="title"
        value={title}
        disabled
      />
    </div>
  );
  const pee = (
    <div className="flex flex-col">
      <label>Activity Type</label>
      <input placeholder="Peed" type="text" id="title" value={title} disabled />
    </div>
  );

  console.log(event);

  const onSubmitActivity = async (e) => {
    e.preventDefault();

    let newEvent = '';

    activityType === 'bottleFeed'
      ? (newEvent = [
          ...event,
          { title: `Bottle fed - ${title}ml`, start, end, id: Date.now() },
        ])
      : (newEvent = [...event, { title, start, end, id: Date.now() }]);

    setEvent(newEvent);

    console.log(event);

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
    console.log(responseJson);

    setInputDisabled(false);
  };

  return (
    <div className="flex flex-col lg:flex-row rounded-xl w-[22rem] h-[35rem] items-center justify-center mx-auto shadow-lg relative">
      <h1 className="absolute left-[center] top-[10%] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-bold border-b-2 border-violet-500">
        What did {users.baby.firstName} just do?
      </h1>
      <div className="flex flex-col gap-8 mr-6">
        <button
          className={`shadow-lg rounded-xl py-0.5 px-2 ${
            activityType === 'breastFeed'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-800'
          }`}
          onClick={changeBreastFeed}
        >
          Breast Feed
        </button>
        <button
          className={`shadow-lg rounded-xl py-0.5 px-2 ${
            activityType === 'bottleFeed'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-800'
          }`}
          onClick={changeBottleFeed}
        >
          Bottle Feed
        </button>
        <button
          className={`shadow-lg rounded-xl py-0.5 px-2 ${
            activityType === 'poop'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-800'
          }`}
          onClick={changePoop}
        >
          Poop
        </button>
        <button
          className={`shadow-lg rounded-xl py-0.5 px-2 ${
            activityType === 'pee'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-800'
          }`}
          onClick={changePee}
        >
          Pee
        </button>
        <button
          className={`shadow-lg rounded-xl py-0.5 px-2 ${
            activityType === 'nap'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-800'
          }`}
          onClick={changeNap}
        >
          Nap
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
        <div>
          <label>Started</label>
          <Datetime value={start} onChange={startChangeHandler} />
        </div>
        <div>
          <label>Ended</label>
          <Datetime value={end} onChange={endChangeHandler} />
        </div>
        <button
          className="shadow-lg rounded-xl py-0.5 px-1.5 border bg-purple-500 text-center text-white"
          disabled={inputDisabled}
        >
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
