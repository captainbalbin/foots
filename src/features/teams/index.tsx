import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Team } from '@/server/pocketbase-types'
import { useActivateTeam } from './useActivateTeam'
import { useTeams } from './useTeams'
import { TeamForm } from '../form'

export const Teams = () => {
  const { teams, isPending, error } = useTeams()
  const { activateTeam, activating, activationError } = useActivateTeam()

  const handleActivateTeam = (id: string) => {
    activateTeam(id)
  }

  if (isPending) return <div>loading teams...</div>

  if (activationError) {
    return <div>Mutation error: {activationError.message}</div>
  }

  if (error || !teams) {
    return <div>Query error: {error?.message}</div>
  }

  return (
    <div>
      {/* <TeamForm /> */}
      {teams
        // .sort((a: Team, b: Team) => a.id - b.id)
        .map((team: Team) => {
          return (
            <div key={team.id}>
              <p>{team.name}</p>
              {!team.active && (
                <Button
                  disabled={activating}
                  onClick={() => handleActivateTeam(team.id)}
                >
                  {activating && <Loader2 className="animate-spin" />}
                  Make active
                </Button>
              )}
            </div>
          )
        })}
    </div>
  )
}
