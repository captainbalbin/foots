import { useMutation } from '@tanstack/react-query'
import { NewTeam } from './types'
import { Button } from '@/components/ui/button'

export const AddTeam = () => {
  const { mutate } = useMutation({
    mutationFn: async (team: NewTeam) => {
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
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
  })

  const handleCreateTeam = () => {
    const team = { name: 'New Team', active: false }
    mutate(team)
  }

  return <Button onClick={handleCreateTeam}>Create Team</Button>
}
