import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/sanjivani.jpg" alt="Sanjivani Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }} />
          <span>Sanjivani EventHub</span>
        </Link>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/manage" 
            className={`nav-link ${location.pathname.startsWith('/manage') ? 'active' : ''}`}
          >
            Manage Events
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
