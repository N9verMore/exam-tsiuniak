import { describe, test, expect } from '@jest/globals'
import {
  isNumber,
  isBigNumber,
  isComplex,
  isFraction,
  isUnit,
  isString,
  isArray,
  isMatrix,
  isCollection,
  isDenseMatrix,
  isSparseMatrix
} from './variant1.js'

describe('variant1 - Type Checking Functions', () => {

  describe('isNumber', () => {
    test('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(42)).toBe(true)
      expect(isNumber(-10)).toBe(true)
      expect(isNumber(3.14)).toBe(true)
      expect(isNumber(-2.5)).toBe(true)
      expect(isNumber(Infinity)).toBe(true)
      expect(isNumber(-Infinity)).toBe(true)
      expect(isNumber(NaN)).toBe(true)
    })

    test('should return false for non-numbers', () => {
      expect(isNumber('42')).toBe(false)
      expect(isNumber('string')).toBe(false)
      expect(isNumber(true)).toBe(false)
      expect(isNumber(false)).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
      expect(isNumber([])).toBe(false)
      expect(isNumber({})).toBe(false)
      expect(isNumber([1, 2, 3])).toBe(false)
    })
  })

  describe('isBigNumber', () => {
    test('should return false for non-objects', () => {
      expect(isBigNumber(42)).toBe(false)
      expect(isBigNumber('string')).toBe(false)
      expect(isBigNumber(null)).toBe(false)
      expect(isBigNumber(undefined)).toBe(false)
      expect(isBigNumber(true)).toBe(false)
    })

    test('should return false for objects without constructor', () => {
      const obj = Object.create(null)
      expect(isBigNumber(obj)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isBigNumber({})).toBe(false)
      expect(isBigNumber({ value: 42 })).toBe(false)
    })

    test('should return true for BigNumber objects with isBigNumber property', () => {
      function BigNumber() {}
      BigNumber.prototype.isBigNumber = true

      const bn = new BigNumber()
      bn.isBigNumber = true

      expect(isBigNumber(bn)).toBe(true)
    })

    test('should return true for Decimal objects', () => {
      function Decimal(value) {
        this.value = value
      }
      Decimal.isDecimal = function(x) {
        return x instanceof Decimal
      }

      const dec = new Decimal(42)
      expect(isBigNumber(dec)).toBe(true)
    })

    test('should return false for objects without proper BigNumber structure', () => {
      const obj = {
        isBigNumber: true,
        constructor: {}
      }
      expect(isBigNumber(obj)).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isBigNumber([])).toBe(false)
      expect(isBigNumber([1, 2, 3])).toBe(false)
    })
  })

  describe('isComplex', () => {
    test('should return false for non-objects', () => {
      expect(isComplex(42)).toBe(false)
      expect(isComplex('string')).toBe(false)
      expect(isComplex(null)).toBe(false)
      expect(isComplex(undefined)).toBe(false)
      expect(isComplex(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isComplex({})).toBe(false)
      expect(isComplex({ real: 1, imag: 2 })).toBe(false)
    })

    test('should return true for Complex objects', () => {
      function Complex(real, imag) {
        this.real = real
        this.imag = imag
      }
      Complex.prototype.isComplex = true

      const c = new Complex(1, 2)
      expect(isComplex(c)).toBe(true)
    })

    test('should return false for objects without isComplex on prototype', () => {
      const obj = {
        isComplex: true,
        real: 1,
        imag: 2
      }
      expect(isComplex(obj)).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isComplex([])).toBe(false)
      expect(isComplex([1, 2])).toBe(false)
    })
  })

  describe('isFraction', () => {
    test('should return false for non-objects', () => {
      expect(isFraction(42)).toBe(false)
      expect(isFraction(3.14)).toBe(false)
      expect(isFraction('1/2')).toBe(false)
      expect(isFraction(null)).toBe(false)
      expect(isFraction(undefined)).toBe(false)
      expect(isFraction(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isFraction({})).toBe(false)
      expect(isFraction({ numerator: 1, denominator: 2 })).toBe(false)
    })

    test('should return true for Fraction objects', () => {
      function Fraction(numerator, denominator) {
        this.numerator = numerator
        this.denominator = denominator
      }
      Fraction.prototype.isFraction = true

      const f = new Fraction(1, 2)
      expect(isFraction(f)).toBe(true)
    })

    test('should return false for objects without isFraction on prototype', () => {
      const obj = {
        isFraction: true,
        numerator: 1,
        denominator: 2
      }
      expect(isFraction(obj)).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isFraction([])).toBe(false)
      expect(isFraction([1, 2])).toBe(false)
    })
  })

  describe('isUnit', () => {
    test('should return false for non-objects', () => {
      expect(isUnit(42)).toBe(false)
      expect(isUnit('5 cm')).toBe(false)
      expect(isUnit(null)).toBe(false)
      expect(isUnit(undefined)).toBe(false)
      expect(isUnit(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isUnit({})).toBe(false)
      expect(isUnit({ value: 5, unit: 'cm' })).toBe(false)
    })

    test('should return true for Unit objects', () => {
      function Unit(value, unit) {
        this.value = value
        this.unit = unit
      }
      Unit.prototype.isUnit = true

      const u = new Unit(5, 'cm')
      expect(isUnit(u)).toBe(true)
    })

    test('should return false for objects without isUnit on prototype', () => {
      const obj = {
        isUnit: true,
        value: 5,
        unit: 'cm'
      }
      expect(isUnit(obj)).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isUnit([])).toBe(false)
      expect(isUnit([5, 'cm'])).toBe(false)
    })

    test('should return false for null and undefined', () => {
      expect(isUnit(null)).toBe(false)
      expect(isUnit(undefined)).toBe(false)
    })
  })

  describe('isString', () => {
    test('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString('42')).toBe(true)
      expect(isString('true')).toBe(true)
      expect(isString(' ')).toBe(true)
      expect(isString('Hello World')).toBe(true)
    })

    test('should return false for non-strings', () => {
      expect(isString(42)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(false)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString(['hello'])).toBe(false)
    })

    test('should return false for String objects', () => {
      expect(isString(new String('hello'))).toBe(false)
    })
  })

  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(['a', 'b', 'c'])).toBe(true)
      expect(isArray([1, 'two', true])).toBe(true)
      expect(isArray([[1, 2], [3, 4]])).toBe(true)
      expect(isArray(new Array(5))).toBe(true)
    })

    test('should return false for non-arrays', () => {
      expect(isArray(42)).toBe(false)
      expect(isArray('array')).toBe(false)
      expect(isArray(true)).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray({})).toBe(false)
      expect(isArray({ 0: 'a', 1: 'b', length: 2 })).toBe(false)
    })
  })

  describe('isMatrix', () => {
    test('should return false for non-objects', () => {
      expect(isMatrix(42)).toBe(false)
      expect(isMatrix('matrix')).toBe(false)
      expect(isMatrix(null)).toBe(false)
      expect(isMatrix(undefined)).toBe(false)
      expect(isMatrix(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isMatrix({})).toBe(false)
      expect(isMatrix({ data: [[1, 2], [3, 4]] })).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isMatrix([])).toBe(false)
      expect(isMatrix([1, 2, 3])).toBe(false)
      expect(isMatrix([[1, 2], [3, 4]])).toBe(false)
    })

    test('should return true for Matrix objects', () => {
      function Matrix(data) {
        this.data = data
      }
      Matrix.prototype.isMatrix = true

      const m = new Matrix([[1, 2], [3, 4]])
      expect(isMatrix(m)).toBe(true)
    })

    test('should return false for objects without isMatrix on prototype', () => {
      const obj = {
        isMatrix: true,
        data: [[1, 2], [3, 4]]
      }
      expect(isMatrix(obj)).toBe(false)
    })
  })

  describe('isCollection', () => {
    test('should return true for arrays', () => {
      expect(isCollection([])).toBe(true)
      expect(isCollection([1, 2, 3])).toBe(true)
      expect(isCollection(['a', 'b', 'c'])).toBe(true)
      expect(isCollection([[1, 2], [3, 4]])).toBe(true)
    })

    test('should return true for Matrix objects', () => {
      function Matrix(data) {
        this.data = data
      }
      Matrix.prototype.isMatrix = true

      const m = new Matrix([[1, 2], [3, 4]])
      expect(isCollection(m)).toBe(true)
    })

    test('should return false for non-collections', () => {
      expect(isCollection(42)).toBe(false)
      expect(isCollection('string')).toBe(false)
      expect(isCollection(null)).toBe(false)
      expect(isCollection(undefined)).toBe(false)
      expect(isCollection(true)).toBe(false)
      expect(isCollection({})).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isCollection({ 0: 'a', 1: 'b', length: 2 })).toBe(false)
    })
  })

  describe('isDenseMatrix', () => {
    test('should return false for non-objects', () => {
      expect(isDenseMatrix(42)).toBe(false)
      expect(isDenseMatrix('matrix')).toBe(false)
      expect(isDenseMatrix(null)).toBe(false)
      expect(isDenseMatrix(undefined)).toBe(false)
      expect(isDenseMatrix(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isDenseMatrix({})).toBe(false)
      expect(isDenseMatrix({ data: [[1, 2], [3, 4]] })).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isDenseMatrix([])).toBe(false)
      expect(isDenseMatrix([1, 2, 3])).toBe(false)
      expect(isDenseMatrix([[1, 2], [3, 4]])).toBe(false)
    })

    test('should return true for DenseMatrix objects', () => {
      function DenseMatrix(data) {
        this.data = data
        this.isDenseMatrix = true
      }
      DenseMatrix.prototype.isMatrix = true

      const dm = new DenseMatrix([[1, 2], [3, 4]])
      expect(isDenseMatrix(dm)).toBe(true)
    })

    test('should return false for Matrix objects without isDenseMatrix', () => {
      function Matrix(data) {
        this.data = data
      }
      Matrix.prototype.isMatrix = true

      const m = new Matrix([[1, 2], [3, 4]])
      expect(isDenseMatrix(m)).toBe(false)
    })

    test('should return false for objects without isMatrix on prototype', () => {
      const obj = {
        isDenseMatrix: true,
        isMatrix: true,
        data: [[1, 2], [3, 4]]
      }
      expect(isDenseMatrix(obj)).toBe(false)
    })
  })

  describe('isSparseMatrix', () => {
    test('should return false for non-objects', () => {
      expect(isSparseMatrix(42)).toBe(false)
      expect(isSparseMatrix('matrix')).toBe(false)
      expect(isSparseMatrix(null)).toBe(false)
      expect(isSparseMatrix(undefined)).toBe(false)
      expect(isSparseMatrix(true)).toBe(false)
    })

    test('should return false for plain objects', () => {
      expect(isSparseMatrix({})).toBe(false)
      expect(isSparseMatrix({ data: [[1, 2], [3, 4]] })).toBe(false)
    })

    test('should return false for arrays', () => {
      expect(isSparseMatrix([])).toBe(false)
      expect(isSparseMatrix([1, 2, 3])).toBe(false)
      expect(isSparseMatrix([[1, 2], [3, 4]])).toBe(false)
    })

    test('should return true for SparseMatrix objects', () => {
      function SparseMatrix(data) {
        this.data = data
        this.isSparseMatrix = true
      }
      SparseMatrix.prototype.isMatrix = true

      const sm = new SparseMatrix([[1, 0], [0, 4]])
      expect(isSparseMatrix(sm)).toBe(true)
    })

    test('should return false for Matrix objects without isSparseMatrix', () => {
      function Matrix(data) {
        this.data = data
      }
      Matrix.prototype.isMatrix = true

      const m = new Matrix([[1, 2], [3, 4]])
      expect(isSparseMatrix(m)).toBe(false)
    })

    test('should return false for DenseMatrix objects', () => {
      function DenseMatrix(data) {
        this.data = data
        this.isDenseMatrix = true
      }
      DenseMatrix.prototype.isMatrix = true

      const dm = new DenseMatrix([[1, 2], [3, 4]])
      expect(isSparseMatrix(dm)).toBe(false)
    })

    test('should return false for objects without isMatrix on prototype', () => {
      const obj = {
        isSparseMatrix: true,
        isMatrix: true,
        data: [[1, 2], [3, 4]]
      }
      expect(isSparseMatrix(obj)).toBe(false)
    })
  })
})
