function search(arr,target,start=0,end=arr.length-1){
    console.log(start,end)
    if(start>end){
        console.log('Content not found');
        return ;
    }
    const middle = Math.floor((start+end)/2);
    
    if(arr[middle] == target){
        console.log('found');
        return ;
    }else if(arr[middle]<target){
        search(arr,target,middle,end)
    }else{
        search(arr,target,start,middle)
    }
}

const data = [2,5,8,12,14,15,20,23,25,28,31,35,38,50,60,78,88,93,99]

search(data,12)