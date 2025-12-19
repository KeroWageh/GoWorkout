// Program details in the training programs page
const programs = {
    beginner: {
        name: "Beginner Program:",
        workouts: [
            "Day 1: Full Body Basics",
            "- Bodyweight Squats: 3x8",
            "- Push-ups: 3x8",
            "- Walking Lunges: 3x8",
            "- Plank: 3x10s",
            "",
            "Day 2: Rest",
            "",
            "Day 3: Strength Foundations",
            "- Glute Bridges: 3x8",
            "- Wall Push-ups: 3x8",
            "- Bird Dogs: 3x8",
            "- Superman Holds: 3x10s"
        ]
    },
    intermediate: {
        name: "Intermediate Program:",
        workouts: [
            "Day 1: Upper Body",
            "- Push-ups: 4x10",
            "- Dumbbell Rows: 4x10",
            "- Shoulder Press: 4x10",
            "- Tricep Dips: 4x10",
            "",
            "Day 2: Lower Body",
            "- Squats: 4x10",
            "- Lunges: 4x10",
            "- Calf Raises: 4x10",
            "",
            "Day 3: Cardio",
            "- Planks: 4x30s",
            "- Mountain Climbers: 4x30s",
            "- Bicycle Crunches: 4x30s",
            "",
            "Day 4: Rest",
            ""
        ]
    },
    advanced: {
        name: "Advanced Program:",
        workouts: [
            "Day 1: Push",
            "- Bench Press: 5x12",
            "- Military Press: 5x12",
            "- Dips: 5x12",
            "",
            "Day 2: Pull",
            "- Pull-ups: 5xMax",
            "- Barbell Rows: 5x12",
            "- Face Pulls: 5x12",
            "",
            "Day 3: Legs",
            "- Squats: 5x12",
            "- Deadlifts: 5x12",
            "- Lunges: 5x12",
            "",
            "Day 4: Rest",
            ""
        ]
    }
};

// How it will show the program details
function showProgram(level) {
    const program = programs[level];
    if (!program) return;

    const result = document.getElementById('result');
    if (!result) return;
    result.style.display = 'block';
    result.innerHTML = `
        <h3>${program.name}</h3>
        <pre>${program.workouts.join('\n')}</pre>
    `;
}

// Navigate to programs if logged in, otherwise needs log in
function goToPrograms() {
    if (isLoggedIn()) {
        window.location.href = 'trainingpro.html';
    } else {
        alert('Please login to view programs!');
        window.location.href = 'login.html';
    }
}

// Calculate daily calories using BMR and goal
function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value;
    const goal = document.getElementById('goal').value;

    // Basic check
    if (!weight || !height || !age) {
        alert('Please fill in all fields!');
        return;
    }

    // Positive number validation
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        alert('Please enter positive numbers for weight, height and age');
        return;
    }

    let bmr = gender === 'male'
        ? (10 * weight + 6.25 * height - 5 * age + 5)
        : (10 * weight + 6.25 * height - 5 * age - 161);

    let calories = bmr * 1.55;
    switch (goal) {
        case 'lose': calories -= 500; break;
        case 'gain': calories += 500; break;
    }

    const result = document.getElementById('result');
    result.style.display = 'block';
    result.innerHTML = `Your daily calorie target: ${Math.round(calories)} calories`;
}

// Set the current logged in username
function setCurrentUser(username) {
    localStorage.setItem('gw_currentUser', username);
}

// Get the current logged in username
function getCurrentUser() {
    return localStorage.getItem('gw_currentUser');
}

// Check if the user is logged in or not
function isLoggedIn() {
    return !!getCurrentUser();
}

// Clear current session and go home
function logout() {
    localStorage.removeItem('gw_currentUser');
    window.location.href = 'index.html';
}

// Signup with first name, second name, username, password
async function signup(event) {
    event.preventDefault();

    const data = {
        firstName: document.getElementById("firstName").value.trim(),
        secondName: document.getElementById("secondName").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    };

    if (!data.firstName || !data.secondName || !data.username || !data.password) {
        alert("Please fill in all fields!");
        return;
    }

    // Enforce minimum and maximum password length for security
    if (data.password.length >= 6 || data.password.length <= 20) {
        alert('Password must be from 6 to 20 characters!');
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        if (res.ok) {
            window.location.href = "login.html";
        }
    } catch (err) {
        alert("Server error. Please try again.");
    }
}

// Login with username + password
async function login(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    };

    if (!data.username || !data.password) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message);
            return;
        }

        setCurrentUser(result.username);
        alert("Login successful!");
        window.location.href = "trainingpro.html";

    } catch (err) {
        alert("Server error. Please try again.");
    }
}

// Initialize profile page with user details
async function initProfile() {
    const username = getCurrentUser();
    if (!username) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/user/${username}`);
        const user = await res.json();

        const info = document.getElementById("profileInfo");
        info.innerHTML = `
            <p><strong>First Name:</strong> ${user.firstName}</p>
            <p><strong>Second Name:</strong> ${user.secondName}</p>
            <p><strong>Username:</strong> ${user.username}</p>
        `;
    } catch {
        alert("Unable to load profile");
    }
}

// Header navigation (Home, Login, Profile)
function updateNav() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    nav.innerHTML = isLoggedIn()
        ? `<a href="index.html">Home</a>
           <a href="profile.html">Profile</a>`
        : `<a href="index.html">Home</a>
           <a href="login.html">Login</a>`;
}

// Initialize header navigation when the page is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    try { updateNav(); } catch (e) { /* ignore */ }
  });
}

if (typeof module !== 'undefined') {
  module.exports = { showProgram, calculateCalories, programs };
}