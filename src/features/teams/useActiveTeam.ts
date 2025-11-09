import { useQuery } from '@tanstack/react-query'
import { activeTeamQueryOptions } from './queries'

export const useActiveTeam = () => {
  const { data, isPending, error } = useQuery(activeTeamQueryOptions())

  return {
    activeTeam: data,
    activeTeamLoading: isPending,
    activeTeamError: error,
  }
}
