/**
 * @param  {number[]} arr
 * @returns {number[]}
 */
var selectionSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let lowest = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j;
            }
        }
        if (i !== lowest) {
            let temp = arr[i];
            arr[i] = arr[lowest];
            arr[lowest] = temp;
        }
    }
    return arr;
}

/**
 * @param  {array} arr
 * @returns {number[]}
 */
var selectionSort2 = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let lowest = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                let temp = arr[lowest];
                arr[lowest] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
