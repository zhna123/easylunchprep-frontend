import { useState } from "react";
import styles from "./Dropdown.module.css"
import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Dropdown() {

  const authContext = useAuth()
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false);

  const handleLogOut = () => {
    if(authContext.logOut()) {
      navigate('/')
    }
  }

  return (
    <>
    <div>
      <div className={styles.icon_div} onClick={() => setShowMenu(!showMenu)}>
        <Icon path={mdiMenu}
          size={2}
          className={styles.icon}
        />
      </div>
      <div className={clsx(styles.dropdown_menu, {[styles.show]: showMenu})}>
        <ul className={styles.dropdown_items}>
          <Link to={'/account'}>
            <li className={styles.dropdown_item}>My Lunchboxes</li>
          </Link>
          <Link to={'food'}>
            <li className={styles.dropdown_item}>My Saved Food</li>
          </Link>
          <Link to={'dietary'}>
          <li className={styles.dropdown_item}>Dietary Preferences</li>
          </Link>
          <Link to={'settings'}>
          <li className={styles.dropdown_item}>Settings</li>
          </Link>
          <hr className={styles.hr_line}/>
          <li className={styles.dropdown_item} onClick={()=>handleLogOut()}>Log Out</li>
        </ul>
      </div>
      <div className={clsx(styles.overlay, {[styles.show]: showMenu})} onClick={() => setShowMenu(false)} />
    </div>
    </>
  )
}