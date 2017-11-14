/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the stack is storing
  3. Add a `push` method that accepts an item as input and adds it to the storage structure
  4. Add a `pop` method that removes the most recently-added item to the stack
*/
class Stack {
  constructor(options) {
    this.stac = [];
    this.length = 0;
  }
  push(item) {
    const arr = this.stac;
    arr.push(item);
    this.length++;
  }
  pop() {
    if (this.length === 0) {
      return null;
    }
    this.length--;
    const top = this.stac.pop();
    return top;
  }
  get size() {
    return this.length;
  }
}

module.exports = Stack;
