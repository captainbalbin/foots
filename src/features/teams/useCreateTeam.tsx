import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeamQueryOptions, teamsQueryOptions } from './queries'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    ...createTeamQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamsQueryOptions.queryKey })
    },
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
  })

  return {
    createTeam: mutate,
  }
}
