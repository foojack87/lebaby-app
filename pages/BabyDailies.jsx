import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ActivityForm from '@/components/ActivityForm/ActivityForm';
import ConfirmationModal from '@/components/Confirmation/ConfirmationModal';
import NoBaby from '@/components/NoBaby/NoBaby';
import { ImSpinner3 } from 'react-icons/im';
import { useState } from 'react';

const BabyDailies = ({ users, userLoading }) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [activityId, setActivityId] = useState(null);

  const router = useRouter();
  if (userLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <ImSpinner3 className="animate-spin text-6xl text-pink-500" />
      </div>
    );

  if (!users.baby) return <NoBaby />;

  const userEvents = users.activity === undefined ? '' : users.activity;

  const handleEventClick = async (clickInfo) => {
    const id = +clickInfo.event.id;
    setTitle('Delete Activity');
    setMessage(`Press 'Confirm' to delete`);
    setActivityId(id);
    setIsModalOpen(true);
  };

  const confirmHandler = async () => {
    setInputDisabled(false);
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

    setInputDisabled(true);
    setIsModalOpen(false);
    router.reload();
  };

  const cancelHandler = (props) => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ConfirmationModal
        title={title}
        message={message}
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <ActivityForm
        users={users}
        events={userEvents}
        userLoading={userLoading}
      />
      <div className="flex flex-col text-[0.8rem] gap-2 px-4 mt-4">
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
