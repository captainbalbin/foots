import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/players')({
  component: RouteComponent,
})

type Player = {
  id: number
  firstname: string
  lastname: string
  overall_rating: number
  potential_raing: number
  team: number | null
}

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/players')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <div>{data?.map((player: Player) => {
    return <div key={player.id}>
      <h3>{player.firstname} {player.lastname}</h3>
      <p>Overall Rating: {player.overall_rating}</p>
      <p>Potential Rating: {player.potential_raing}</p>
      <p>Team: {player.team}</p>
    </div>
  }
  )}</div>
}
