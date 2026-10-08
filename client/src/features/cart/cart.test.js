import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readCart, updateCart } from './cart.js'
test('broken browser storage cannot prevent startup', () => {
  assert.deepEqual(readCart({ getItem: () => '{bad json' }), [])
  assert.deepEqual(readCart({ getItem: () => { throw new Error('blocked') } }), [])
})
test('stored cart drops invalid quantities and duplicates, and never retains prices', () => {
  const entries = [{ id: 'oil', quantity: 2, price: 1 }, { id: 'oil', quantity: 5 }, { id: 'serum', quantity: 0 }, { id: 'cream', quantity: 21 }, { id: 'other', quantity: 1.5 }, null]
  assert.deepEqual(readCart({ getItem: () => JSON.stringify(entries) }), [{ id: 'oil', quantity: 2 }])
})
test('cart enforces limits and removes an item at zero', () => {
  const cart = [{ id: 'oil', quantity: 2 }]
  assert.deepEqual(updateCart(cart, 'oil', -1), cart)
  assert.deepEqual(updateCart(cart, 'oil', 21), cart)
  assert.deepEqual(updateCart(cart, 'oil', 0), [])
  assert.deepEqual(updateCart(cart, 'oil', 3), [{ id: 'oil', quantity: 3 }])
})
