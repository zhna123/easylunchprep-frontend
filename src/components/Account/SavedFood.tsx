import styles from './SavedFood.module.css'
import Icon from '@mdi/react';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';

export default function SavedFood() {
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <Search />
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