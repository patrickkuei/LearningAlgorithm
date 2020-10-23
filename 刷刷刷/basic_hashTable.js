class HashTabke {
    //長度為2^n
    constructor(size = 8) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        //令一常數A為黃金比例 根號5-1/2
        //令f = key值*A取分數 -> 亦即 取小數點後部分
        //取f*table長度的整數部分 得此key的hash值
        let value = key;
        let A = (Math.sqrt(5) - 1) / 2;

        if (key.length) {
            for (let i = 0; i < key.length; i++) {
                let char = key[i];
                value = char.charCodeAt(0) - 96; // a = 97; z = 122
                value += value;
            }
        }
        let f = (value * A) % 1 //相乘取小數點部分
        return Math.abs(Math.floor(f * this.keyMap.length))
    }

    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value])
        // keyMap = [
        //     empty,
        //     [[key1, value1], [key2, value2], ...],
        //     empty,
        //     empty,
        //     ...
        // ]
        return this.keyMap
    }
    get(key) {
        let index = this._hash(key);
        if (index < 0 || index >= this.keyMap.length) return undefined;

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
            }
        }
        return undefined;
    }
    keys() {
        let keys = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keys.includes(this.keyMap[i][j][0])) {
                        keys.push = this.keyMap[i][j][0];
                    }
                }
            }
        }
        return keys;
    }
    values() {
        let values = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!values.includes(this.keyMap[i][j][1])) {
                        values.push = this.keyMap[i][j][1];
                    }
                }
            }
        }
        return values;
    }

}