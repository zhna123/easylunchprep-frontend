import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.root_container}>
      <Outlet />
    </div>
  )
}