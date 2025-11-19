import { useQuery } from '@tanstack/react-query'
import { teamQueryOptions } from './queries'

export const useTeam = (id: string) => {
  const { data, isPending, error } = useQuery(teamQueryOptions(id))

  return {
    team: data,
    isPending,
    error,
  }
}
