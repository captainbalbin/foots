import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

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
  const queryClient = useQueryClient()

  const { data, isPending, error } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/teams')
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return await res.json()
    },
    refetchOnWindowFocus: false,
  })

  const {
    mutate,
    error: mutationError,
    isPending: mutationPending,
  } = useMutation({
    mutationKey: ['teams', 'activate'],
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
      queryClient.invalidateQueries({ queryKey: ['teams'] }) // Invalidate the 'teams' query to refetch data
    },
    onError: (error: Error) => {
      console.error('Error activating team:', error.message)
    },
  })

  const handleClick = (id: string) => {
    mutate(id)
  }

  console.log('isLoading', isPending)

  if (mutationError) return <div>Mutation error: {mutationError.message}</div>
  if (isPending) return <div>loading teams...</div>
  if (error) return <div>Fetching error: {error.message}</div>

  return (
    <div>
      {data
        .sort((a: Team, b: Team) => parseInt(a.id) - parseInt(b.id))
        .map((team: Team) => {
          return (
            <div key={team.id}>
              <p>{team.name}</p>
              {!team.active && (
                <Button
                  disabled={mutationPending}
                  onClick={() => handleClick(team.id)}
                >
                  {mutationPending && <Loader2 className="animate-spin" />}
                  Make active
                </Button>
              )}
            </div>
          )
        })}
    </div>
  )
}
