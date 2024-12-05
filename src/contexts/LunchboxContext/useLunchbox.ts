import { useContext } from "react"
import { LunchboxContext } from "./LunchboxContext"

export const useLunchbox = () => useContext(LunchboxContext)