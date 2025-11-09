import { Hono } from 'hono'
import { cors } from 'hono/cors'
import pb from './pocketbase'

import { type Team } from '@/lib/types'
import type {
  PlayerBaseExpand,
  PlayerStatsExpand,
  TeamExpand,
} from './pocketbase-types'
import { formatPlayer, formatPlayers } from '@/lib/utils'

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
    const playersBase = await pb
      .collection('players')
      .getFullList<PlayerBaseExpand>({
        expand: 'country',
      })

    if (!playersBase?.length) {
      return c.json({ error: 'No players found' }, 404)
    }

    const playersStats = await pb
      .collection('player_stats')
      .getFullList<PlayerStatsExpand>({
        expand: 'team,on_loan,player',
      })

    const players = formatPlayers(playersBase, playersStats)

    return c.json(players)
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
    const playerId = c.req.param('playerId')

    const playerBase = await pb
      .collection('players')
      .getOne<PlayerBaseExpand>(playerId, {
        expand: 'country',
      })

    if (!playerBase) {
      return c.json({ error: 'Player not found' }, 404)
    }

    const playerStats = await pb
      .collection('player_stats')
      .getFullList<PlayerStatsExpand>({
        filter: `player = "${playerId}"`,
        expand: 'team,on_loan',
      })

    if (playerStats?.length > 1) {
      return c.json({ error: 'Multiple player stats found' }, 500)
    }

    const playerStat: PlayerStatsExpand | undefined = playerStats[0]

    const player = formatPlayer(playerBase, playerStat)

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
