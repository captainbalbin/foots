import { useQuery } from '@tanstack/react-query'
import { teamQueryOptions } from './queries'
import { Team } from '@/server/pocketbase-types'
import { useTeams } from './useTeams'

// TODO: should have it's own query to get the team filter based on active state
export const useActiveTeam = () => {
  const { teams } = useTeams()

  const teamId = teams?.find((team: Team) => team.active)?.id

  const { data, isPending, error } = useQuery({
    ...teamQueryOptions(teamId),
    enabled: !!teams && !!teamId,
  })

  return {
    activeTeam: data,
    activeTeamLoading: isPending,
    activeTeamError: error,
  }
}
