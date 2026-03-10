import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { Edit, Trash2, Plus, Users } from 'lucide-react';

const ManageEvents = () => {
  const { events, deleteEvent } = useContext(EventContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      deleteEvent(id);
    }
  };

  return (
    <div className="container fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>Manage Committee Events</h2>
        <Link to="/manage/create" className="btn btn-primary">
          <Plus size={18} style={{marginRight: '0.5rem'}} /> Add New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)'}}>
          <p style={{marginBottom: '1rem'}}>No events found. Start by adding one!</p>
          <Link to="/manage/create" className="btn btn-primary">Create Event</Link>
        </div>
      ) : (
        <div style={{background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{background: '#f8fafc', borderBottom: '1px solid var(--border)'}}>
                <th style={{padding: '1rem', color: 'var(--text-muted)', fontWeight: 600}}>Event Date</th>
                <th style={{padding: '1rem', color: 'var(--text-muted)', fontWeight: 600}}>Event Name</th>
                <th style={{padding: '1rem', color: 'var(--text-muted)', fontWeight: 600}}>Organizing Club</th>
                <th style={{padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} style={{borderBottom: '1px solid var(--border)'}}>
                  <td style={{padding: '1rem'}}>{event.date}</td>
                  <td style={{padding: '1rem', fontWeight: 500}}>{event.name}</td>
                  <td style={{padding: '1rem'}}>
                    <span className="badge">{event.club}</span>
                  </td>
                  <td style={{padding: '1rem', textAlign: 'right'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
                      <Link 
                        to={`/manage/registrations/${event.id}`} 
                        className="btn btn-secondary" 
                        style={{padding: '0.4rem 0.75rem', background: '#10B981'}}
                        title="View Registrations"
                      >
                        <Users size={16} />
                      </Link>
                      <Link 
                        to={`/manage/edit/${event.id}`} 
                        className="btn btn-secondary" 
                        style={{padding: '0.4rem 0.75rem'}}
                        title="Edit Event"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(event.id)} 
                        className="btn btn-secondary" 
                        style={{background: '#EF4444', padding: '0.4rem 0.75rem'}}
                        title="Delete Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
