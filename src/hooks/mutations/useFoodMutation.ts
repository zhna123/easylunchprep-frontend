import { QueryClient, useMutation } from "@tanstack/react-query"
import { addNewFood, deleteFoodById, updateFoodById } from "../../utils/AxiosUtils"
import { Food, FoodInput } from "../../types/types";


export const useFoodDeleteMutation = (userId: string, queryClient: QueryClient) => {

  return (
    useMutation({
      mutationFn: async (food_id: string) => {
        return await deleteFoodById(food_id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, 'food'], exact: true })
      }
    })
  )
}

export const useFoodAddMutation = (userId: string, queryClient: QueryClient) => {
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
      }
    })
  
  )
}

export const useFoodUpdateMutation = (userId: string, queryClient: QueryClient) => {
  return (
    useMutation({
      mutationFn: async (food: Food) => {
        const response = await updateFoodById(food.id, food)
        return response.data
      },
      onSuccess: (data) => {
        queryClient.setQueryData(['food', String(data.id)], data)
        queryClient.invalidateQueries({ queryKey: [userId, 'food'], exact: true })
      }
    })
  )
}