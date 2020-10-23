class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.lenght = 0;
    }

    pop() {
        if (!this.head) return undefined;

        let popNode = this.tail;

        if (this.lenght === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let prevNode = this.tail.prev;
            this.tail = prevNode;
            this.tail.next = null;
            popNode.prev = null; // 清除output的連結
        }
        this.lenght--
        return popNode;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.lenght++
        return this
    }
    shift() {
        if (!this.head) return undefined;

        let shiftedNode = this.head;
        if (this.lenght === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next
            this.head.prev = null
            this.shiftedNode.next = null;
        }
        this.lenght--;
        return currentNode;
    }
    unshift(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.lenght++
        return this
    }
    get(index) {
        if (index < 0 || index >= this.lenght) return undefined;
        if (index === 0) return this.head;
        if (index === this.lenght - 1) return this.tail;

        let i = 0;
        let gotNode = this.head;

        while (i !== index) {
            i++;
            gotNode = gotNode.next;
        }
        return gotNode;
    }
    set(index, val) {
        let gotNode = this.get(index);

        if (gotNode) {
            gotNode.val = val;
            return true;
        } else {
            return false;
        }
    }
    insert(index, val) {
        if (index < 0 || index > this.lenght) return undefined;
        if (index === 0) return this.unshift(val);
        if (index === this.lenght) return this.push(val);
        let gotNode = this.get(index);
        let newNode = new Node(val);
        let prevNode = gotNode.prev;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = gotNode;
        gotNode.prev = newNode;

        this.lenght++;

        return this
    }
    remove(index) {
        if (index < 0 || index >= this.lenght) return undefined;
        if (index === 0) return this.shift();
        if (index === this.lenght - 1) return this.pop();

        let gotNode = this.get(index);
        let prevNode = gotNode.prev;
        let nextNode = gotNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        this.lenght--
        return gotNode
    }

}