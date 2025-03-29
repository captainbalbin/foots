import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'

const app = new Hono()

app.use('*', cors())

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

app.get('/api/teams', async (c) => {
  const { data, error } = await supabase.from('teams').select()

  if (error) {
    console.error(error.message)
    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.get('api/teams/:teamId', async (c) => {
  const teamId = Number(c.req.param('teamId'))

  const { data, error } = await supabase.from('teams').select().eq('id', teamId)

  if (error) {
    console.error(error.message)

    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.delete('api/teams/:teamId', async (c) => {
  const teamId = Number(c.req.param('teamId'))

  const { data: team, error: fetchError } = await supabase
    .from('teams')
    .select('active')
    .eq('id', teamId)
    .single()

  if (fetchError) {
    console.error(fetchError.message)
    return c.json({ error: fetchError.message }, 500)
  }

  if (team?.active) {
    return c.json({ error: 'Cannot delete an active team' }, 400)
  }

  const { data, error } = await supabase.from('teams').delete().eq('id', teamId)

  if (error) {
    console.error(error.message)
    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.post('api/teams', async (c) => {
  const newTeam = await c.req.json()

  const { data, error } = await supabase
    .from('teams')
    .insert({ name: newTeam.name })

  if (error) {
    console.error(error.message)

    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.put('api/teams/:teamId/activate', async (c) => {
  const teamId = Number(c.req.param('teamId'))

  const { error: deactivateError } = await supabase
    .from('teams')
    .update({ active: false })
    .neq('id', teamId)

  if (deactivateError) {
    console.error(deactivateError.message)
    return c.json({ error: deactivateError.message }, 500)
  }

  const { error: activateError } = await supabase
    .from('teams')
    .update({ active: true })
    .eq('id', teamId)

  if (activateError) {
    console.error(activateError.message)
    return c.json({ error: activateError.message }, 500)
  }

  return c.json({ message: 'Team updated successfully' })
})

app.get('/api/players', async (c) => {
  const { data, error } = await supabase.from('players').select()
  if (error) {
    console.error(error.message)
    return c.json({ error: error.message }, 500)
  }
  return c.json(data)
})

app.post('api/players', async (c) => {
  const newPlayer = await c.req.json()

  const { data, error } = await supabase.from('players').insert(newPlayer)

  if (error) {
    console.error(error.message)

    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

app.delete('api/players/:playerId', async (c) => {
  const playerId = Number(c.req.param('playerId'))
  const { data, error } = await supabase
    .from('players')
    .delete()
    .eq('id', playerId)

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

// eslint-disable-next-line no-console
console.log('Server running on http://localhost:3000')
