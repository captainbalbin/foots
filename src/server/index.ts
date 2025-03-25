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

app.get('api/team/:teamId', async (c) => {
  const teamId = c.req.param('teamId')

  const { data, error } = await supabase.from('Teams').select().eq('id', teamId)

  if (error) {
    console.error(error.message)

    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.put('api/team/:teamId/activate', async (c) => {
  const teamId = c.req.param('teamId')

  console.log('teamId', teamId)

  const { error: deactivateError } = await supabase
    .from('Teams')
    .update({ active: false })
    .neq('id', teamId) // TODO: Fix the update field not being changed

  if (deactivateError) {
    console.error(deactivateError.message)
    return c.json({ error: deactivateError.message }, 500)
  }

  const { error: activateError } = await supabase
    .from('Teams')
    .update({ active: true })
    .eq('id', teamId)

  if (activateError) {
    console.error(activateError.message)
    return c.json({ error: activateError.message }, 500)
  }

  return c.json({ message: 'Team updated successfully' })
})

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

console.log('Server running on http://localhost:3000')
