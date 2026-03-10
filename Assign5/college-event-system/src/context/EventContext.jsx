import React, { createContext, useState, useEffect } from 'react';
import { eventsData } from '../data/events';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('collegeEvents');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return eventsData;
  });

  const [registrations, setRegistrations] = useState(() => {
    const savedReqs = localStorage.getItem('collegeRegistrations');
    if (savedReqs) {
      return JSON.parse(savedReqs);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('collegeEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('collegeRegistrations', JSON.stringify(registrations));
  }, [registrations]);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now() }]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents((prev) => prev.map((event) => (event.id === parseInt(id) ? { ...event, ...updatedEvent, id: parseInt(id) } : event)));
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== parseInt(id)));
  };

  const addRegistration = (eventId, studentDetails) => {
    setRegistrations((prev) => [
      ...prev,
      { ...studentDetails, eventId: parseInt(eventId), id: Date.now() }
    ]);
  };

  return (
    <EventContext.Provider value={{ events, registrations, addEvent, updateEvent, deleteEvent, addRegistration }}>
      {children}
    </EventContext.Provider>
  );
};
