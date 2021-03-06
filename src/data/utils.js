function convertSnakeToCamel(snake) {
  return snake
    .split('_')
    .map((word, i, words) => {
      // No snakes found
      if (words.length === 1) {
        return word;
      }

      if (i === 0) {
        return word.toLowerCase();
      }
      return (
        word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      );
    })
    .join('');
}

/**
 * Returns a new object with all the keys from `snakeKeyObj` converted to camel
 * case.
 * @param {Object} snakeKeyObj Object with keys in snake case (like_this)
 * @return {Object} Object with keys in camel case (likeThis)
 */
export function snakeToCamel(snakeKeyObj) {
  return Object.keys(snakeKeyObj).reduce((camelKeyObj, snakeKey) => {
    const camelKey = convertSnakeToCamel(snakeKey);
    return { ...camelKeyObj, [camelKey]: snakeKeyObj[snakeKey] };
  }, {});
}

/**
 * Returns a new string with `params`.
 * @param {Object} params Query parameter key:value pairs
 * @return {string} Params in the form `key=value&otherKey=otherValue`
 */
export function toParamString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
