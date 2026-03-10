import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';
import ManageEvents from './pages/ManageEvents';
import EventForm from './components/EventForm';
import Registrations from './pages/Registrations';
import { EventContext, EventProvider } from './context/EventContext';
import './App.css';

function App() {
  return (
    <EventProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/register/:id" element={<Register />} />
              <Route path="/manage" element={<ManageEvents />} />
              <Route path="/manage/create" element={<EventForm />} />
              <Route path="/manage/edit/:id" element={<EventForm />} />
              <Route path="/manage/registrations/:id" element={<Registrations />} />
            </Routes>
          </main>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
