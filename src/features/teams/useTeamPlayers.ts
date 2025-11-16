import { useQuery } from '@tanstack/react-query'
import { teamPlayersQueryOptions } from './queries'
import { useActiveTeam } from './useActiveTeam'
import { useDate } from '@/store/useDate'

export const useTeamPlayers = () => {
  const { activeTeam } = useActiveTeam()
  const { date } = useDate()

  const { data, error, isPending, isLoading } = useQuery({
    ...teamPlayersQueryOptions(activeTeam?.id, date.toISOString()),
    enabled: !!activeTeam?.id,
  })

  return {
    teamPlayers: data,
    teamPlayersLoading: activeTeam ? isPending : isLoading,
    teamPlayersError: error,
  }
}
