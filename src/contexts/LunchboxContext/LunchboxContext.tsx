import { createContext, ReactNode, useState } from "react"
import { LunchboxInput } from "../../types/types"

type LunchboxContextType = {
  lunchbox: LunchboxInput,
  setLunchbox: (a)=>void
}

export const LunchboxContext = createContext<LunchboxContextType>({
  lunchbox: {
    name: "",
    favorite: false,
    foods: []
  },
  setLunchbox: ()=>{}
})

export function LunchboxProvider({children}: {children: ReactNode}) {
  const [lunchbox, setLunchbox] = useState<LunchboxInput>({
    name: "",
    favorite: false,
    foods: []
  })
  return (
    <LunchboxContext.Provider value={{lunchbox, setLunchbox}}>
      {children}
    </LunchboxContext.Provider>
  )
}