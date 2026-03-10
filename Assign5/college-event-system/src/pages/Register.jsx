import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';
import { EventContext } from '../context/EventContext';

const Register = () => {
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
    <div className="container">
      <button 
        onClick={() => navigate(-1)} 
        className="btn" 
        style={{marginBottom: '1.5rem', background: 'transparent', border: '1px solid var(--border)', padding: '0.5rem 1rem'}}
      >
        <ArrowLeft size={16} style={{marginRight: '0.5rem'}} /> Back
      </button>
      
      <RegisterForm eventName={event.name} eventId={event.id} />
    </div>
  );
};

export default Register;
