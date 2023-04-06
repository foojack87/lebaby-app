import Datetime from 'react-datetime';
import moment from 'moment';
import { useState, useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';

const ActivityForm = ({ users, events }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [event, setEvent] = useState(events);
  const [inputDisabled, setInputDisabled] = useState(false);

  // get existing events through props.
  // pass the existing events + new event through PUT

  const titleChangeHandler = (title) => {
    setTitle(title.target.value);
  };
  const startChangeHandler = (date) => {
    setStart(moment(date).toDate());
  };
  const endChangeHandler = (date) => {
    setEnd(moment(date).toDate());
  };

  // useEffect(() => {
  //   setEvent(events);
  // }, [events]);

  console.log(event);

  const onSubmitActivity = async (e) => {
    e.preventDefault();

    const newEvent = [...event, { title, start, end, id: Date.now() }];

    setEvent(newEvent);

    console.log(event);

    // const newEvents =
    //   users.activity === undefined
    //     ? { title, start, end, id: Date.now() }
    //     : [users.activity, { title, start, end, id: Date.now() }];

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
            onChange={titleChangeHandler}
          />
        </div>
        <div>
          <label>Started</label>
          <Datetime value={start} onChange={startChangeHandler} />
        </div>
        <div>
          <label>Ended</label>
          <Datetime value={end} onChange={endChangeHandler} />
        </div>
        <button disabled={inputDisabled}>Add activity</button>
      </form>
    </div>
  );
};

export default ActivityForm;
