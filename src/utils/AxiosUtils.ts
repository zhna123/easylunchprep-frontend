import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080"
});

export const retrieveLunchboxesByUserId = 
  (userid: string) => axiosClient.get(`/users/${userid}/lunchboxes`, {
    headers: {
      Authorization: "Basic dXNlcjpwYXNzd29yZA=="
    }
  })