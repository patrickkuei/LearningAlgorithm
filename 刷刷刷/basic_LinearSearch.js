
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const linearSearch = (arr, target) => {
    for (let i in arr) {
        if (arr[i] == target) {
            return i
        }
    }
    return -1
}