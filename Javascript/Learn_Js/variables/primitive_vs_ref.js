// Primitive and Reference Types
console.log("---Primitive and Reference Types ---");

// Primitive Tpyes: Stored directly in the "stack", where it is accessed from 
//          String | Boolean | Null | Undefined | Symbol | BigInt

// Reference Types: Stored in the "heap", where it is accessed from
//          Object | Array | Function



// These values are stored in stack
const name = "John";
const age2 = 30;

// Reference values are stored on the heap
const person2   = {
    name: "John",
    age: 30
}

let nameName = name;
newName = "Rabin";

let newPerson = person2;
newPerson.name = "Rabina";

console.log(name,newName);
console.log(person2,newPerson);