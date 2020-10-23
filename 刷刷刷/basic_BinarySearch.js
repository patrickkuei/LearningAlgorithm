/**
 * @param  {number[]} arr sorted array
 * @param  {number} target
 * @returns {number}
 */
var binarySearch = (arr, target) => {
    var left = 0;
    var right = arr.length - 1;

    while (left <= right) {

        if (target > arr[right] || target < arr[left]) { return (-1) }

        var middle = Math.floor(left + right / 2);

        if (target > arr[middle]) {
            left = middle;
        } else if (target < arr[middle]) {
            right = middle;
        } else {
            return middle;
        }
    }
}