// import merge from basic_Merge.js

/**
 * @param  {Number[]} arr
 * @returns {Number[]}
 */
var mergeSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    let arrLeft = mergeSort(left);
    let arrRight = mergeSort(right);

    return merge(arrLeft, arrRight);
}