import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTeamQueryOptions, teamsQueryOptions } from './queries'

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    ...deleteTeamQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamsQueryOptions.queryKey })
    },
    onError: (error) => {
      console.error('Error deleting player:', error)
    },
  })

  return {
    deleteTeam: mutate,
    deleteTeamLoading: isPending,
    deleteTeamError: error,
  }
}
