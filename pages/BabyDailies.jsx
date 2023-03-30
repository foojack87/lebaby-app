import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import ActivityForm from '@/components/ActivityForm/ActivityForm';

const BabyDailies = ({ users, userLoading }) => {
  if (userLoading) return <div>Loading...</div>;

  let events = [];

  const event = users.activity;
  events.push(event);
  console.log(events);

  return (
    <>
      <ActivityForm users={users} events={events} />
      <div className="w-[45%]">
        <FullCalendar
          initialEvents={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridDay',
          }}
          initialView="timeGridDay"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
        />
      </div>
    </>
  );
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
