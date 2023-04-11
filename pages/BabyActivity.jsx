import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DailyTotals from '@/components/DailyTotals/DailyTotals';

const BabyActivity = ({ users, userLoading }) => {
  if (userLoading) return <div>Loading...</div>;

  // to get activity data to be displayable in the calendar
  const userEvents = users.activity === undefined ? '' : users.activity;
  console.log(userEvents);
  // const displayEvents = userEvents?.length > 1 ? userEvents : userEvents;
  // console.log(displayEvents);

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
      <DailyTotals users={users} />
      <div className="w-[45%]">
        <FullCalendar
          initialEvents={userEvents}
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
