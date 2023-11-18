// Caching the result of expensive function calls and reutrns the cached result when same input occurs again.

function memozise(func){
    let cache = {};

    return function(){
        let args = JSON.stringify(arguments);
        if(cache[args]){
            return cache[args];
        }else{
            let result = func.apply(this,arguments);
            cache[args] = result;
            return result;
        }
    }
}

function fibinacci(n){
    if(n==0 || n==1){
        return n;
    }else{
        return fibinacci(n-1)+fibinacci(n-2);
    }
}

let memoizedFibonnaci = memozise(fibinacci);
console.log(memoizedFibonnaci(10));