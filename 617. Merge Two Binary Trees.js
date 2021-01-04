/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    return merge(t1, t2);
    
    function merge(node1, node2){
        var newNode = new TreeNode();
        
        if(node1 == null && node2 == null){
            return null;
        }else if(node2 == null){
            newNode.val = node1.val;
            node2 = new TreeNode();
        }else if(node1 == null){
            newNode.val = node2.val;
            node1 = new TreeNode();
        }else{
            newNode.val = (node1.val + node2.val);
        }
        
        newNode.left = merge(node1.left, node2.left);
        newNode.right = merge(node1.right, node2.right);
        return newNode;
    }
};