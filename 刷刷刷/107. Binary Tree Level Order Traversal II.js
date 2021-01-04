// Given a binary tree, 
// return the bottom-up level order traversal of its nodes' values. 
// (ie, from left to right, level by level from leaf to root).

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if(!root) return []
    let result = []
    let queue = [[root, 0]]
    
    while(queue.length){
        const [node, level] = queue.shift()
        if(!result[level]){
            result[level] = [node.val]
        }else{
            result[level].push(node.val)
        }
        if(node.left) queue.push([node.left, level + 1])
        if(node.right) queue.push([node.right, level + 1])
        
    }
    return result.reverse()
};


// 原本想法
// 先算深度，再取出順向廣度優先，用2^深度之類的方法取出每層result
// 失敗

// 解答
// 用array[層數]直接將node.val放進去