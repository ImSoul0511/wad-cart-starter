export function cartTotal(items = [], options = {}) {
  if (!items || items.length === 0) {
    return 0
  }

  const vatRate = options.vatRate ?? 0
  const freeShipFrom = options.freeShipFrom ?? Infinity
  const shipFee = options.shipFee ?? 0

  let subtotal = 0
  for (const item of items) {
    if (typeof item.price !== 'number' || item.price < 0) {
      throw new RangeError('Item price must be a non-negative number')
    }
    if (typeof item.qty !== 'number' || !Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('Item quantity must be a positive integer')
    }
    subtotal += item.price * item.qty
  }

  const vat = subtotal * vatRate
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee
  const total = subtotal + vat + shipping

  return Math.round(total)
}

