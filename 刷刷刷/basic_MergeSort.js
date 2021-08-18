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
};

//[3,2,6]
//left = [3]
//right = [2,6]
//arrLeft = [3]
//arrRight = merge([2],[6]) = [2, 6]
// merge(arrLeft, arrRight) = merge([3], [2, 6]) = [2,3,6]
