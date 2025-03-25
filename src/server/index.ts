import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createClient } from '@supabase/supabase-js'

const app = new Hono()

app.use('*', cors())

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/api/teams', async (c) => {
  const { data, error } = await supabase.from('Teams').select()

  if (error) {
    console.error(error.message)
    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.get('api/team/:team', async (c) => {
  const team = c.req.param('team')

  const { data, error } = await supabase.from('Teams').select().eq('id', team)

  if (error) {
    console.error(error.message)

    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

console.log('Server running on http://localhost:3000')
