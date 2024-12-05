import { useQuery } from "@tanstack/react-query";
import { retrieveLunchboxesByUserId } from "../../utils/AxiosUtils";
import { Lunchbox } from "../../types/types";


export const useLunchboxQuery = (userId: string) => {
  return (
    useQuery({
      queryKey: [userId, 'lunchboxes'],
      queryFn: async () => {
        const response = await retrieveLunchboxesByUserId(userId);
        return await response.data as Lunchbox[];
      },
    })
  )
}