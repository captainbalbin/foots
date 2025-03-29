import { useQuery } from '@tanstack/react-query'
import { playersQueryOptions } from './queries'

export const usePlayers = () => {
  const { data, error, isLoading } = useQuery(playersQueryOptions)

  return {
    players: data,
    playersLoading: isLoading,
    playersError: error,
  }
}
