// Relation or Comparison Operators

// > - Greater than
// < - Less than
// >= - Greater than or equal to
// <= - Less than or equal to
// == - Equal to (value only)
// === - Strictly equal to (value and type)
// != - Not equal to (value only)
// !== - Strictly not equal to (value and type)

// Examples:

console.log(5 > 3);        // true
console.log(2 < 4);        // true
console.log(6 >= 6);       // true
console.log(3 <= 2);       // false
console.log(5 == '5');     // true
console.log(5 === '5');    // false
console.log(4 != 5);       // true
console.log(4 !== '4');    // true

// Using comparison operators in conditional statements
let a = 10;
let b = 20;

if (a < b) {
    console.log("a is less than b");
} else {
    console.log("a is not less than b");
}

if (a === 10) {
    console.log("a is exactly 10");
} else {
    console.log("a is not exactly 10");
}

// Combining comparison operators
let c = 15;

if (c > 10 && c < 20) {
    console.log("c is between 10 and 20");
} else {
    console.log("c is not between 10 and 20");
}

if (c < 10 || c > 20) {
    console.log("c is either less than 10 or greater than 20");
} else {
    console.log("c is between 10 and 20");
}   