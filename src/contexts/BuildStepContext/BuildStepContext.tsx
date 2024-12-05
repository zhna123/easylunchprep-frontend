import { createContext, ReactNode, useState } from "react"


type BuildStepContext = {
  completeBuildStep: boolean,
  setCompleteBuildStep: (b:boolean)=>void,
}

export const BuildStepContext = createContext<BuildStepContext>({
  completeBuildStep: false,
  setCompleteBuildStep: (b)=>{}
})

export function BuildStepProvider({ children }: {children: ReactNode}) {
  const [completeBuildStep, setCompleteBuildStep] = useState(false);
  return (
    <BuildStepContext.Provider value={{completeBuildStep, setCompleteBuildStep}}>
      { children }
    </BuildStepContext.Provider>
  )
}