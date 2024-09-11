import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import styles from "./FoodSelection.module.css";
import Search from '../Search/Search';
import UserFood from './UserFood';
import SuggestFood from './SuggestFood';
import { useNavigate } from 'react-router-dom';


export default function FruitsSelection({foodName}: {foodName: string}) {
  const navigate = useNavigate();
  return (
    <>
    <div className={styles.nav} onClick={() => navigate('/build')}>
      <Icon path={mdiArrowLeft} size={1} />
      {foodName}
    </div>
    <div className={styles.select_container}>
      <Search />
      <UserFood loggedIn={true} />
      <SuggestFood />
    </div>
    </>
  )
}