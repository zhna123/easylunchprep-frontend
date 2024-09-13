import { Link } from "react-router-dom";
import Button from "../Button/Button";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddFood.module.css"

export default function AddFood({foodName}: {foodName: string}) {
  return (
    <>
      <FoodDetail foodName={foodName} />
      <div className={styles.buttons}>
        <Link to={`/select/${foodName}`}>Cancel</Link>
        <Button variant="small">Done</Button>
      </div>
    </>
  )
}