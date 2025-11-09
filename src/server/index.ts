import { Hono } from 'hono'
import { cors } from 'hono/cors'
import pb from './pocketbase'

import type { Team } from '@/lib/types'
import type { TeamExpand } from './pocketbase-types'
import { te } from 'date-fns/locale'

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
 * Get active team
 */
app.get('api/teams/active', async (c) => {
  try {
    const team = await pb
      .collection('teams')
      .getFirstListItem<TeamExpand>('active=true')

    if (!team) {
      return c.json({ error: 'No active teams found' }, 404)
    }

    return c.json(team)
  } catch (err) {
    return c.json({ error: err }, 500)
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

    const players = await pb.collection('player_stats').getFullList({
      filter: `team = "${teamId}"`,
      fields:
        'id,player,team,age,position,overall,potential,market_value,wage,foot,release_clause,kit_number,expand',
      expand: 'player',
    })

    if (!players) {
      return c.json({ error: 'Team not found' }, 404)
    }

    return c.json(players)
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
app.put('api/teams/:teamId/activate', async (c) => {
  try {
    const teamId = c.req.param('teamId')

    const team = await pb.collection('teams').getOne<TeamExpand>(String(teamId))

    if (!team) {
      return c.json({ error: 'Team not found' }, 404)
    }

    const activeTeam = await pb
      .collection('teams')
      .getFirstListItem<TeamExpand>('active=true')

    try {
      if (activeTeam) {
        await pb.collection('teams').update(activeTeam.id, { active: false })
      }

      await pb.collection('teams').update(teamId, { active: true })

      return c.json({ message: 'Team activated successfully' })
    } catch (err: unknown) {
      console.error(err)
      return c.json({ error: err ?? String(err) }, 500)
    }
  } catch (err: unknown) {
    console.error(err)
    return c.json({ error: err ?? String(err) }, 500)
  }
})

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
app.post('api/players', async (c) => {
  try {
    const player = await c.req.json()

    await pb.collection('players').create(player)

    return c.json({ message: 'Player created successfully' })
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

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
app.delete('api/players/:playerId', async (c) => {
  const playerId = c.req.param('playerId')

  try {
    const deletedPlayer = await pb.collection('players').delete(playerId)

    return c.json(deletedPlayer)
  } catch (err: unknown) {
    console.error(err)

    return c.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      500
    )
  }
})

/**
 * Update player by ID
 */
app.patch('api/players/:playerId', async (c) => {
  try {
    const player = await pb
      .collection('players')
      .getOne<Team>(c.req.param('playerId'))

    if (!player) {
      return c.json({ error: 'Player not found' }, 404)
    }

    return c.json(player)
  } catch (err: unknown) {
    console.error(err)

    return c.json({ error: err ?? String(err) }, 500)
  }
})

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

// eslint-disable-next-line no-console
console.log('Server running on http://localhost:3000')
