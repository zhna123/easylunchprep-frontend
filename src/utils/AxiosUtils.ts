import axios from "axios";
import { Food, FoodInput, Lunchbox } from "../types/types";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080"
});

// lunchboxes

export const retrieveLunchboxesByUserId = 
  (userid: string) => axiosClient.get(`/users/${userid}/lunchboxes`, {
    headers: {
      Authorization: import.meta.env.VITE_AUTH
    }
  })

export const deleteLunchboxById = 
(id: string) => axiosClient.delete(`/lunchboxes/${id}`, {
  headers: {
    Authorization: import.meta.env.VITE_AUTH
  }
})

export const updateLunchbox = 
(id: string, lunchbox: Lunchbox) => axiosClient.put(`/lunchboxes/${id}`, lunchbox, {
  headers: {
    Authorization: import.meta.env.VITE_AUTH
  }
})

// food
export const retrieveFoodByUserId =
(userid: string) => axiosClient.get(`/users/${userid}/food`, {
  headers: {
    Authorization: import.meta.env.VITE_AUTH
  }
})

export const deleteFoodById = 
(id: string) => axiosClient.delete(`/food/${id}`, {
  headers: {
    Authorization: import.meta.env.VITE_AUTH
  }
})

export const updateFoodById = 
(id: string, food: FoodInput) => axiosClient.put(`/food/${id}`, food, {
  headers: {
    Authorization: import.meta.env.VITE_AUTH
  }
})

export const addNewFood = 
(userid: string, food: FoodInput) => {
  return axiosClient.post(`/users/${userid}/food`, food, {
    headers: {
      Authorization: import.meta.env.VITE_AUTH
    }
  })
}
