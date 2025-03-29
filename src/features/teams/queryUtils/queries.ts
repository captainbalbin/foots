import { queryOptions } from '@tanstack/react-query'
import { NewTeam } from '../types'

const API_URL = 'http://localhost:3000/api'

/* Get all teams */
export const getTeams = async () => {
  const res = await fetch(`${API_URL}/teams`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return await res.json()
}

export const teamsQueryOptions = queryOptions({
  queryKey: ['teams'],
  queryFn: () => getTeams(),
  refetchOnWindowFocus: false,
})

/* Active team */
const activateTeam = async (id: string) => {
  const res = await fetch(`${API_URL}/teams/${id}/activate`, {
    method: 'PUT',
  })
  if (!res.ok) {
    throw new Error('Failed to activate team')
  }
  return await res.json()
}

export const activateTeamQueryOptions = {
  mutationKey: ['teams', 'activate'],
  mutationFn: (id: string) => activateTeam(id),
}

/* Create team */

const createTeamFn = async (team: NewTeam) => {
  const response = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const createTeamQueryOptions = {
  mutationKey: ['teams', 'create'],
  mutationFn: (team: NewTeam) => createTeamFn(team),
}
