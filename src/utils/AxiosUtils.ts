import axios from "axios";
import { Lunchbox } from "../types/types";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080"
});

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