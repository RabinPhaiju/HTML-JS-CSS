// object
var rabs = {
  name: "rabin",
  yearOfBirth: 1994,
  job: "student",
};

// constructor function
var Person = function (name, yearOfBirth) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
};

Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
};

Person.prototype.job = "Student";

var rabin = new Person("Rabin", 1994);
rabin.calculateAge();
console.log(rabin.job);

var sabin = new Person("Sabin", 1992);
sabin.calculateAge();
console.log(sabin.job);

var sapana = new Person("Sapana", 1996);
sapana.calculateAge();
console.log(sapana.job);

// Object.create
var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  },
};

var john = Object.create(personProto);
john.name = "john";
john.yearOfBirth = 1969;
john.job = "teacher";

console.log(john);

var jane = Object.create(personProto, {
  name: { value: "john" },
  lastname: { value: "dkf" },
  yearOfBirth: { value: 1969 },
  job: { value: "teacher" },
});

console.log(jane);

// Primitives vs objects
var a = 23;
var b = a;
a = 46;

console.log(a, b);
// not a copy

var obj1 = {
  name: "rabin",
  age: 29,
};

var obj2 = obj1;
obj1.age = 20;

console.log(obj1.age, obj2.age);
// both objects are same as taking reference

// using function
var age = 28;
var obj = {
  name: "rabin",
  city: "bhaktapur",
};

function change(a, b) {
  a = 30;
  b.city = "kathmandu";
}

change(age, obj);

console.log(age, obj.city);
// object takes reference

// First class function -> passing function to function.

var years = [1990, 1965, 1937, 2000, 2002];

function arrayCalc(arr, fn) {
  var arrRes = [];

  for (i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calcAge(year) {
  return 2020 - year;
}

console.log(arrayCalc(years, calcAge));

// Returning function from function

function calc(action) {
  if (action == "add") {
    return function (x, y) {
      console.log(action, x, y, "->", x + y);
    };
  }
}

num = calc("add");
num(2, 3);

calc("add")(3, 9); // closure

// Immediate invoked function expression
(function () {
  console.log("iife");
})();

// Call and bind
