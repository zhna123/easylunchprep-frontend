import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import styles from './Lunchboxes.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Breadcrumb from './Breadcrumb';


export default function Lunchboxes() {
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Lunchboxes</p>
    <div className={styles.searchbox_container}>
      <div className={styles.searchbox}>
        <input type="search" id="search" name="search" />
        <Icon path={mdiMagnify}
          className={styles.search_icon}
          size={1.2}
        />
      </div>
      <Button variant='small'>Build New</Button>
    </div>
    <p className={styles.content_title}>Favorites</p>
    <div className={styles.cards}>
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
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
    </div>
    <hr />
    <div className={styles.cards}>
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