import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleGetTickets = (event) => {
        setSelectedEvent(event);  // Open modal with event details
    };

    const handleSubmitEmail = () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        axios.post("http://localhost:5000/api/subscribe", { email, event_id: selectedEvent.id, url: selectedEvent.url })
            .then(res => {
                window.location.href = selectedEvent.url;  // Redirect to ticket page
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Sydney Events</h1>
            {events.map(event => (
                <div key={event.id} className="border p-4 mb-4">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p>{event.date} | {event.venue}</p>
                    <p>{event.price}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 mt-2"
                        onClick={() => handleGetTickets(event)}
                    >
                        GET TICKETS
                    </button>
                </div>
            ))}

            {/* Email Opt-in Popup */}
            {selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Enter Your Email to Get Tickets</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-4"
                        />
                        <button
                            className="bg-green-500 text-white px-4 py-2"
                            onClick={handleSubmitEmail}
                        >
                            Submit & Get Tickets
                        </button>
                        <button
                            className="text-red-500 mt-2"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;
