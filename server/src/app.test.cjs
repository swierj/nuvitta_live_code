const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createApp } = require('./app.cjs')

test('Vercel entry serves catalog routes and JSON API errors without starting its own listener', async t => {
  const app = require('../../api/index.js')
  const server = app.listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const base = `http://127.0.0.1:${server.address().port}`
  const health = await fetch(`${base}/api/health`)
  assert.deepEqual(await health.json(), { status: 'ok', mode: 'storefront-preview' })
  const products = await (await fetch(`${base}/api/products`)).json()
  assert.equal(products.length, 31)
  const detail = await (await fetch(`${base}/api/products/makeup-cleansing-oil`)).json()
  assert.equal(detail.price, 2700)
  const missing = await fetch(`${base}/api/unknown`)
  assert.equal(missing.status, 404)
  assert.deepEqual(await missing.json(), { error: 'API route not found' })
})
test('catalog serves stable product IDs and controlled missing-product responses', async t => {
  const server = createApp().listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const base = `http://127.0.0.1:${server.address().port}`
  const products = await (await fetch(`${base}/api/products`)).json()
  assert.equal(products.length, 31)
  assert.equal(new Set(products.map(p => p.id)).size, 31)
  assert.ok(products.every(p => Number.isInteger(p.price) && p.price > 0))
  const detail = await (await fetch(`${base}/api/products/makeup-cleansing-oil`)).json()
  assert.equal(detail.id, 'makeup-cleansing-oil')
  assert.equal(detail.price, 2700)
  const missing = await fetch(`${base}/api/products/unknown`)
  assert.equal(missing.status, 404)
  assert.deepEqual(await missing.json(), { error: 'Product not found' })
  assert.equal((await fetch(`${base}/api/unknown`)).status, 404)
})
test('migration retains original product text, prices, photos, and bundle membership', () => {
  const fs = require('node:fs')
  const path = require('node:path')
  const original = require('../../shared/original-catalog.json')
  const catalog = require('../../shared/catalog.json')
  assert.equal(catalog.filter(p => p.bundle).length, 4)
  assert.equal(catalog.filter(p => !p.bundle).length, 27)
  for (const source of original) {
    const product = catalog.find(p => p.legacyId === source.id)
    assert.ok(product, source.name)
    for (const key of ['name', 'price', 'category', 'superIngr', 'prodHighlight', 'keyFeatures', 'skinType', 'warnings', 'prodDesc', 'prodDirec', 'prodIngr', 'reviews', 'includedProducts', 'sizeProducts', 'priceProducts']) {
      const expected = key === 'prodDirec' ? source[key]?.replaceAll('NuVitta', 'NuvitaGlo') : source[key]
      assert.deepEqual(product[key], expected, `${source.name}: ${key}`)
    }
    assert.equal(product.description, source.prodDesc ?? source.description ?? '')
    if (!product.bundle) assert.equal(product.size, source.size)
    assert.ok(fs.existsSync(path.resolve(__dirname, '../../client/public', '.' + product.image)))
    if (product.bundle) assert.deepEqual(product.items.map(id => catalog.find(p => p.id === id)?.name), source.includedProducts)
  }
})
