import { Link } from "react-router-dom";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddSavedFood.module.css"
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";

export default function AddSavedFood({foodName}: {foodName: string}) {
  const authContext = useAuth()
  return (
    <>
    <Header showLogInButton={authContext.isAuthenticated ? false : true} />
    <FoodDetail foodName={foodName}/>
    <div className={styles.buttons}>
      <Link to={`/account/food`}>Cancel</Link>
      <Button variant="small">Done</Button>
    </div>
    </>
  )
}