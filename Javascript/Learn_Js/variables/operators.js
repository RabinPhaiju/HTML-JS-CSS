// Operators
console.log('--- operators ---');

// 1. Arithmetic Operators
let x1;
x1 = 5 + 5;
x1 = 5 - 5;
x1 = 5 * 5;
x1 = 5 / 5;
x1 = 5 % 5;

// Concatination
x1 = 'Hello' + ' ' + 'World';
console.log(x1);

// Exponent
x1 = 2 ** 3;
console.log('exponent', x1);

// Increment
x1 = 1;
x1++;
console.log('increment',x1);
console.log('drecrement',x1);

// Assignment Operator
x1 = 10; // assign
x1 += 10; // x1 = x1 + 10;
x1 -= 5; // x1 = x1 - 5;
x1 /= 2; // x1 = x1 / 2;
x1 %= 2; // x1 = x1 % 2;
x1 **= 2; // x1 = x1 ** 2;

// Comparision Operators
console.log('--- Comparision Operators ---');
x1 = 2 == '2'; // double equal dont check the type
console.log(x1);

x1 = 2 === '2'; // also evalute the types
console.log(x1);

x1 = 2 != '2'; // false
console.log('Not Equal',x1);

x1 = 2 !== '2'; // true  -> asto evalute the types
console.log('Not Equal',x1);

// Logical Operators
console.log('--- Logical Operators ---');
x1 = true && false;
console.log(x1);

x1 = true || false;
console.log(x1);

x1 = 10 > 5;
x1 = 10 < 5;
x1 = 10 <= 5;
x1 = 10 >= 5;