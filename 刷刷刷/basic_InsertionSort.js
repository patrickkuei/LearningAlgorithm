/**
 * 從左邊開始找，找到比較小的值，先存起來
 * 將其左邊的值都往右移動，再將其插入比他小的後面
 * 
 * 
 * @param  {number[]} arr
 * @returns {number[]}
 */
var insertionSort = (arr) => {

    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        let j = i - 1;

        //後一項與前一項相比，若比較小，先讓後一項等於前一項，
        //若沒有比較小，結束內圈
        for (j; j > -1; j--) {
            if (currentVal < arr[j]) {
                arr[j + 1] = arr[j]
            } else break;
        }
        arr[j + 1] = currentVal
    }
    return arr;
}

// [3,2,5,1] i=1 j=0 c=2
// [3,3,5,1]
// [2,3,5,1]
// [2,3,5,1] i=2 j=1 c=5
// [2,3,5,5] i=3 j=2 c=1
// [2,3,3,5]
// [2,2,3,5]
// [1,2,3,5]