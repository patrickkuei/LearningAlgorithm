class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        let newNode = new Node(val)
        if (!this.root) {
            this.root = newNode;
            return this
        }
        let currentNode = this.root
        while (true) {
            if (val < currentNode.val) {
                if (!currentNode.left) {
                    currentNode.left = newNode
                    return this
                } else {
                    currentNode = currentNode.left
                }
            } else if (val > currentNode.val) {
                if (!currentNode.right) {
                    currentNode.right = newNode
                    return this
                } else {
                    currentNode = currentNode.right
                }
            } else {
                return false;
            }
        }
    };
    find(val) {
        if (!this.root) {
            return false
        }
        let currentNode = this.root;
        while (true) {
            if (val < currentNode.val) {
                if (currentNode.left) {
                    currentNode = currentNode.left;
                } else {
                    return false;
                }
            } else if (val > currentNode.val) {
                if (currentNode.right) {
                    currentNode = currentNode.right;
                }
                else {
                    return false;
                }
            } else {
                return currentNode
            }
        }
    };

    BFSS() {
        let data = []
        let queue = []
        let currentNode = new Node();
        queue.push(this.root)
        function recursion() {
            if (queue.length === 0) return
            currentNode = queue.shift()
            data.push(currentNode)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
            recursion()
        }
        recursion()
        return data
    }

    BFS() {
        if (!this.root) return false
        let node = this.root;
        let data = [];
        let queue = [];
        queue.push(node);
        while (queue.length) {
            let currentNode = queue.shift()
            data.push(currentNode);
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return data;
    };

    _BFS() {
        let node = this.root;
        let data = [];//已訪問的節點
        let queue = [];//尚未返問的節點
        queue.push(node);
        while (queue.length) {//佇列queue中還有資料時,取出並塞入data中
            node = queue.shift();//取出
            data.push(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }
    DFS() {
        let data = [];
        let level = 0
        let depth = level
        function recursion(node) {
            level++
            depth = Math.max(depth, level)
            data.push(node)
            if (node.left) recursion(node.left)
            if (node.right) recursion(node.right)
            level--
        }
        recursion(this.root)
        console.log(depth);
        return data
    };


    // _isSymmetroc() {
    //     let level = 0
    //     let depth = level;
    //     function DFS(node) {
    //         level++
    //         depth = Math.max(depth, level)
    //         if (node.left) DFS(node.left)
    //         if (node.right) DFS(node.right)
    //         level--
    //     }
    //     DFS(root)
    // }
    // 
    // 
    // isSymmetric = function (root) {
    //     if (!root) return true
    //     let data = []
    //     let queue = []
    //     let currentNode = root;
    //     queue.push(currentNode)
    //     function recursion() {
    //         if (queue.length === 0) return
    //         currentNode = queue.shift()
    //         data.push(currentNode.val)

    //         if (currentNode.left) {
    //             queue.push(currentNode.left)
    //         } else if (currentNode.right) {
    //             queue.push(null)
    //         }

    //         if (currentNode.right) {
    //             queue.push(currentNode.right)
    //         } else if (currentNode.left) {
    //             queue.push(null)
    //         }
    //         recursion()
    //     }
    //     recursion()

    //     return level(data)
    // };
}

// function level (data){
//     let eachLevel = []
//     for (let i = 1; i <= Math.sqrt(data.length + 1); i++) {
//         for (let j = Math.pow(2, i) - 1; j < Math.pow(2, i + 1) - 1; j++) {
//             eachLevel.push(data[j])
//         }
//         while (eachLevel.length) {
//             if (eachLevel.shift() !== eachLevel.pop()) return false
//         }
//     }

//     return true
// }
















// var maxProfit = function(prices) {
//     if(prices.length === 0) return 0
//     let minPrice = Infinity;
//     let maxPrice = -Infinity;
//     let day = {}

//     for(let i = 0; i < prices.length; i++){
//         minPrice = Math.min(minPrice, prices[i])
//         day[prices[i]] = i
//     }

//     if(day[minPrice] >= prices.length - 1) return 0
//     for(let j = day[minPrice]; j < prices.length; j++){
//         maxPrice = Math.max(maxPrice, prices[j])
//     }

//     return maxPrice - minPrice
// };