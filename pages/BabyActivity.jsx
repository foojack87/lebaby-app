import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useUser, useSetUser } from '@/context/UserContext';
import { useEffect } from 'react';

const BabyActivity = ({ users, userLoading }) => {
  if (userLoading) return <div>Loading...</div>;

  // Logic for activity data and date data

  const data = users.activity;
  const today = new Date(); // get the current date
  const todayISO = new Date().toISOString().substring(0, 10); // get today's date in ISO format
  console.log(todayISO);

  // logic for pump data

  const pumpsToday = data.filter(
    (item) =>
      item.title.includes('Pumped') &&
      new Date(item.start).toDateString() === today.toDateString()
  );
  console.log(pumpsToday);

  let totalPumpedMl = 0;
  for (let i = 0; i < pumpsToday.length; i++) {
    const pump = pumpsToday[i];
    const pumpMl = parseInt(pump.title.match(/\d+/)); // Extracts the number from the title
    totalPumpedMl += pumpMl;
  }

  // filter the data array to get only the items with the "poop" title that occurred on the current date
  const poopsToday = data.filter(
    (item) =>
      item.title.toLowerCase() === 'poop' &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(`Number of poops today: ${poopsToday.length}`);

  // Logic for calculating amount of times peed today
  const peesToday = data.filter(
    (item) =>
      item.title.toLowerCase() === 'pee' &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(peesToday);

  // to get activity data to be displayable in the calendar
  const userEvents = users.activity === undefined ? '' : users.activity;
  console.log(userEvents);
  const displayEvents =
    userEvents?.length > 1 ? userEvents?.flat(200) : userEvents;
  console.log(displayEvents);

  // handler for deleting an event
  const handleEventClick = async (clickInfo) => {
    const activityId = +clickInfo.event.id;

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      // fetch delete

      const response = await fetch(`/api/user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: users._id,
          activityId,
        }),
      });
      const reponseJson = await response.json();
      console.log(reponseJson);

      router.reload();
    }
  };

  return (
    <>
      <div className="lg:flex-row rounded-xl w-[22rem] h-[35rem] items-center justify-center mx-auto shadow-lg relative p-8">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-bold border-b-2 border-violet-500 text-center mb-8 uppercase">
          Totals for Today
        </h1>
        <div className="flex flex-col gap-6 justify-between h-[75%]">
          <p>Nap: </p>
          <p>Feedings: </p>
          <p>Bottle Fed:</p>
          <p>
            Number of poops:
            <span className="font-bold text-xl ml-4">
              {poopsToday.length > 0 ? poopsToday.length : 0}
            </span>
          </p>
          <p>
            Peed:
            <span className="font-bold text-xl ml-4">
              {peesToday.length > 0 ? peesToday.length : 0}
            </span>
          </p>
          <p>
            Pumped:{' '}
            <span className="font-bold text-xl ml-4">{totalPumpedMl}ml</span>
          </p>
        </div>
      </div>
      <div className="w-[45%]">
        <FullCalendar
          initialEvents={
            users.activity === undefined ? userEvents : displayEvents
          }
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventClick={handleEventClick}
        />
        <div className="">
          <p>* Click on an event to delete it.</p>
        </div>
      </div>
    </>
  );
};

export default BabyActivity;

export const getServerSideProps = withPageAuthRequired();
