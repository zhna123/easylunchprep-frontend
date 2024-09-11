import styles from "./Search.module.css"
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';


export default function Search() {
  return (
    <div className={styles.searchbox}>
      <input type="search" id="search" name="search" />
      <Icon path={mdiMagnify}
        className={styles.search_icon}
        size={1.2}
        />
    </div>
  )
}