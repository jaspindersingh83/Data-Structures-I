/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  retrievekv() {
    const pairsdata = this.storage.storage;
    const pairs = [];
    pairsdata.forEach((ele) => {
      if (Array.isArray(ele)) {
        for (let i = 0; i < ele.length; i++) {
          pairs.push(ele[i]);
        }
      }
    });
    return pairs;
  }
  insert(key, value) {
    const index = getIndexBelowMax(key, this.limit);
    if (this.storage.get(index) === undefined) {
      this.storage.set(index, []);
      this.storage.get(index).push([key, value]);
    } else {
      const elements = this.storage.get(index);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i][0] === key) {
          elements[i][1] = value;
        } else {
          this.storage.get(index).push([key, value]);
        }
      }
    }
    let counter = 0;
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.get(i) !== undefined) {
        counter++;
      }
    }
    if (counter >= 0.75 * this.limit) {
      const prev = this.retrievekv();
      this.limit = this.limit * 2;
      this.storage = new LimitedArray(this.limit);
      prev.forEach((ele) => {
        this.insert(ele[0], ele[1]);
      });
    }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key, this.limit);
    const bucket = this.storage;
    const elements = bucket.get(index);
    if (elements !== undefined) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i][0] === key) {
          elements.splice(i, 1);
        }
      }
    }
    const capacity = this.storage.length;
    if (capacity < 0.75 * ((this.limit) / 2)) {
      this.limit = this.limit / 2;
      this.storage = new LimitedArray(this.limit);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key, this.limit);
    const bucket = this.storage;
    const elements = bucket.get(index);
    if (elements !== undefined) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i][0] === key) {
          const retrieved = elements[i][1];
          return retrieved;
        }
      }
    }
  }
}

module.exports = HashTable;
