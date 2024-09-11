import { Link, useNavigate } from "react-router-dom";
import styles from "./UserFood.module.css"
import Card from "../Card/Card";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

export default function UserFood({loggedIn}: {loggedIn: boolean}) {
  const navigate = useNavigate()

  const Food = () => {
    return (
      <>
      <p className={styles.title}>Add your own</p>
      <div className={styles.food_container}>
        <Card onClick={() => navigate('add')}>
          <Icon path={mdiPlus} size={3} className={styles.plus} />
        </Card>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
      </div>
      </>
    )
  }

  return (
    loggedIn ? 
    <Food />
    :
    <div className={styles.msg_container}>
      <Link to='/login' className={styles.link_style}>Log in</Link>&nbsp; to access and add your own food!
    </div>
  )
}