// Function are first-class objects, So they can be passed as arguments to other function and return value.

function repeat(f,n){
    for(let i=0;i<n;i++){
        f(i);
    }
}

function printNumber(n){
    console.log(n);
}

repeat(printNumber,5);