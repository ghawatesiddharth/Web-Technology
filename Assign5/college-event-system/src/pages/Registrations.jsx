import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { ArrowLeft, Users } from 'lucide-react';

const Registrations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registrations } = useContext(EventContext);
  
  const event = events.find((e) => e.id === parseInt(id));
  const eventRegistrations = registrations.filter((r) => r.eventId === parseInt(id));

  if (!event) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>Event not found</h2>
        <Link to="/manage" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Manage Events</Link>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn" 
          style={{ background: 'transparent', border: '1px solid var(--border)', padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Registrations for: {event.name}</h2>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>Organized by {event.club}</p>
      </div>

      {eventRegistrations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>No students registered yet!</p>
          <p style={{ color: 'var(--text-muted)' }}>Share this event link to get people to sign up.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Roll Number</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {eventRegistrations.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{student.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge" style={{ background: '#E0F2FE', color: '#0284C7', borderColor: '#BAE6FD' }}>
                      {student.rollNumber}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{student.email}</td>
                  <td style={{ padding: '1rem' }}>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '1rem', background: '#F8FAFC', borderTop: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Total Registrations: <strong>{eventRegistrations.length}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registrations;
