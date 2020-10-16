class singlyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else { //先將尾的next指向新node，再將尾改指向新node。可能因為assign的關係，頭的next會跟著接下去，原本的tail會被捨棄
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++
        return this;
    };

    pop() {
        if (!this.head) { return undefined }

        //linkedList沒辦法從中間找到東西，必須從頭開始往後找
        let currentNode = this.head;
        let newTail = currentNode;

        while (currentNode.next) {
            //讓newTail等於currentNode，再將currentNode指向下一個，這樣就能找到最末端的前一個
            newTail = currentNode;
            currentNode = currentNode.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return currentNode;
    };
    unshift(val) {
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++
        return this;
    };
    shift() {
        if (!this.head) return undefined;

        let currentNode = this.head;
        this.head = currentNode.next;
        this.length--;
        return currentNode
    };
    get(index) {
        if (index < 0 || index >= this.length) return undefined;

        let targetNode = this.head;
        let i = 0;
        while (i !== index) {
            targetNode = targetNode.next;
            i++
        }
        return targetNode;
    };
    set(index, val) {
        let targetNode = this.get(index);
        if (targetNode) {
            targetNode.val = val;
            return true;
        }
        return false;
    };
    insert(index, val) {
        if (index < 0 || index > this.length) return undefined;
        if (index === 0) return this.unshift(val);
        if (index === this.length) return this.push(val);

        let newNode = new Node(val);

        let prevNode = this.get(index - 1);
        let currentNode = prevNode.next
        prevNode.next = newNode;
        newNode.next = currentNode;

        return true;

    };
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) {
            return this.shift();
        }
        if (index === this.length - 1) {
            return this.pop();
        }

        let prevNode = this.get(index - 1);
        let removedNode = prevNode.next;
        prevNode.next = removedNode.next;

        this.length--;

        return removedNode;
    };

}

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}