import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Account.module.css";

export default function Account() {
  return (
    <div>
      <Header logIn={true} />
      <div className={styles.container}>
        <div className={styles.sidebar}>side bar</div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}