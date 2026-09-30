import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

test('calculates total for worked example', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 }
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

test('returns 0 for an empty cart', () => {
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal([], options), 0)
})

test('provides free shipping when subtotal equals freeShipFrom threshold', () => {
  const items = [{ name: 'Item', price: 500000, qty: 1 }]
  const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 500000)
})

test('throws RangeError when item price is negative', () => {
  const items = [{ name: 'Item', price: -100, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => cartTotal(items, options),
    RangeError
  )
})

test('throws RangeError when quantity is zero or negative', () => {
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => cartTotal([{ name: 'Item', price: 1000, qty: 0 }], options),
    RangeError
  )
  assert.throws(
    () => cartTotal([{ name: 'Item', price: 1000, qty: -2 }], options),
    RangeError
  )
})

test('throws RangeError when quantity is not a integer or not a number', () => {
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => cartTotal([{ name: 'Item', price: 1000, qty: 1.5 }], options),
    RangeError
  )
  assert.throws(
    () => cartTotal([{ name: 'Item', price: 1000, qty: '1' }], options),
    RangeError
  )
})

