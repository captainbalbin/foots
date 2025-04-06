import { useQuery } from '@tanstack/react-query'
import { playerQueryOptions } from './queries'

export const usePlayer = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery(playerQueryOptions(id))

  return {
    player: data,
    playerLoading: isLoading,
    playerError: error,
  }
}
