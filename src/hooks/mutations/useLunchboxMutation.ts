import { QueryClient, useMutation } from "@tanstack/react-query"
import { createLunchbox, deleteLunchboxById, updateLunchbox } from "../../utils/AxiosUtils"
import { Lunchbox, LunchboxInput } from "../../types/types"

export const useLunchboxAddMutation = (userId: string, queryClient: QueryClient) => {

  return (
    useMutation({
      mutationFn: async (lunchbox: LunchboxInput) => {
        const response = await createLunchbox(userId, lunchbox);
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, 'lunchboxes'], exact: true })
      }
    })
  )
}

export const useLunchboxUpdateMutation = () => {

}

export const useLunchboxFavUpdateMutation = (userId: string, queryClient: QueryClient) => {
  return (
    useMutation({
      mutationFn: async (lunchbox: Lunchbox) => {
        const response = await updateLunchbox(lunchbox.id, lunchbox)
        return await response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, 'lunchboxes'], exact: true })
      }
    })
  )
}

export const useLunchboxDeleteMutation = (userId: string, queryClient: QueryClient) => {
  return (
    useMutation({
      mutationFn: async (lunchbox_id: string) => {
        const response = await deleteLunchboxById(lunchbox_id);
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, 'lunchboxes'], exact: true })
      }
    })
  )
}