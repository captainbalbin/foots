import { queryOptions } from '@tanstack/react-query'
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
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 3600 * 5,
})

const getPlayer = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  const player = await response.json()
  return player as Player
}

export const playerQueryOptions = (id: string) =>
  queryOptions<Player>({
    queryKey: ['players', id],
    queryFn: () => getPlayer(id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 3600 * 5,
  })
