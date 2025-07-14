function orderFunction() {
  const arr = [];
  const queue = {
    index: { rear: 0, front: 0 },
    enqueue(item) {
      arr[this.index.rear] = item;
      this.index.rear++;
      return arr;
    },
    dequeue() {
      if (!arr.length) {
        return;
      }
      // arr[this.index.front] = undefined;
      arr.shift();
      this.index.front++;
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
