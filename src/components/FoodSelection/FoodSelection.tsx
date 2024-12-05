import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import styles from "./FoodSelection.module.css";
import Search from '../Search/Search';
import SuggestFood from './SuggestFood';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import UserFood from './UserFood';


export default function FruitsSelection({foodName}: {foodName: string}) {
  const navigate = useNavigate();
  const authContext = useAuth();
  
  return (
    <>
      <div className={styles.nav} onClick={() => navigate('/build')}>
        <Icon path={mdiArrowLeft} size={1} />
        {foodName}
      </div>
      <div className={styles.select_container}>
        <Search />
        {
          authContext.isAuthenticated ? <UserFood foodName={foodName} /> :
          <div className={styles.msg_container}>
            <Link to='/login' className={styles.link_style}>Log in</Link>&nbsp; to access and add your own food!
          </div>
        }
        <SuggestFood />
      </div>
    </>
  )
}