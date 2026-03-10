import EventCard from './EventCard';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No upcoming events found.</p>;
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
