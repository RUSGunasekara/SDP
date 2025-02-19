const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// API to login the user
router.post("/login", async (req, res) => {
    const { userType, username, password } = req.body;
    let table = userType === "learner" ? "Learner" : "Instructor";
    
    try {
        const [rows] = await db.query(`SELECT * FROM ?? WHERE username = ?`, [table, username]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            const token = jwt.sign({ userId: user.user_id, role: userType }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token, user });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;