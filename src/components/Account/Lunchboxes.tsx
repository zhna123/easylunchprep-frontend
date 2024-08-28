import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import styles from './Account.module.css';
import Button from '../Button/Button';


export default function Lunchboxes() {
  return (
    <>
    <div className={styles.searchbox_container}>
      <div className={styles.searchbox}>
        <input type="search" id="search" name="search" />
        <Icon path={mdiMagnify}
          className={styles.icon}
          size={1.2}
        />
      </div>
      <Button variant='small'>Build Now</Button>
    </div>
    <p>Favorites</p>
    <hr />
    </>
  )
}