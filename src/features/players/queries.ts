import { queryOptions } from '@tanstack/react-query'
import { NewPlayer, UpdatePlayer } from './types'
import { Player } from '@/lib/types'

const API_URL = 'http://localhost:3000/api/players'

const getPlayers = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

export const playersQueryOptions = queryOptions<Player[]>({
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

const deletePlayer = async (id: string) => {
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
  mutationFn: (id: string) => deletePlayer(id),
}

const updatePlayer = async (id: string, player: UpdatePlayer) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
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

export const updatePlayerQueryOptions = {
  mutationKey: ['players', 'update'],
  mutationFn: (id: string, player: UpdatePlayer) => updatePlayer(id, player),
}

const getPlayer = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  const player = await response.json()
  return player as Player
}

export const playerQueryOptions = (id: number) =>
  queryOptions<Player>({
    queryKey: ['players', id],
    queryFn: () => getPlayer(id),
  })
