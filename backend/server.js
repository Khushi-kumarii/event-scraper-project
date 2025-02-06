const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL user
  password: 'root',  // replace with your MySQL password
  database: 'event_db'
});

// Route to get all events
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Route to save email for tickets
app.post('/api/tickets', (req, res) => {
  const { email, eventId } = req.body;

  db.query('INSERT INTO emails (email, event_id) VALUES (?, ?)', [email, eventId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving email');
    }
    res.json({ message: 'Email saved successfully' });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
