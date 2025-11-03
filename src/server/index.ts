import { Hono } from 'hono'
import { cors } from 'hono/cors'
import pb from './pocketbase'
import { Team } from './pocketbase-types'

const app = new Hono()

app.use('*', cors())

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

/**
 * Get all teams
 */
app.get('api/teams', async (c) => {
  try {
    const teams = await pb.collection('teams').getFullList<Team>({
      fields: 'id,name,league,active',
    })

    if (!teams || !teams.length) {
      return c.json({ error: 'No teams found' }, 404)
    }

    return c.json(teams)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

/**
 * Get team by ID
 */
app.get('api/teams/:teamId', async (c) => {
  try {
    const team = await pb
      .collection('teams')
      .getOne<Team>(c.req.param('teamId'), {
        fields: 'id,name,league,active',
      })

    if (!team) {
      return c.json({ error: 'Team not found' }, 404)
    }

    return c.json(team)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

/**
 * Get players by team ID
 */
app.get('api/teams/:teamId/players', async (c) => {
  try {
    const teamId = c.req.param('teamId')
    const team = await pb.collection('teams').getOne<Team>(teamId, {
      fields: 'id,expand',
      expand: 'players',
    })

    if (!team) {
      return c.json({ error: 'Team not found' }, 404)
    }

    return c.json(team.expand?.players)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

/**
 * Delete team by ID
 */
app.delete('api/teams/:teamId', async (c) => {
  try {
    const teamId = c.req.param('teamId')

    const team = await pb.collection('teams').getOne<Team>(teamId)

    if (!team) {
      return c.json({ error: 'Team not found' }, 404)
    }

    if (team.active) {
      return c.json({ error: 'Cannot delete an active team' }, 400)
    }

    await pb.collection('teams').delete(teamId)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }

  return c.json({ message: 'Team deleted successfully' })
})

/**
 * Create new team
 */
app.post('api/teams', async (c) => {
  try {
    await pb.collection('teams').create(c.req.json())
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }

  return c.json({ message: 'Team created successfully' })
})

/**
 * Activate team by ID
 */
// app.put('api/teams/:teamId/activate', async (c) => {
//   const teamId = Number(c.req.param('teamId'))

//   const { error: deactivateError } = await supabase
//     .from('teams')
//     .update({ active: false })
//     .neq('id', teamId)

//   if (deactivateError) {
//     console.error(deactivateError.message)
//     return c.json({ error: deactivateError.message }, 500)
//   }

//   const { error: activateError } = await supabase
//     .from('teams')
//     .update({ active: true })
//     .eq('id', teamId)

//   if (activateError) {
//     console.error(activateError.message)
//     return c.json({ error: activateError.message }, 500)
//   }

//   return c.json({ message: 'Team updated successfully' })
// })

/**
 * Get all players
 */
app.get('api/players', async (c) => {
  try {
    const players = await pb.collection('players').getFullList<Team>({
      fields:
        'id,firstname,lastname,position,age,county,overall,potential,team,market_value,wage,foot,release_clause,kit_number',
    })

    if (!players?.length) {
      return c.json({ error: 'No teams found' }, 404)
    }

    return c.json(players)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

/**
 * Create new player
 */
// app.post('api/players', async (c) => {
//   const newPlayer = await c.req.json()

//   const { data, error } = await supabase.from('players').insert(newPlayer)

//   if (error) {
//     console.error(error.message)

//     return c.json({ error: error.message }, 500)
//   }

//   return c.json(data)
// })

/**
 * Get player by ID
 */
app.get('api/players/:playerId', async (c) => {
  try {
    const player = await pb
      .collection('players')
      .getOne<Team>(c.req.param('playerId'), {
        fields:
          'id,firstname,lastname,position,age,county,overall,potential,team,market_value,wage,foot,release_clause,kit_number',
      })

    if (!player) {
      return c.json({ error: 'Player not found' }, 404)
    }

    return c.json(player)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

/**
 * Delete player by ID
 */
// app.delete('api/players/:playerId', async (c) => {
//   const playerId = Number(c.req.param('playerId'))
//   const { data, error } = await supabase
//     .from('players')
//     .delete()
//     .eq('id', playerId)

//   if (error) {
//     console.error(error.message)
//     return c.json({ error: error.message }, 500)
//   }

//   return c.json(data)
// })

/**
 * Update player by ID
 */
// app.patch('api/players/:playerId', async (c) => {
//   const playerId = Number(c.req.param('playerId'))
//   const playerFields = await c.req.json()

//   const { data, error } = await supabase
//     .from('players')
//     .update({ ...playerFields })
//     .eq('id', playerId)

//   if (error) {
//     console.error(error.message)
//     return c.json({ error: error.message }, 500)
//   }

//   return c.json(data)
// })

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

// eslint-disable-next-line no-console
console.log('Server running on http://localhost:3000')
