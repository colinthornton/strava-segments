function convertSnakeToCamel(snake) {
  return snake
    .split('_')
    .map((word, i) => {
      if (i === 0) {
        return word;
      }
      return word.slice(0, 1).toUpperCase() + word.slice(1);
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
