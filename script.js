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