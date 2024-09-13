import styles from './SavedFood.module.css'
import Icon from '@mdi/react';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';

export default function SavedFood() {
  const navigate = useNavigate()
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <Search />
    <div className={styles.cards}>
      <Card onClick={() => navigate('/account/add_food')} >
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