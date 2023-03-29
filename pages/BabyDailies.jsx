import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import ActivityForm from '@/components/ActivityForm/ActivityForm';

const BabyDailies = ({ user }) => {
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();

    calendarApi.addEvent(event);
  };

  async function handleAddEvent(data) {}

  return (
    <>
      <ActivityForm onEventAdded={(event) => onEventAdded(event)} />
      <div className="w-[45%]">
        <FullCalendar
          ref={calendarRef}
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
          eventAdd={(event) => handleAddEvent(event)}
        />
      </div>
    </>
  );
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
