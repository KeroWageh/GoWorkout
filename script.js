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
        window.location.href = 'trainingprograms.html';
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