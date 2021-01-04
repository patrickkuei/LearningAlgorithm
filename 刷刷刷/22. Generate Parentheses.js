// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]


// 找出畫括號的邏輯, 總共會有n個(, 也會有n個)
// 先畫(, 再畫)
// 邏輯是 '3*( + 3*)', '2*( + 1*) + 1*( + 2*)', ...

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = []
    recursion(n, 0, "")
    function recursion(start, end, str){
        if(str.length == 2*n){
            result.push(str)
            return
        } 
        
        if(start > 0) recursion(start-1, end+1, str+"(")
        if(end > 0) recursion(start, end-1, str+")")
    }
    return result
};