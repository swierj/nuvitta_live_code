export const CART_KEY = 'nuvitta-preview-cart-v1'
export const MAX_QUANTITY = 20
export function readCart(storage) {
  try {
    const data = JSON.parse(storage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(data)) return []
    const ids = new Set()
    return data.filter(item => {
      if (!item || typeof item.id !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY || ids.has(item.id)) return false
      ids.add(item.id)
      return true
    }).map(({ id, quantity }) => ({ id, quantity }))
  } catch { return [] }
}
export function updateCart(cart, id, quantity) {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QUANTITY) return cart
  const rest = cart.filter(item => item.id !== id)
  return quantity === 0 ? rest : [...rest, { id, quantity }]
}
