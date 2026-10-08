const { createApp } = require('./app.cjs')
const port = process.env.PORT || 5000
createApp().listen(port, () => console.log(`NuVitta API listening on http://localhost:${port}`))
