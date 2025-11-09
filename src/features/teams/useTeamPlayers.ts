import { useQuery } from '@tanstack/react-query'
import { teamPlayersQueryOptions } from './queries'
import { useActiveTeam } from './useActiveTeam'

export const useTeamPlayers = () => {
  const { activeTeam } = useActiveTeam()

  const { data, error, isPending, isLoading } = useQuery({
    ...teamPlayersQueryOptions(activeTeam?.id),
    enabled: !!activeTeam?.id,
  })

  return {
    teamPlayers: data,
    teamPlayersLoading: activeTeam ? isPending : isLoading,
    teamPlayersError: error,
  }
}
