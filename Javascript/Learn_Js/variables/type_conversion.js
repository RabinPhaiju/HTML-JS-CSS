// Type Conversion
console.log('--- Type Conversion String to number---');

let amountt = '100';
console.log(amountt, typeof amountt);

// Method1
amount = Number(amountt);
console.log(amount, typeof amount);

// Method2
amount = parseInt(amountt);
console.log(amount, typeof amount);

// Method3
amount = parseFloat(amountt);
console.log(amount, typeof amount);

// Method4
amount = +amountt;
console.log(amount, typeof amount);


console.log('--- Type Conversion Number to string---');
// Method1
amountt = 100;
amount = amountt.toString();
// amount -> integer doesnot intrinsicly have any methods cause its not an object but,js creats temp wrapper of associated type.
console.log(amount, typeof amount);

// Method2
amount = String(amountt);
console.log(amount, typeof amount);

// Method3
amount = `${amountt}`;
console.log(amount, typeof amount);


