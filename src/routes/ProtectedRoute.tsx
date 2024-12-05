import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext/useAuth";

export default function ProtectedRoute({ children }: {children: ReactNode}) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return (
      <>{ children }</>
    )
  }
  return <Navigate to={'/'} replace={true} />
}