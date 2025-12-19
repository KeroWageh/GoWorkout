const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GoWorkoutapkkb4",
    database: "users",
    port: 3306
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }
    console.log("Connected to MySQL ✅");
});

// Signup route
app.post("/signup", (req, res) => {
    const { firstName, secondName, username, password } = req.body;

    const sql = `
    INSERT INTO users (firstName, secondName, username, password)
    VALUES (?, ?, ?, ?)
  `;

    db.execute(sql, [firstName, secondName, username, password], (err) => {
        if (err) {
            res.status(500).json({ message: "Username already exists! Please try another username!" });
            return;
        }
        res.json({ message: "Signup successful!" });
    });
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password!" });
    }

    // Query the user in MySQL
    const sql = "SELECT * FROM users WHERE username = ?";
    db.execute(sql, [username], (err, results) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: err.sqlMessage || "Login failed!" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No account found with that username!" });
        }

        const user = results[0];

        // Compare text password
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password!" });
        }

        // Success
        res.json({ username: user.username, firstName: user.firstName, secondName: user.secondName });
    });
});

// Get user profile
app.get("/user/:username", (req, res) => {
    const username = req.params.username;

    const sql = "SELECT firstName, secondName, username FROM users WHERE username = ?";
    db.execute(sql, [username], (err, results) => {
        if (err) {
            console.error("Get user error:", err);
            return res.status(500).json({ message: err.sqlMessage || "Unable to load profile!" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json(results[0]);
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 ✅");
});