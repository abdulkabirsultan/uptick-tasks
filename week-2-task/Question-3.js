console.log('Question 3');

function orderFunction() {
  const arr = [];
  // Queue simulation
  const queue = {
    index: { rear: 0, front: 0 },

    /**
     * Adds an item to the end of the queue
     *  Time complexity O(1)
     */
    enqueue(item) {
      arr[this.index.rear] = item;
      this.index.rear++; // Increment the rear index
      return arr;
    },

    /**
     * Removes an item from the front of the queue
     * Time complexity is O(n) using shift or O(1) using line 25
     */
    dequeue() {
      if (!arr.length) {
        return;
      }
      // arr[this.index.front] = undefined;
      arr.shift();
      this.index.front++; // Increment the front index
      return arr;
    },
  };

  return {
    addOrder: (item) => queue.enqueue(item),
    removeOrder: (item) => queue.dequeue(item),
  };
}
const order = orderFunction();
console.log(order.addOrder('Indomie'));
console.log(order.addOrder('Biscuit'));
console.log(order.removeOrder());
