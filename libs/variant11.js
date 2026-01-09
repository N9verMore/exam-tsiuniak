/**
 * Splits an array into equal-sized chunks.
 * @param {Array.<any>} array   Input array.
 * @param {number} size         Chunk size.
 * @throws {Error}              If chunking is impossible.
 * @returns {Array.<Array>}     Chunked array.
 */
export function chunkArray (array, size) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array')
  }

  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('Chunk size must be a positive integer')
  }

  if (array.length % size !== 0) {
    throw new Error('Array length must be divisible by chunk size')
  }

  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}
/**
 * Reduces an array of numbers using sum or product.
 * @param {Array.<number>} values   Numeric values.
 * @param {'sum'|'product'} mode    Reduction mode.
 * @throws {Error}                  If input is invalid.
 * @returns {number}                Reduction result.
 */
export function reduceValues (values, mode) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Values must be a non-empty array')
  }

  if (!values.every(Number.isFinite)) {
    throw new Error('Values must be finite numbers')
  }

  if (mode === 'sum') {
    return values.reduce((a, b) => a + b, 0)
  }

  if (mode === 'product') {
    return values.reduce((a, b) => a * b, 1)
  }

  throw new Error('Unknown reduction mode: ' + mode)
}
/**
 * Checks whether two shapes are compatible by total size.
 * @param {Array.<number>} a   First shape.
 * @param {Array.<number>} b   Second shape.
 * @returns {boolean}          True if compatible.
 */
export function areShapesCompatible (a, b) {
  return computeShapeLength(a) === computeShapeLength(b)
}
/**
 * Computes total length of a multidimensional shape.
 * @param {Array.<number>} shape   Sizes of each dimension.
 * @throws {Error}                 If shape is invalid.
 * @returns {number}               Total number of elements.
 */
export function computeShapeLength (shape) {
  if (!Array.isArray(shape) || shape.length === 0) {
    throw new Error('Shape must be a non-empty array')
  }

  if (!shape.every(n => Number.isInteger(n) && n > 0)) {
    throw new Error('Shape values must be positive integers')
  }

  return shape.reduce((acc, v) => acc * v, 1)
}
/**
 * Ensures indexes are valid and normalized to start from zero.
 * @param {Array.<number>} indexes   Array of integer indexes.
 * @throws {Error}                   If indexes are invalid.
 * @returns {Array.<number>}         Normalized indexes.
 */
export function normalizeIndexes (indexes) {
  if (!Array.isArray(indexes) || indexes.length === 0) {
    throw new Error('Indexes must be a non-empty array')
  }

  if (!indexes.every(Number.isInteger)) {
    throw new Error('Indexes must be integers')
  }

  const min = Math.min(...indexes)

  return indexes.map(i => i - min)
}
/**
 * Normalizes a numeric range array to [min, max].
 * @param {Array.<number>} range   Array with two numeric values.
 * @throws {Error}                 If input is invalid.
 * @returns {Array.<number>}       Normalized range.
 */
export function normalizeRange (range) {
  if (!Array.isArray(range) || range.length !== 2) {
    throw new Error('Range must be an array of two numbers')
  }

  const [a, b] = range

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Range values must be finite numbers')
  }

  return a <= b ? [a, b] : [b, a]
}
