const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Store user email before redirecting
router.post("/subscribe", (req, res) => {
    const { email, event_id, url } = req.body;

    db.query("INSERT INTO emails (email, event_id) VALUES (?, ?)", [email, event_id], (err) => {
        if (err) throw err;
        res.json({ success: true, redirect: url });
    });
});

module.exports = router;
