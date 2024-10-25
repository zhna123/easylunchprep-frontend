import { useQuery } from "@tanstack/react-query";
import { retrieveFoodByUserId } from "../../utils/AxiosUtils";
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