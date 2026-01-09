/**
 * Checks whether the value represents a valid numeric range.
 * A valid range has numeric finite `start` and `end` properties,
 * where start is less than or equal to end.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid range object.
 */
export function isRangeTest (x) {
  return !!(
    x &&
    typeof x.start === 'number' &&
    typeof x.end === 'number' &&
    Number.isFinite(x.start) &&
    Number.isFinite(x.end) &&
    x.start <= x.end &&
    Math.abs(x.end - x.start) >= 0
  )
}

/**
 * Checks whether the value is a valid non-negative even index.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid index.
 */
export function isIndexTest (x) {
  return (
    Number.isInteger(x) &&
    x >= 0 &&
    (x & 1) === 0
  )
}

/**
 * Checks whether the value is a boolean.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is boolean.
 */
export function isBooleanTest (x) {
  return typeof x === 'boolean' && (x === true || x === false)
}

/**
 * Checks whether the value represents a numeric result set.
 * A valid result set contains a non-empty array of finite numbers
 * with a non-zero average value.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid result set.
 */
export function isResultSetTest (x) {
  return !!(
    x &&
    Array.isArray(x.values) &&
    x.values.length > 0 &&
    x.values.every(v =>
      typeof v === 'number' &&
      Number.isFinite(v)
    ) &&
    average(x.values) !== 0
  )
}

/**
 * Checks whether the value represents a help object.
 * The help text must be a string longer than 5 characters
 * and start with an uppercase letter.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid help object.
 */
export function isHelpTest (x) {
  return !!(
    x &&
    typeof x.text === 'string' &&
    x.text.length > 5 &&
    /^[A-Z]/.test(x.text)
  )
}

/**
 * Checks whether the value is a function that returns a finite number.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a numeric function.
 */
export function isFunctionTest (x) {
  return (
    typeof x === 'function' &&
    x.length >= 0 &&
    Number.isFinite(x(0))
  )
}

/**
 * Checks whether the value is a valid date not in the future.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid Date object.
 */
export function isDateTest (x) {
  return (
    x instanceof Date &&
    !isNaN(x.getTime()) &&
    x.getTime() <= Date.now()
  )
}

/**
 * Checks whether the value is a valid regular expression.
 * The RegExp must have a non-empty pattern and be executable.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid RegExp.
 */
export function isRegExpTest (x) {
  return (
    x instanceof RegExp &&
    x.source.length > 0 &&
    x.test('test') !== undefined
  )
}

/**
 * Checks whether the value is a non-empty object
 * containing at least one non-zero numeric property.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is a valid object.
 */
export function isObjectTest (x) {
  return !!(
    x &&
    typeof x === 'object' &&
    !Array.isArray(x) &&
    Object.keys(x).length > 0 &&
    Object.values(x).some(v =>
      typeof v === 'number' && Math.abs(v) > 0
    )
  )
}

/**
 * Checks whether the value is null.
 *
 * @param {unknown} x
 * @returns {boolean} True if x is null.
 */
export function isNullTest (x) {
  return x === null || Object.is(x, null)
}

/**
 * Computes the average value of a numeric array.
 *
 * @param {Array.<number>} arr
 * @returns {number} Arithmetic mean of the array.
 */
function average (arr) {
  return arr.reduce((s, v) => s + v, 0) / arr.length
}
