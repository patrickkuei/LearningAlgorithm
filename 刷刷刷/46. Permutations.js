// Given a collection of distinct integers, return all possible permutations.

// Example:

// Input: [1,2,3]
// Output:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

//用迴圈來指定誰該固定
//將剩下的數傳到下一層
//再用迴圈固定
//再將剩下的數傳到下一層 直到剩下一個數(最後一層)
//將此次路徑的值放進答案
//結束最後一層，回到上一層，迴圈i+1，開始固定下一個數，將剩下的數傳到下一層
//以此類推

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let result = []
    recursion(queue = [], nums)
    function recursion(queue, array){
        
        if(array.length === 0) return result.push(queue)
        
        for(let i = 0; i < array.length; i++){
            let arr = [...array]
            let q = [...queue]
            q.push(arr[i])
            arr.splice(i,1)
            recursion(q, arr)
        }
    }
    return result
};