import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    if (selectedEvent && email) {
      axios.post('http://localhost:5000/api/tickets', {
        email,
        eventId: selectedEvent
      })
        .then(() => {
          alert('Email submitted! You will be redirected to the event page.');
          window.location.href = events.find((e) => e.id === selectedEvent).url;
        })
        .catch((error) => {
          console.error('Error submitting email:', error);
        });
    }
  };

  return (
    <div className="App">
      <h1>Sydney Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date} | {event.venue}</p>
            <button onClick={() => setSelectedEvent(event.id)}>Get Tickets</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <div>
          <h3>Enter your email for tickets</h3>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
