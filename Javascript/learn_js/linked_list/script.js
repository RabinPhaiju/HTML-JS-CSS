class Node {
    constructor(data,next = null){
        this.data = data;
        this.next = next;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    // Insert first Node
    insertFirst(data){
        this.head = new Node(data,this.head);
        this.size++;
    }

    // Insert last Node
    insertLast(data){
        let node = new Node(data);
        let current;
        
        // If empty, make head
        if(!this.head){
            this.head = node
        }else{
            current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    // Insert at index
    insertAt(data,index){
        // if index is out of bound
        if(index>0 && index>this.size){
            console.log('Out of bound error',index)
            return;
        }else if(index === 0){
            this.insertFirst(data);
        }else{
            const node = new Node(data);
            let current,previous;
            current = this.head;
            let count = 0;
            while(count<index){
                previous = current; // Node before the index
                current = current.next;
                count++;
            }
            node.next = current;
            previous.next = node;
            this.size++;
        }

    }

    // Get at index
    getAt(index){
        let current = this.head;
        let count = 0;
        while(current){
            if(count==index){
                console.log(current.data)
                break;
            }
            count++;
            current = current.next;
        }
        return null;
    }

    // Remove from List
    removeAt(index){
        if(index>0 && index>this.size){
            return;
        }else if(index === 0){ 
            this.head = this.head.next;
        }else{
            let current = this.head;
            let previous;
            let count = 0;
            while(count<index){
                count++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
    }

    // Clear list
    clear(){
        this.head = null;
        this.size = 0;
        // not remove from memory.
    }

    // Print list data
    printListData(){
        let current = this.head;
        while(current){
            console.log(current.data);
            current = current.next
        }
    }
}
    const ll = new LinkedList();
    ll.insertFirst(100);
    ll.insertFirst(200);
    ll.insertFirst(300);
    ll.insertLast(400);
    // ll.insertAt(500,10);
    // ll.removeAt(2);
    ll.clear()
    ll.printListData();
    // ll.getAt(2)