import { useQuery } from '@tanstack/react-query'
import { teamsQueryOptions } from './queries'

export const useTeams = () => {
  const { data, isPending, error } = useQuery(teamsQueryOptions)

  return {
    teams: data,
    isPending,
    error,
  }
}
