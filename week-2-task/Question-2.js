console.log('question 2');

const pairSum = (arr = [], target) => {
  const result = [];
  const sortedArray = arr.sort((a, b) => a - b);

  let left = 0;
  let right = sortedArray.length - 1;

  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];

    if (sum === target) {
      result.push([left, right]);
      left++;
      right--;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return result;
};

// another solution (copied)

const pairSum2 = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return [];
};
console.log(pairSum([2, 7, 11, 15], 9));
console.log(pairSum2([2, 7, 11, 15], 26));
