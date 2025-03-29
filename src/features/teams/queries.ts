import { queryOptions } from '@tanstack/react-query'
import { NewTeam, Team } from './types'

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

export const teamsQueryOptions = queryOptions({
  queryKey: ['teams'],
  queryFn: () => getTeams(),
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5, // 5 minutes
})

/* Active team */
const activateTeam = async (id: number) => {
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
  mutationFn: (id: number) => activateTeam(id),
}

const getTeam = async (id: number) => {
  const res = await fetch(`${API_URL}/teams/${id}`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return (await res.json()) as Team
}

export const teamQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['teams', 'active', id],
    queryFn: () => getTeam(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

/* Create team */
const createTeamFn = async (team: NewTeam) => {
  const res = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return res.json()
}

export const createTeamQueryOptions = {
  mutationKey: ['teams', 'create'],
  mutationFn: (team: NewTeam) => createTeamFn(team),
}

/* Delete team */
const deleteTeam = async (id: number) => {
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return res.json()
}

export const deleteTeamQueryOptions = {
  mutationKey: ['teams', 'delete'],
  mutationFn: (id: number) => deleteTeam(id),
}
