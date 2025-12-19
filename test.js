global.document = {
  getElementById: () => null,
  querySelector: () => null,
  addEventListener: () => {},
};
global.alert = (msg) => console.log('ALERT:', msg);

const { showProgram, calculateCalories, programs } = require('./script.js');

const elements = {
  result: { style: {}, innerHTML: '' },
  weight: { value: '' },
  height: { value: '' },
  age: { value: '' },
  gender: { value: '' },
  goal: { value: '' },
};

global.document = {
  getElementById: (id) => elements[id] || null,
};

global.alert = (msg) => console.log('ALERT:', msg);


function testShowProgram() {
  console.log('=== showProgram("beginner") ===');
  showProgram('beginner');
  console.log(elements.result.innerHTML);
  console.log('===============================');
  console.log('=== showProgram("advanced") ===');
  showProgram('advanced');
  console.log(elements.result.innerHTML);
  console.log('===============================');
}

function setCalorieInputs({ weight, height, age, gender, goal }) {
  elements.weight.value = String(weight);
  elements.height.value = String(height);
  elements.age.value = String(age);
  elements.gender.value = gender;
  elements.goal.value = goal;
}

function testCalculateCalories() {
  console.log('=== calculateCalories valid male maintain ===');
  setCalorieInputs({ weight: 70, height: 175, age: 25, gender: 'male', goal: 'maintain' });
  calculateCalories();
  console.log(elements.result.innerHTML);
  console.log('===============================');

  console.log('=== calculateCalories female lose ===');
  setCalorieInputs({ weight: 60, height: 165, age: 30, gender: 'female', goal: 'lose' });
  calculateCalories();
  console.log(elements.result.innerHTML);
  console.log('===============================');

  console.log('=== calculateCalories missing field (alert) ===');
  setCalorieInputs({ weight: '', height: 175, age: 25, gender: 'male', goal: 'maintain' });
  calculateCalories();
  console.log('===============================');
}

// run tests
testShowProgram();
testCalculateCalories();