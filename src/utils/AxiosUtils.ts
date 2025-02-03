import axios from "axios";
import { FoodInput, Lunchbox, LunchboxInput } from "../types/types";

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

export const createLunchbox = 
(userid: string, lunchbox: LunchboxInput) => axiosClient.post(`/users/${userid}/lunchboxes`, lunchbox, {
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

export const retrieveFoodByCategory = 
(userid: string, category: string) => axiosClient.get(`/users/${userid}/food/${category}`, {
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

// s3

// s3 presigned url
const requestPresignedURL = (fileName: string) => {
  return axiosClient.post("/api/s3/generate-presigned-url", null, {
    params: { fileName },
    headers: {
      Authorization: import.meta.env.VITE_AUTH
    }
  });
}

// Upload the file directly to S3 using the pre-signed URL
const uploadFileToS3 = (presignedURL: string, file: File) => {
  return axiosClient.put(presignedURL, file, {
    headers: {
      "Content-Type": file.type,
    }
  })
}

export const uploadFile = async (userId: string, file: File) => {
  const response = await requestPresignedURL(`${userId}/food/${file.name}`)
  console.log(response.data)
  await uploadFileToS3(response.data.presignedUrl, file)
}

