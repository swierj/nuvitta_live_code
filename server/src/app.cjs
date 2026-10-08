const express = require('express')
const path = require('node:path')
const fs = require('node:fs')
const catalog = require('../../shared/catalog.json')
function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', mode: 'storefront-preview' }))
  app.get('/api/products', (_req, res) => res.json(catalog))
  app.get('/api/products/:id', (req, res) => {
    const product = catalog.find(item => item.id === req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  })
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }))
  const build = path.resolve(__dirname, '../../client/dist')
  app.use(express.static(build))
  app.get('*', (_req, res) => {
    if (fs.existsSync(path.join(build, 'index.html'))) return res.sendFile(path.join(build, 'index.html'))
    res.status(503).send('Run npm run dev, or npm run build before npm start.')
  })
  return app
}
module.exports = { createApp }
