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

  // fix this.

  const userEvents = users.activity === undefined ? '' : users.activity;
  console.log(userEvents);
  const displayEvents =
    userEvents?.length > 1 ? userEvents?.flat(200) : [userEvents];
  console.log(displayEvents);

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      console.log(clickInfo.event.id);
    }
  };

  return (
    <>
      <ActivityForm
        users={users}
        events={userEvents}
        userLoading={userLoading}
      />
      <div className="w-[45%]">
        <FullCalendar
          initialEvents={
            users.activity === undefined ? userEvents : displayEvents
          }
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
          eventClick={handleEventClick}
        />
      </div>
    </>
  );
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
