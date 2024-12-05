import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useBuildStep } from "../contexts/BuildStepContext/useBuildStep";

export default function StepProtectedRoute({ children }: {children: ReactNode}) {
  const stepContext = useBuildStep();
  if (stepContext.completeBuildStep) {
    return <>{ children }</>
  }
  return <Navigate to={'/build'} />
}