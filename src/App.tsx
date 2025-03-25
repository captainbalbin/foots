import { Loader2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { useQuery } from '@tanstack/react-query'

type Team = {
  id: string
  name: string
  createdAt: string
}

function App() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const apiUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://your-production-url.com/api/teams'
          : 'http://localhost:3000/api/teams'
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  if (isPending) {
    return <div>loading teams query...</div>
  }

  if (error) {
    return <div>error happened</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button disabled={isPending} onClick={() => refetch()}>
        {isPending && <Loader2 className="animate-spin" />}
        Refetch data
      </Button>
      {data.map((team: Team) => {
        return <div key={team.id}>{team.name}</div>
      })}
    </div>
  )
}

export default App
