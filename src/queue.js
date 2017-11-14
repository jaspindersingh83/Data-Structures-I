/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the queue is storing
  3. Add an `enqueue` method that accepts an item as input and adds it to the storage structure
  4. Add a `dequeue` method that removes the item in the queue that was added earliest
*/
class Queue {
  constructor(options) {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    const newnode = {
      value, // same as value :value
      next: null,
    };
    if (!this.head) {
      this.head = newnode;
      this.tail = newnode;
      this.length = 1;
    } else {
      this.tail.next = newnode;
      this.tail = newnode;
      this.length = this.length + 1;
    }
  }
  dequeue() {
    if (!this.head) {
      return null;
    }
    const top = this.head.value;
    if (this.head === this.tail) {
      this.tail = null;
      this.head = null;
      this.length = 0;
    } else {
      const node = this.head.next;
      this.head = node;
      this.length = this.length - 1;
    }
    return top;
  }
  get size() {
    return this.length;
  }
}

module.exports = Queue;
