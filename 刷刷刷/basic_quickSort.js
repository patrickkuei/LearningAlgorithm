/**
 * @param  {number[]} arr
 * @param  {number} start=0
 * @param  {number} end=arr.length-1
 * @returns {number} swapIndex
 */
var pivot = (arr, start = 0, end = arr.length - 1) => {
    let pivot = arr[start];
    let swapIndex = start;

    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            swapIndex++;
            swap(arr, swapIndex, i);
        }
    }
    swap(arr, start, swapIndex)

    return swapIndex;
}
/**
 * @param  {number[]} arr
 * @param  {number} index1
 * @param  {number} index2
 * @returns {number[]}
 */
var swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}
/**
 * @param  {number[]} arr
 * @param  {number} left=0
 * @param  {number} right=arr.length-1
 * @returns {number[]} sorted array
 */
var quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right);
        quickSort(arr, left, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, right)
    }
    return arr;
}


// pivot:
// [4,18,2,37,1]
// [4,18,2,37,1]
// [4,2,18,37,1]
// [4,2,18,37,1]
// [4,2,1,37,18]
// [1,2,4,37,18]
// return 2

//再用遞迴方式處理左半邊及右半邊
//直到pivotIndex = 1，也就是左半邊剩兩個值，
//或直到pivotIndex一直++到 left 大於 right，也就是右半邊剩下兩個值
//就各自整理完了，再兩兩回傳，即可得到結果

