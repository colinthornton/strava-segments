import { snakeToCamel, toParamString } from '../../src/data/utils';

describe('snakeToCamel', () => {
  test.each([
    [{ snake_case: 0 }, { snakeCase: 0 }],
    [
      { snake_case: 0, camelCase: 1 },
      { snakeCase: 0, camelCase: 1 },
    ],
    [{ the_value_for_this_key_is_zero: 0 }, { theValueForThisKeyIsZero: 0 }],
    [
      { CAPITAL_SNAKES: 0, lowercase_snakes: 1, half_CAPITALS: 2 },
      { capitalSnakes: 0, lowercaseSnakes: 1, halfCapitals: 2 },
    ],
  ])(
    'should return an object with snake_case keys converted to camelCase',
    (input, expected) => {
      expect(snakeToCamel(input)).toStrictEqual(expected);
    },
  );
});

describe('toParamString', () => {
  test.each([
    [{ key: 'value' }, 'key=value'],
    [
      {
        key: 'value',
        anotherKey: 'anotherValue',
      },
      'key=value&anotherKey=anotherValue',
    ],
    [{}, ''],
    [{ 1: 1, 2: 2, string: 'string' }, '1=1&2=2&string=string'],
  ])('should return an object in param string form', (input, expected) => {
    expect(toParamString(input)).toBe(expected);
  });
});
