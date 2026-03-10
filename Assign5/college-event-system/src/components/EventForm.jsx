import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { ArrowLeft } from 'lucide-react';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useContext(EventContext);
  
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    club: '',
    date: '',
    time: '',
    venue: '',
    description: ''
  });

  useEffect(() => {
    if (isEditing) {
      const eventToEdit = events.find(e => e.id === parseInt(id));
      if (eventToEdit) {
        setFormData({
          name: eventToEdit.name,
          club: eventToEdit.club,
          date: eventToEdit.date,
          time: eventToEdit.time,
          venue: eventToEdit.venue,
          description: eventToEdit.description
        });
      }
    }
  }, [id, isEditing, events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateEvent(id, formData);
    } else {
      addEvent(formData);
    }
    navigate('/manage');
  };

  return (
    <div className="container fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="btn" 
        style={{marginBottom: '1.5rem', background: 'transparent', border: '1px solid var(--border)', padding: '0.5rem 1rem'}}
      >
        <ArrowLeft size={16} style={{marginRight: '0.5rem'}} /> Back
      </button>

      <div className="form-container" style={{maxWidth: '800px'}}>
        <h2 style={{marginBottom: '1.5rem'}}>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Event Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Organizing Club</label>
            <select 
              className="form-control" 
              name="club" 
              value={formData.club} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Club</option>
              <option value="ITERA">ITERA</option>
              <option value="CSI">CSI</option>
              <option value="TecFesta Committee">TecFesta Committee</option>
              <option value="Coding Club">Coding Club</option>
            </select>
          </div>

          <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <div className="form-group" style={{flex: 1, minWidth: '200px'}}>
              <label className="form-label">Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group" style={{flex: 1, minWidth: '200px'}}>
              <label className="form-label">Time</label>
              <input 
                type="time" 
                className="form-control" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Venue</label>
            <input 
              type="text" 
              className="form-control" 
              name="venue" 
              value={formData.venue} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
              required 
            />
          </div>

          <div style={{display: 'flex', gap: '1rem'}}>
            <button type="submit" className="btn btn-primary" style={{flex: 1, padding: '0.75rem', fontSize: '1rem'}}>
              {isEditing ? 'Save Changes' : 'Create Event'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/manage')} 
              style={{flex: 1, padding: '0.75rem', fontSize: '1rem', background: '#e5e7eb', color: '#374151'}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
