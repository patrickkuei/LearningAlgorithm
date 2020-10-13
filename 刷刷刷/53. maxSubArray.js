// 53. Maximum Subarray

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.



// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    var sum = nums[0];
    var maxSum = nums[0];

    //找最大總和 所以
    //總和與下一項相加，留下較大值
    //如果加上總和都比自己小，自己留下 如果加上總和比較大，留下總和
    //總和再去加下一個 和下一個比 留下較大的
    //重複
    //當自己留下時 等於重新算總和
    //所以可以找到最大總和
    for (let i = 1; i < nums.length; i++) {
        sum = Math.max(nums[i], sum + nums[i])
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum
};