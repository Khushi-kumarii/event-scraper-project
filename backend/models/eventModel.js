const db = require("../config/db");

const EventModel = {
    getAllEvents: (callback) => {
        db.query("SELECT * FROM events ORDER BY date ASC", callback);
    },
    saveEmail: (email, event_id, callback) => {
        db.query("INSERT INTO emails (email, event_id) VALUES (?, ?)", [email, event_id], callback);
    },
};

module.exports = EventModel;
