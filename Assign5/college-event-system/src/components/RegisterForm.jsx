import { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';

const RegisterForm = ({ eventName, eventId }) => {
  const { addRegistration } = useContext(EventContext);
  
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save registration with context
    addRegistration(eventId, formData);
    
    // Simulate API call for UI feeling
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        rollNumber: '',
        email: '',
        phone: ''
      });
    }, 500);
  };

  if (submitted) {
    return (
      <div className="success-message fade-in">
        <svg fill="currentColor" viewBox="0 0 20 20" style={{width: '24px', height: '24px'}}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <div>
          <h3 style={{color: 'inherit'}}>Registration Successful!</h3>
          <p style={{color: '#046C4E', fontSize: '0.875rem', marginTop: '0.25rem'}}>
            You have successfully registered for {eventName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container fade-in">
      <h2 style={{marginBottom: '1.5rem'}}>Register for {eventName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Student Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="rollNumber">Roll Number</label>
          <input
            className="form-control"
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            placeholder="e.g. 2023IT101"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email ID</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="1234567890"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}>
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
