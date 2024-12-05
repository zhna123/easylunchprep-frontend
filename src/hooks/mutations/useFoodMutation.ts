import { QueryClient, useMutation } from "@tanstack/react-query"
import { addNewFood, deleteFoodById, updateFoodById } from "../../utils/AxiosUtils"
import { Food, FoodInput } from "../../types/types";


export const useFoodDeleteMutation = (userId: string, queryClient: QueryClient, category?: string) => {

  return (
    useMutation({
      mutationFn: async (food_id: string) => {
        return await deleteFoodById(food_id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, 'food'], exact: true })
        if (category !== undefined) {
          queryClient.invalidateQueries({ queryKey: [userId, category], exact: true })
        }
      }
    })
  )
}

export const useFoodAddMutation = (userId: string, category: string, queryClient: QueryClient) => {
  return (
    useMutation({
      mutationFn: async (foodInput: FoodInput) => {
        const response = await addNewFood(userId, foodInput);
        return response.data;
      },
      onSuccess: (data) => {
        // set temporary cache 
        queryClient.setQueryData(['food', String(data.id)], data)
        queryClient.invalidateQueries({ queryKey: [userId, 'food'], exact: true })
        queryClient.invalidateQueries({ queryKey: [userId, category], exact: true })
      }
    })
  
  )
}

export const useFoodUpdateMutation = (userId: string, category: string, queryClient: QueryClient) => {
  return (
    useMutation({
      mutationFn: async (food: Food) => {
        const response = await updateFoodById(food.id, food)
        return response.data
      },
      onSuccess: (data) => {
        queryClient.setQueryData(['food', String(data.id)], data)
        queryClient.invalidateQueries({ queryKey: [userId, 'food'], exact: true })
        queryClient.invalidateQueries({ queryKey: [userId, category], exact: true })
      }
    })
  )
}