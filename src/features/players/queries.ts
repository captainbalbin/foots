import { queryOptions } from '@tanstack/react-query'
import { NewPlayer } from './types'

const API_URL = 'http://localhost:3000/api/players'

const getPlayers = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

export const playersQueryOptions = queryOptions({
  queryKey: ['players'],
  queryFn: getPlayers,
})

const createPlayer = async (player: NewPlayer) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

export const createPlayerQueryOptions = {
  mutationKey: ['players', 'create'],
  mutationFn: (player: NewPlayer) => createPlayer(player),
}

const deletePlayer = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }
  return response.json()
}

export const deletePlayerQueryOptions = {
  mutationKey: ['players', 'delete'],
  mutationFn: (id: number) => deletePlayer(id),
}
