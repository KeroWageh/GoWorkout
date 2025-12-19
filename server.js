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







// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 ✅");
});