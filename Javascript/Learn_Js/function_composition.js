// A process of combining two or more functions to produce a new function.
// eg: Apply series of transformation to some data.

function compose(f,g){
    return function(x){
        return f(g(x));
    }
}

function addOne(x){
    return x+1;
}

function double(x){
    return x*2;
}

let addOneAndDouble = compose(double,addOne);
let result = addOneAndDouble(5);
