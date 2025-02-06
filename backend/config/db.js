const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

module.exports = db;
    