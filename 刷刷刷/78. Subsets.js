// Given a set of distinct integers, nums, return all possible subsets (the power set).

// Note: The solution set must not contain duplicate subsets.

// Example:

// Input: nums = [1,2,3]
// Output:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

//原本想法：用splice切，把剩下的傳進去
//結果：錯誤，因為第二圈會出現1,3,2的現象，此題的順序並不改變
//
//答案思路：使用迴圈方式指定要傳入的值
//確保順序不會改變

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let result = []
    recursion([], 0)
    function recursion(arr, index){
        result.push(arr)
        for(let i = index; i < nums.length; i++){
            recursion([...arr, nums[i]], i+1)
        }
    }
    return result
};