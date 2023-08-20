// Primitive Data Types
console.log("---Primitive Data Types---");

// 1. String - Sequence of characters. Must be in quotes or backticks.
// 2. Number - Integers as well as floating-point numbers.
// 3. Boolean - True or False. (logical entity).
// 4. Null - Intentional absense of any object value.
// 5. Undefined = A variable that has not yet been defined / assigned.
// 6. Symbol - Built-in object whose constructor returns a unique symbol.
// 7. BigInt - Numbers that are greater than the "Number"

// --- Strings
const firstName = 'John';
console.log(firstName,typeof firstName);

// --- Numbers
const age = 30;
const temp = 30.2;
console.log(temp,typeof temp);

// --Booleans
const married = true;
console.log(married,typeof married);

// -- Null
const car = null;
console.log(car,typeof car); // null 'Object'

// -- Undefined
let score1; 
console.log(score1,typeof score1); // undefined 'undefined'

// --- Symbol
const id = Symbol('id');
console.log(id,typeof id);

// --- BigInt
const bigInt = 90071992547409918309830893083080830803n;
console.log(bigInt,typeof bigInt);


// ------------------ Reference Types (Objects)
// Reference types of "objects" are a non-primitive values and when assigned to a variable, the variable is given a reference to that value.
// Object literals(key,value), arrays and functions are all reference types.
// Any reference type is object.

const numbers = [1,2,3];
console.log(numbers,typeof numbers); // object

const person1 = {name: 'John'};
console.log(person1,typeof person1); // object

const helloworld = () => {
    console.log('Hello World');
}

console.log(helloworld,typeof helloworld); // function object
