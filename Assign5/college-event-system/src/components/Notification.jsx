import { useEffect } from 'react';
import { Bell } from 'lucide-react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="notification">
      <div style={{
        background: 'var(--primary)', 
        color: 'white', 
        borderRadius: '50%', 
        width: '32px', 
        height: '32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Bell size={16} />
      </div>
      <p style={{margin: 0, fontWeight: 500, color: 'var(--text-main)'}}>{message}</p>
      <button 
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          marginLeft: 'auto',
          fontSize: '1.25rem',
          lineHeight: 1
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
