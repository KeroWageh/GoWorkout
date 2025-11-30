// Program details in the Training Programs page
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

// how it will Show the program details
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

// Login with username + password
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields!');
        return;
    }

    const user = findUser(username);
    if (!user) {
        alert('No account found with that username! Please sign up first.');
        return;
    }

    if (user.password !== password) {
        alert('Invalid username or password.');
        return;
    }

    setCurrentUser(username);
    alert('Login successful!');
    window.location.href = 'trainingprograms.html';
}

// Signup with first name, second name, username, password
function signup(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const secondName = document.getElementById('secondName').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!firstName || !secondName || !username || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // Enforce minimum password length of 6 characters
    if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
    }

    if (findUser(username)) {
        alert('Username already exists! Please choose another username.');
        return;
    }

    addUser({ firstName, secondName, username, password });
    alert('Sign up successful! Please log in with your username.');
    window.location.href = 'login.html';
}

// Initialize profile page with user details
function initProfile() {
    const current = getCurrentUser();
    if (!current) {
        alert('You must be logged in to view your profile!');
        window.location.href = 'login.html';
        return;
    }
    const user = findUser(current);
    if (!user) {
        alert('User not found!');
        window.location.href = 'login.html';
        return;
    }

    const info = document.getElementById('profileInfo');
    if (info) {
        info.innerHTML = `
            <p><strong>First Name:</strong> ${user.firstName}</p>
            <p><strong>Second Name:</strong> ${user.secondName}</p>
            <p><strong>Username:</strong> ${user.username}</p>
        `;
    }

    updateNav();
}

// Clear current session and go home
function logout() {
    localStorage.removeItem('gw_currentUser');
    window.location.href = 'index.html';
}

// Save the array of users to localStorage
function saveUsers(users) {
    localStorage.setItem('gw_users', JSON.stringify(users));
}

// Retrieve the array of users from localStorage
function getUsers() {
    const data = localStorage.getItem('gw_users');
    return data ? JSON.parse(data) : [];
}

// Add a new user and save to the list
function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

// Find a user by username (returns user or null)
function findUser(username) {
    if (!username) return null;
    return getUsers().find(u => u.username === username);
}

// Set the current logged in username
function setCurrentUser(username) {
    localStorage.setItem('gw_currentUser', username);
}

// Get the current logged in username (or null)
function getCurrentUser() {
    return localStorage.getItem('gw_currentUser');
}

// Check if the user is logged in or not
function isLoggedIn() {
    return !!getCurrentUser();
}

// Update header navigation (Home, Login, Profile)
function updateNav() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    if (isLoggedIn()) {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="profile.html" id="nav-profile">Profile</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="login.html">Login</a>
        `;
    }
}

// Initialize header navigation when the page is ready
document.addEventListener('DOMContentLoaded', function () {
    try { updateNav(); } catch (e) { /* ignore */ }
});
