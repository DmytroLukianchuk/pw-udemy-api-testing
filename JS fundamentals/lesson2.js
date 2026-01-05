// Concatinations and interpolation
var price = 50;
var product = "book";

// Using concatenation
var message1 = "The price of the " + product + " is $" + price + ".";
console.log(message1); // Output: The price of the book is $50.

// Using interpolation (template literals)
var message2 = `The price of the ${product} is $${price}.`;
console.log(message2); // Output: The price of the book is $50.

message3 = `This is the interpolation message, where "product" is ${price}  is ${product}.`;
