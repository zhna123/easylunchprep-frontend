/**
 * these are types align with DB
 */
export type Lunchbox = {
  id: string,
  name: string,
  favorite: boolean
  foods: Food[]
}

export type LunchboxInput = {
  name: string,
  favorite: boolean
  foods: Food[]
}

// retrieved food
export type Food = {
  id: string,
  name: string,
  description: string,
  image: string,
  categories: string[],
}

// create/new food
export type FoodInput = {
  name: string,
  description: string,
  image: string,
  categories: string[],
}