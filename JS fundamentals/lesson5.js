// logical "AND" operator (&&)
let a = 5;
let b = 10;

if (a > 0 && b > 0) {
    console.log("Both a and b are positive numbers.");
} else {
    console.log("At least one of a or b is not a positive number.");
}

// logical "OR" operator (||)
let x = -3;
let y = 7;

if (x < 0 || y < 0) {
    console.log("At least one of x or y is a negative number.");
} else {
    console.log("Both x and y are non-negative numbers.");
}

// combining multiple conditions
let age = 25;
let hasID = true;

if (age >= 18 && hasID) {
    console.log("You are allowed to enter the club.");
} else {
    console.log("You are not allowed to enter the club.");
}

// negation operator (!)
let isRaining = false;

if (!isRaining) {
    console.log("It's not raining, you can go outside without an umbrella.");
} else {
    console.log("It's raining, don't forget your umbrella!");
}

// complex condition
let score = 85;
let passedExam = true;

if ((score >= 50 && passedExam) || score >= 90) {
    console.log("You have passed the course.");
} else {
    console.log("You have not passed the course.");
}

// nested conditions
let temperature = 30;
let isSunny = true;

if (temperature > 20) {
    if (isSunny) {
        console.log("It's a warm and sunny day!");