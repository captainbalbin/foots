import { useMutation, useQueryClient } from '@tanstack/react-query'
import { activateTeamQueryOptions, teamsQueryOptions } from './queries'

export const useActivateTeam = () => {
  const queryClient = useQueryClient()

  const {
    mutate,
    error: mutationError,
    isPending: mutationPending,
  } = useMutation({
    ...activateTeamQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamsQueryOptions.queryKey }) // Invalidate the 'teams' query to refetch data
    },
    onError: (error: Error) => {
      console.error('Error activating team:', error.message)
    },
  })

  return {
    activateTeam: mutate,
    activating: mutationPending,
    activationError: mutationError,
  }
}
