import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Team } from './types'
import { useActivateTeam } from './useActivateTeam'
import { useTeams } from './useTeams'
import { useCreateTeam } from './useCreateTeam'

export const Teams = () => {
  const { teams, isPending, error } = useTeams()
  const { activateTeam, activating, activationError } = useActivateTeam()
  const { createTeam } = useCreateTeam()

  const handleActivateTeam = (id: string) => {
    activateTeam(id)
  }

  const handleCreateTeam = () => {
    createTeam({ name: 'New Team', active: false })
  }

  if (activationError)
    return <div>Mutation error: {activationError.message}</div>
  if (isPending) return <div>loading teams...</div>
  if (error) return <div>Fetching error: {error.message}</div>

  return (
    <div>
      <Button onClick={() => handleCreateTeam()}>Create new team</Button>
      {teams
        .sort((a: Team, b: Team) => parseInt(a.id) - parseInt(b.id))
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
