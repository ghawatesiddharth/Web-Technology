import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Building, ArrowLeft } from 'lucide-react';
import { EventContext } from '../context/EventContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useContext(EventContext);
  
  // Find the event by ID
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="container" style={{textAlign: 'center', marginTop: '3rem'}}>
        <h2>Event not found</h2>
        <Link to="/" className="btn btn-primary" style={{marginTop: '1rem'}}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="btn" 
        style={{marginBottom: '1.5rem', background: 'transparent', border: '1px solid var(--border)', padding: '0.5rem 1rem'}}
      >
        <ArrowLeft size={16} style={{marginRight: '0.5rem'}} /> Back
      </button>

      <div className="event-details-layout">
        <div className="details-main">
          <div className="event-category">{event.club}</div>
          <h1 style={{marginBottom: '1.5rem', fontSize: '2.5rem'}}>{event.name}</h1>
          
          <div style={{marginBottom: '2rem'}}>
            <h3 style={{marginBottom: '1rem'}}>About the Event</h3>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8'}}>{event.description}</p>
          </div>
        </div>

        <div className="details-sidebar">
          <h3 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Event Details</h3>
          
          <div className="details-meta-item">
            <Building className="details-meta-icon" size={20} />
            <div>
              <div style={{fontWeight: 500}}>Organized by</div>
              <div style={{color: 'var(--text-muted)'}}>{event.club}</div>
            </div>
          </div>
          
          <div className="details-meta-item">
            <Calendar className="details-meta-icon" size={20} />
            <div>
              <div style={{fontWeight: 500}}>Date</div>
              <div style={{color: 'var(--text-muted)'}}>{event.date}</div>
            </div>
          </div>
          
          <div className="details-meta-item">
            <Clock className="details-meta-icon" size={20} />
            <div>
              <div style={{fontWeight: 500}}>Time</div>
              <div style={{color: 'var(--text-muted)'}}>{event.time}</div>
            </div>
          </div>
          
          <div className="details-meta-item">
            <MapPin className="details-meta-icon" size={20} />
            <div>
              <div style={{fontWeight: 500}}>Venue</div>
              <div style={{color: 'var(--text-muted)'}}>{event.venue}</div>
            </div>
          </div>

          <div style={{marginTop: '2rem'}}>
            <Link 
              to={`/register/${event.id}`} 
              className="btn btn-primary" 
              style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
