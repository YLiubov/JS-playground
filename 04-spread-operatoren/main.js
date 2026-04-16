// Task 1: Add numbers to a new array
const numbers = [1, 2, 3];

// Create a new array with all values from numbers plus 4 and 5
const moreNumbers = [...numbers, 4, 5];

console.log("Task 1 - numbers:", numbers);
console.log("Task 1 - moreNumbers:", moreNumbers);

// ----------------------------------

// Task 2: Copy an array
const original = ["Anna", "Mads", "Lea"];

// Create a copy using spread operator
const copy = [...original];

// Change only the copy
copy.push("Peter");

console.log("Task 2 - original:", original);
console.log("Task 2 - copy:", copy);

// =========================
// PART 2 - SPREAD WITH OBJECTS
// =========================

// Task 3: Update an object
const student = { name: "Anna", age: 25 };

// Create a new object with copied properties and updated age
const updatedStudent = { ...student, age: 26 };

console.log("Task 3 - student:", student);
console.log("Task 3 - updatedStudent:", updatedStudent);

// ----------------------------------

// Task 4: Merge two objects
const a = { x: 1 };
const b = { y: 2 };

// Create a new object that contains both x and y
const all = { ...a, ...b };

console.log("Task 4 - a:", a);
console.log("Task 4 - b:", b);
console.log("Task 4 - all:", all);

// =========================
// PART 3 - REST PARAMETER IN FUNCTION
// =========================

// Task 5: Flexible average function
const average = (...numbers) => {
  // Find the total sum with reduce
  const sum = numbers.reduce((total, number) => total + number, 0);

  // Return the average
  return sum / numbers.length;
};

console.log("Task 5 - average(2, 4, 6):", average(2, 4, 6)); // 4
console.log("Task 5 - average(1, 2, 3, 4, 5):", average(1, 2, 3, 4, 5)); // 3

// =========================
// EXTRA TASK
// =========================

// Task 6: Add item without changing original array
const addItem = (list, item) => {
  // Return a new array with all old items and one new item
  return [...list, item];
};

const fruits = ["apple", "banana"];
const newFruits = addItem(fruits, "orange");

console.log("Task 6 - fruits:", fruits);
console.log("Task 6 - newFruits:", newFruits);