import Datetime from 'react-datetime';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import 'react-datetime/css/react-datetime.css';

const ActivityForm = ({ onEventAdded, users }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const [inputDisabled, setInputDisabled] = useState(false);

  const onSubmitActivity = async (e) => {
    e.preventDefault();

    const event = {
      _id: users._id,
      activity: { title, start, end },
    };

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const responseJson = await response.json();
    console.log(responseJson);

    setInputDisabled(false);
  };

  return (
    <div className="flex flex-col lg:flex-row rounded-xl w-[20rem] h-[35rem] items-center justify-center mx-auto shadow-lg">
      <form
        onSubmit={onSubmitActivity}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col">
          <label>What happened?</label>
          <input
            required
            placeholder="Title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Started</label>
          <Datetime
            value={start}
            onChange={(date) => {
              setStart(moment(date).toDate());
            }}
          />
        </div>
        <div>
          <label>Ended</label>
          <Datetime
            value={end}
            onChange={(date) => {
              setEnd(moment(date).toDate());
            }}
          />
        </div>
        <button disabled={inputDisabled}>Add activity</button>
      </form>
    </div>
  );
};

export default ActivityForm;
