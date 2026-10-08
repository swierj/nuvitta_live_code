const { createApp } = require('../server/src/app.cjs')

// Vercel invokes this app per request; the local server keeps its own listener.
module.exports = createApp()
