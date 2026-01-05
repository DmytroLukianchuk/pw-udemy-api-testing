// Loops 
// for loop
for (let i = 0; i < 5; i++) {
    console.log("Iteration number: " + i);
}

// while loop
let j = 0;
while (j < 5) {
    console.log("While loop iteration: " + j);
    j++;
}

// do...while loop
let k = 0;
do {
    console.log("Do...while loop iteration: " + k);
    k++;
} while (k < 5);

// for...in loop (used for objects)
const person = { name: "Alice", age: 25, city: "New York" };
for (let key in person) {
    console.log(key + ": " + person[key]);
}

// for...of loop (used for iterable objects like arrays)
const colors = ["red", "green", "blue"];
for (let color of colors) {
    console.log("Color: " + color);
}   

// ES6+ features forEach method
colors.forEach((color, index) => {
    console.log(`Color at index ${index}: ${color}`);
}); 

