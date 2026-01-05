// objects

var customer = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    cars: ['Ford', 'Chevrolet', 'Dodge']
}

// Dot notation
customer.lastName = 'Smith';

// Bracket notation
console.log(customer.lastName)
console.log(customer['lastName']);

// arrays
var car = ['BMW', 'Audi', 'Mercedes'];

// Accessing array elements
console.log(car[0]); // Output: BMW

// Modifying array elements
car[1] = 'Toyota';
console.log(car); // Output: ['BMW', 'Toyota', 'Mercedes']

// Adding new elements to the array
car.push('Honda');
console.log(car); // Output: ['BMW', 'Toyota', 'Mercedes', 'Honda']

// Nested objects and arrays
var customer = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    cars: ['Ford', 'Chevrolet', 'Dodge']
}

console.log(customer.cars[0]); // Output: Ford  