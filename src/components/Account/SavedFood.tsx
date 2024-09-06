import styles from './SavedFood.module.css'
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';

export default function SavedFood() {
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <div className={styles.searchbox}>
        <input type="search" id="search" name="search" />
        <Icon path={mdiMagnify}
          className={styles.search_icon}
          size={1.2}
        />
    </div>
    <div className={styles.cards}>
      <Card onClick={() => alert('Card clicked!')} >
        <Icon path={mdiPlus} size={3} className={styles.plus} />
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
    </div>
    </>
    
  )
}