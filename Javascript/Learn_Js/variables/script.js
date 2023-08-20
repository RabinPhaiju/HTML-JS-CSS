// Naming Conventions
// camelCase
// Only letters and numbers, underscore
// Cannot Start with a number.

// Multi-Word Formatting
// firstName = camelCase
// first_name = snake_case (underscore)
// FirstName = PascalCase
// firstname = lowercase

// -- reassigning variables
console.info('reassigning variables');
age = 31;
console.log(age);

let score;
score = 1;
console.log(score);

if(true){
    score = score+1;
}

console.log(score);

 // -- const 
 const x = 100;
//  x = 101; // cannot reassign const variables

 const arr = [1, 2, 3, 4, 5];
//  arr = [1, 2, 3, 4, 5,6]; // can reassign // cannot directly change the variables
arr.push(6);
arr[0] = 100;
console.log(arr);

const person = {name: 'rabin',age: 23,}
person.name = 'shyam';
person.email = 'zv0qN@example.com';
console.log(person);

// Note -- When to use let or const
// 1. When we want to reassign a variable or directly change the varialbe value by assigning -> use let.

// -- Declare multiple values at once
let a,b,c;
const d=10,e=20,f=30;
console.log(a,b,c,d,e,f);