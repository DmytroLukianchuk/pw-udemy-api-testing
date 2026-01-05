// Functions 
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice"));

// Function expression
const add = function(a, b) {
    return a + b;
};

console.log("Sum:", add(5, 3));

// Arrow function
const multiply = (a, b) => a * b;

console.log("Product:", multiply(4, 2));

// Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("This is an IIFE!");
})();   

// Declaration function - can be called before its definition
function farewell(name) {
    return "Goodbye, " + name + "!";
}

// Anonymous function cannot be called before its definition
var hello = function() {
    console.log("Hello from an anonymous function!");
};

hello();

// ES6 error function with default parameters
var hello = (name = "Guest") => {
    console.log("Hello, " + name + "!");
};


// Function with arguments
function sumAll() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log("Sum of all arguments:", sumAll(1, 2, 3, 4, 5));

// FUnction with return value
function square(num) {
    return num * num;
}

var result = square

console.log("Square of 4:", result); 

// imported function from another module
import { printHelper } from './printedHelper.js';

printHelper("This is a message from lesson8.js");