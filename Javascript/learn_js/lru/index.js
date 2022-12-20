class LRU{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }

    getItem(key){
        const item = this.cache.get(key);
        // Map keeps track of insertion order, this will refresh the item
        if(item){
            this.cache.delete(key);
            this.cache.set(key,value);
        }
        return item;
    }

    putItem(key,value){
        // delete to refresh the insertion order
        if(this.cache.has(key)){
            this.cache.delete(key);
        }else if(this.cache.size === this.capacity){
            this.cache.delete(this.oldestItem)
        }
        this.cache.set(key,value);
    }

    // get allow to call oldestItem as property not function.
    get oldestItem(){
        return this.cache.keys().next().value;
    }
}

const cache = new LRU(3);
cache.putItem('a',6);
cache.putItem('b',7);
cache.putItem('c',8);
cache.putItem('a',9);
cache.putItem('d',10);
console.log(cache);