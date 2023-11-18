// Type coercion
console.log("--- Type coercion ---");

let x2;
x2 = 5 + '5'; // js implicit conversion to string
console.log(x2, typeof x2); // 55

x2 = 5 + Number('5');
console.log(x2, typeof x2); // 10

x2 = 5 * '5'; // js implicit conversion to number
console.log(x2, typeof x2); // 55

x2 = 5 + null; // js implicit conversion to number 0
console.log(x2, typeof x2); // 5
console.log(Number(null)); // 0

x2 = Number(true);  // 1
console.log(x2, typeof x2); // 1

x2 = Number(false); // 0
console.log(x2, typeof x2); // 0

x2 = 5 + true;
console.log(x2, typeof x2); // 6

x2 = 5 + false; // false type coercion to 0
console.log(x2, typeof x2); // 5

x2 = 5 + undefined;
console.log(x2, typeof x2); // undefined