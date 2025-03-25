import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams')({
  component: RouteComponent,
})

type Team = {
  id: string
  name: string
  createdAt: string
  active: boolean
}

function RouteComponent() {
  const { data, isPending, error } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/teams')
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return await res.json()
    },
  })

  const {
    mutate,
    error: mutationError,
    isPending: mutationPending,
  } = useMutation({
    mutationKey: ['teams', 'active'],
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/team/${id}/activate`, {
        method: 'PUT',
      })
      if (!res.ok) {
        throw new Error('Failed to activate team')
      }
      return await res.json()
    },
    onSuccess: () => {
      console.log('Team activated successfully')
    },
    onError: (error: Error) => {
      console.error('Error activating team:', error.message)
    },
  })

  if (mutationError) return <div>Mutation error: {mutationError.message}</div>

  if (mutationPending) return <div>Activating team...</div>

  if (isPending) return <div>loading teams...</div>

  if (error) return <div>Fetching error: {error.message}</div>

  const handleClick = (id: string) => {
    mutate(id)
  }

  return (
    <div>
      {data.map((team: Team) => {
        return (
          <div>
            <p>{team.name}</p>
            <Button disabled={team.active} onClick={() => handleClick(team.id)}>
              {team.active ? 'Active' : 'Make active'}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
