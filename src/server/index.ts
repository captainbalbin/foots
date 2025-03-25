import { Hono } from 'hono'

const app = new Hono()

// Simple API Endpoint
app.get('/', (c) => c.text('Hello, World!'))

app.get('/greet/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`Hello, ${name}!`)
})

// Bun Server
Bun.serve({
  fetch(req) {
    // Hono API
    return app.fetch(req)
  },
  port: 3000,
})

console.log('Server running on http://localhost:3000')
