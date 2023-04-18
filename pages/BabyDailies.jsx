import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ActivityForm from '@/components/ActivityForm/ActivityForm';
import NoBaby from '@/components/NoBaby/NoBaby';
import { ImSpinner3 } from 'react-icons/im';

const BabyDailies = ({ users, userLoading }) => {
  const router = useRouter();
  if (userLoading)
    return (
      <div className="w-[100%] h-[100%] flex justify-center text-6xl text-pink-500">
        <ImSpinner3 className="animate-spin" />
      </div>
    );

  if (!users.baby)
    return (
      <div className="w-[54rem] h-full ml-4">
        <NoBaby />
      </div>
    );

  const userEvents = users.activity === undefined ? '' : users.activity;
  console.log(userEvents);
  // const displayEvents =
  //   userEvents?.length > 1 ? userEvents?.flat(200) : userEvents;
  // console.log(displayEvents);

  const handleEventClick = async (clickInfo) => {
    const activityId = +clickInfo.event.id;
    console.log(typeof activityId);

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
      <ActivityForm
        users={users}
        events={userEvents}
        userLoading={userLoading}
      />
      <div className="w-[45%]">
        <FullCalendar
          initialEvents={userEvents}
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
        <div className="">
          <p>* Click on an event to delete it.</p>
        </div>
      </div>
    </>
  );
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
