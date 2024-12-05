import { useQuery } from "@tanstack/react-query";
import { retrieveFoodByCategory, retrieveFoodByUserId } from "../../utils/AxiosUtils";
import { Food } from "../../types/types";


export const useFoodQuery = (userId: string) => {
  return (
    useQuery({
      queryKey: [userId, 'food'],
      queryFn: async () => {
        const response = await retrieveFoodByUserId(userId);
        return response.data as Food[]
      }
    })
  )
}

export const useFoodByCategoryQuery = (userId: string, category: string) => {
  return (
    useQuery({
      queryKey: [userId, category],
      queryFn: async () => {
        const response = await retrieveFoodByCategory(userId, category);
        return response.data as Food[]
      }
    })
  )
}