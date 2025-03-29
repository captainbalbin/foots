import { useQuery } from '@tanstack/react-query'
import { teamQueryOptions } from './queries'
import { Team } from './types'
import { useTeams } from './useTeams'

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
