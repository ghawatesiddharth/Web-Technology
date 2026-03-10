import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import EventList from '../components/EventList';
import Notification from '../components/Notification';
import { EventContext } from '../context/EventContext';

const Home = () => {
  const { events } = useContext(EventContext);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Show a notification for the most recent event when the homepage loads
    if (events && events.length > 0) {
      const latestEvent = events[events.length - 1]; // Get the newest event
      
      const timer = setTimeout(() => {
        setNotification(`New Event Added: ${latestEvent.name} by ${latestEvent.club}!`);
        
        // Auto hide notification
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [events]);

  return (
    <div className="fade-in">
      <div className="container">
        {/* College Details Section */}
        <section className="hero">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <img src="/sanjivani.jpg" alt="Sanjivani Logo" style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '8px' }} />
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ marginBottom: '0.25rem' }}>Sanjivani College of Engineering, Kopargaon</h1>
              <p className="hero-subtitle" style={{ margin: 0 }}>Department: Information Technology</p>
            </div>
          </div>
          
          <div style={{marginTop: '1.5rem'}}>
            <p style={{marginBottom: '0.75rem', fontWeight: 500}}>Explore Our Clubs:</p>
            <div className="clubs-badges">
              <span className="badge">ITERA</span>
              <span className="badge">CSI</span>
              <span className="badge">TecFesta Committee</span>
              <span className="badge">Coding Club</span>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <h2>Upcoming Events</h2>
              <div className="badge" style={{background: 'var(--primary)', color: 'white', border: 'none'}}>
                {events.length} Events
              </div>
            </div>
            <Link to="/manage/create" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontWeight: 600 }}>
              <Plus size={18} style={{marginRight: '0.5rem'}} /> Add New Event
            </Link>
          </div>
          
          <EventList events={events} />
        </section>
      </div>

      {/* Notification Component */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 50 }}>
        <Notification message={notification} onClose={() => setNotification(null)} />
      </div>
    </div>
  );
};

export default Home;
