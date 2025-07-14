const bracketVerifier = (str = '') => {
  const brackets = {
    normalBracket: {
      open: '(',
      close: ')',
      count: 0,
    },
    curlyBracket: {
      open: '{',
      close: '}',
      count: 0,
    },
    squareBracket: {
      open: '[',
      close: ']',
      count: 0,
    },
  };

  for (const bracket of str) {
    switch (bracket) {
      case brackets.normalBracket.open:
        brackets.normalBracket.count++;
        break;
      case brackets.curlyBracket.open:
        brackets.curlyBracket.count++;
        break;
      case brackets.squareBracket.open:
        brackets.squareBracket.count++;
        break;
      case brackets.curlyBracket.close:
        brackets.curlyBracket.count--;
        break;
      case brackets.normalBracket.close:
        brackets.normalBracket.count--;
        break;
      case brackets.squareBracket.close:
        brackets.squareBracket.count--;
        break;

      default:
        throw new Error(bracket + ' is not a valid bracket');

        break;
    }
  }
  return Object.values(brackets).every((objType) => objType.count === 0);
};

console.log(bracketVerifier('([)]]'));

/**
 * Solution 1: Using Object/Counter approach
 * Count opening and closing brackets for each type
 */
