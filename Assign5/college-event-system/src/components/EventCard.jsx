import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const EventCard = ({ event }) => {
  const { deleteEvent } = useContext(EventContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
    }
  };
  return (
    <div className="card">
      <div style={{ flex: 1 }}>
        <div className="event-card-content">
          {/* New College Branding Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            <img src="/sanjivani.jpg" alt="Sanjivani Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.2' }}>
                Sanjivani College of Engineering,
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Kopargaon
              </div>
            </div>
          </div>

          <div className="event-category">{event.club}</div>
          <h3 className="event-title">{event.name}</h3>
          
          <div className="event-meta">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
          
          <div className="event-meta">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          
          <div className="event-meta">
            <MapPin size={16} />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>
      
      <div className="event-card-footer">
        <Link to={`/event/${event.id}`} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>
          View Details
        </Link>
        <div className="actions">
          <Link to={`/manage/edit/${event.id}`} className="btn btn-secondary" style={{ padding: '0.5rem', background: '#3B82F6' }}>
            <Edit size={16} />
          </Link>
          <button onClick={handleDelete} className="btn btn-secondary" style={{ padding: '0.5rem', background: '#EF4444' }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
