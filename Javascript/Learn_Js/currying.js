// A function that takes multiple arguments into series of function that each take single argument.

function add(x){
    return function(y){
        return x+y;
    }
}

let addFive = add(5);
console.log(addFive(3));