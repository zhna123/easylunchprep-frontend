import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useAuth } from "../../contexts/AuthContext/useAuth";

export default function SelectionLayout() {
  const authContext = useAuth()
  return (
    <>
      <Header showLogInButton={ authContext.isAuthenticated ? false : true} />
      <Outlet />
    </>
  )
}