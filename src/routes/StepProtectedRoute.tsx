import { ReactNode } from "react";
import { useBuildStep } from "../hooks/useBuildStep";
import { Navigate } from "react-router-dom";

export default function StepProtectedRoute({ children }: {children: ReactNode}) {
  const stepContext = useBuildStep();
  if (stepContext.completeBuildStep) {
    return <>{ children }</>
  }
  return <Navigate to={'/build'} />
}