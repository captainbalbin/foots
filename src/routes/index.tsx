import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})


export interface Team {
  name: string
}

function Index() {
  const { mutate} = useMutation({
    mutationFn: async (team: Team) => {
       

      const response = await fetch('http://localhost:3000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
  })

  const handleCreateTeam = () => {
    const team = { name: 'New Team' }
    mutate(team)
  }

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button onClick={handleCreateTeam}>
        Create Team
      </Button>
    </div>
  )
}
