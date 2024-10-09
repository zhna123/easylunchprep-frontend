export type Lunchbox = {
  id: string,
  user_id: string,
  name: string,
  favorite: boolean
}

// retrieved food
export type Food = {
  id: string,
  name: string,
  description: string,
  image: string,
  category: string,
}

// create/new food
export type FoodInput = {
  name: string,
  description: string,
  image: string,
  category: string,
}