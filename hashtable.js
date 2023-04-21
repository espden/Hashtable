export default class HashTable {
    constructor() {
        this.array = new Array(4);
        this.count = 0;
    }

    // Insert a new key-value pair or update the value of an existing key
    insert(key, value) {
        // Grow array when full
        if (this.count >= this.array.length)
            this._grow();

        let index = this._hash(key);
        if(this.array[index] == undefined)
            this.array[index] = [];

        let subindex = this.array[index].findIndex(pair => pair.key == key);
        if (subindex === -1)
        {
            // Insert new key-value pair
            this.array[index].push({key, value});
            this.count++;
        }
        else
        {
            // Update existing key-value pair
            this.array[index][subindex].value = value;
        }
    }

    // Return the value associated with the key, or undefined if not found
    lookup(key) {
        let index = this._hash(key);
        let subindex = this.array[index].findIndex(pair => pair.key == key);
        if (subindex === -1)
            return undefined;
        return this.array[index][subindex].value;
    }

    // Remove the key-value pair from the table, return true if successful, false if not found
    remove(key) {
        let index = this._hash(key);
        let subindex = this.array[index].findIndex(pair => pair.key == key);
        if (subindex === -1)
            return false;

        this.array[index] = this.array[index].filter(pair => pair.key != key);
        this.count--;

        // Shrink array when nearly empty
        if (this.count <= this.array.length / 4 && this.array.length > 4)
            this._shrink();

        return true;
    }

    // Returns the index associated with the key
    _hash(key) {
        // If key is number
        if (typeof key === 'number')
            return key % this.array.length;

        // If key is string
        let result = 0;
        for (let i = 0; i < key.length; i++)
          result += key.charCodeAt(i) * Math.pow(31, i);
        return result % this.array.length;
    }

    // Grow the array
    _grow() {
        console.log('Growing the array.');
        this.count = 0;
        let oldArray = this.array;
        this.array = new Array(oldArray.length * 2);
        oldArray.forEach(subarray => {
            if (Array.isArray(subarray))
            {
                subarray.forEach(element => {
                    this.insert(element.key, element.value);
                });
            }
        });
    } 

    // Shrink the array
    _shrink() {
        console.log('Shrinking the array.');
        this.count = 0;
        let oldArray = this.array;
        this.array = new Array(oldArray.length / 2);
        oldArray.forEach(subarray => {
            if (Array.isArray(subarray))
            {
                subarray.forEach(element => {
                    this.insert(element.key, element.value);
                });
            }
        });
    } 
}