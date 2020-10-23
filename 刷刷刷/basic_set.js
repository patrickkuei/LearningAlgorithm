class Set {
    constructor() {
        this.items = {};
    }

    has(val) {
        return this.items.hasOwnProperty(val);
    };
    add(val) {
        if (!this.items[val]) {
            this.items[val] = val;
            return true;
        }
        return false;
    };
    remove(val) {
        if (this.items[val]) {
            return delete this.items[val];
        }
        return false;
    };
    clear() {
        this.items = {};
    };
    size() {
        return this.values().length
    };
    values() {
        return Object.values(this.items);
    };
    keys() {
        return Object.keys(this.items)
    }

    union(otherSet) {
        let newSet = new Set();
        let i = 0;
        let j = 0;
        while (i < this.size()) {
            newSet.add(JSON.parse(this.values()[i]))
            i++;
        }
        while (j < otherSet.size()) {
            newSet.add(JSON.parse(otherSet.values()[j]))
            j++;
        }
        return newSet;
    }

    intersection(otherSet) {
        let newSet = new Set();
        let thisKeyArray = this.keys();
        let thisValArray = this.values();
        for (let i = 0; i < this.size(); i++) {
            if (otherSet.has(thisKeyArray[i])) {
                newSet.add(JSON.parse(thisValArray[i]));
            }
        }
        return newSet;
    }

    symmetricDifferent(otherSet) {
        let newSet = new Set();
        let thisKeyArray = this.keys();
        let thisValArray = this.values();
        for (let i = 0; i < this.size(); i++) {
            if (!otherSet.has(thisKeyArray[i])) {
                newSet.add(JSON.parse(thisValArray[i]));
            }
        }
        let otherKeyArray = otherSet.keys();
        let otherValArray = otherSet.values();
        for (let j = 0; j < otherSet.size(); j++) {
            if (!this.has(otherKeyArray[j])) {
                newSet.add(JSON.parse(otherValArray[j]));
            }
        }

        return newSet;
    }

    subtracting(otherSet) {
        let newSet = new Set();
        let thisKeyArray = this.keys();
        let thisValArray = this.values();
        for (let i = 0; i < this.size(); i++) {
            if (!otherSet.has(thisKeyArray[i])) {
                newSet.add(JSON.parse(thisValArray[i]))
            }
        }
        return newSet;
    }

    subSet(otherSet) {
        if (this.size() > otherSet.size()) return false;

        let thisKeyArray = this.keys();
        for (let i = 0; i < this.size(); i++) {
            if (!otherSet.has(thisKeyArray[i])) {
                return false;
            }
        }
        return true;
    }
}