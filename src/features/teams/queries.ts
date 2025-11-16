import { queryOptions } from '@tanstack/react-query'
import { Team, Player } from '@/lib/types'

const API_URL = 'http://localhost:3000/api'

/* Get all teams */
export const getTeams = async () => {
  const res = await fetch(`${API_URL}/teams`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return await res.json()
}

export const teamsQueryOptions = queryOptions<Team[]>({
  queryKey: ['teams'],
  queryFn: () => getTeams(),
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: false,
})

/* Active team */
const activateTeam = async (id: string) => {
  const res = await fetch(`${API_URL}/teams/${id}/activate`, {
    method: 'PUT',
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return await res.json()
}

export const activateTeamQueryOptions = {
  mutationKey: ['teams', 'activate'],
  mutationFn: (id: string) => activateTeam(id),
}

const getTeam = async (id?: string) => {
  if (!id) {
    throw new Error('No team ID provided')
  }

  const res = await fetch(`${API_URL}/teams/${id}`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return (await res.json()) as Team
}

export const teamQueryOptions = (id?: string) =>
  queryOptions({
    queryKey: ['teams', id],
    queryFn: () => getTeam(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

const getActiveTeam = async () => {
  const res = await fetch(`${API_URL}/teams/active`)

  if (!res.ok) {
    const error = await res.json()

    throw new Error(error)
  }

  return await res.json()
}

export const activeTeamQueryOptions = () =>
  queryOptions<Team>({
    queryKey: ['teams', 'active'],
    queryFn: () => getActiveTeam(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })

const getPlayersByTeam = async (teamId?: string, date?: string) => {
  const res = await fetch(`${API_URL}/teams/${teamId}/players?date=${date}`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return (await res.json()) as Player[]
}

export const teamPlayersQueryOptions = (teamId?: string, date?: string) =>
  queryOptions<Player[]>({
    queryKey: ['teams', teamId, 'players', date],
    queryFn: () => getPlayersByTeam(teamId, date),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
