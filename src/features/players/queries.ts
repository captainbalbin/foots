import { queryOptions } from '@tanstack/react-query'

const getPlayers = async () => {
  const response = await fetch('http://localhost:3000/api/players')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const playersQueryOptions = queryOptions({
  queryKey: ['players'],
  queryFn: getPlayers,
})
