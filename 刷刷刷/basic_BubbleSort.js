/**
 * @param  {array} arr
 */
var bubbleSort = (arr) => {

    //外圈用減的且讓內圈與之連動 -> 因為每跑完一內圈，最後一個數會是最大
    //不需要再比對它
    //noSwap去檢查每一個內圈有沒有交換
    //若已經全部排序完成，則不要再循環外圈
    for (let i = arr.length - 1; i > 0; i--) {
        let noSwap = true;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                noSwap = false
            }
        }
        if (noSwap) { break }
    }
    return arr;
}