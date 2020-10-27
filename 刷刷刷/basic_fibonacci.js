const fibonacci = (n, memo = []) => {
    if (n > 0 && n <= 2) return 1
    if (memo[n] !== undefined) return memo[n]
    let output = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);

    memo[n] = output
    return output
}