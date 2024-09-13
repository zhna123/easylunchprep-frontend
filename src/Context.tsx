import { createContext, ReactNode, useState } from "react";


type AuthContextType = {
  isAuthenticated: boolean,
  logIn: ()=>boolean,
  logOut: ()=>boolean
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logIn: ()=>false,
  logOut: ()=>true,
})

type BuildStepContext = {
  completeBuildStep: boolean,
  setCompleteBuildStep: (b:boolean)=>void,
}

export const BuildStepContext = createContext<BuildStepContext>({
  completeBuildStep: false,
  setCompleteBuildStep: (b)=>{}
})

export function AuthProvider({ children }: {children: ReactNode}) {

  const [isAuthenticated, setAuthenticated] = useState(false);

  const logIn = () => {
    // TODO auth logic
    setAuthenticated(true);
    return true
  }

  const logOut = () => {
    // TODO log out logic
    setAuthenticated(false);
    return true;
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, logIn, logOut}}>
      { children }
    </AuthContext.Provider>
  )
}

export function BuildStepProvider({ children }: {children: ReactNode}) {
  const [completeBuildStep, setCompleteBuildStep] = useState(false);
  return (
    <BuildStepContext.Provider value={{completeBuildStep, setCompleteBuildStep}}>
      { children }
    </BuildStepContext.Provider>
  )
}