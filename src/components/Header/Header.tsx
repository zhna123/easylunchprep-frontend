import LOGO from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button';

import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import Dropdown from '../Dropdown/Dropdown';


export default function Header({logIn = false}) {

  // fix hardcode 
  const authenticated = true;

  const navigage = useNavigate();

  const AccountNav = () => {
    return (
      <div className={styles.nav}>
        Hello! Mary.
        <div className={styles.accountIcons}>
          <Link to={'/account'}>
            <Icon path={mdiAccountCircle}
              title={"user account"}
              size={2}
              className={styles.icon}
            />
          </Link>
          <Dropdown />
        </div>
      </div>
    )
  }

  return (
    <header className={styles.header}>
      <img src={ LOGO } alt='logo' className={styles.logo} onClick={() => navigage('/')}/>
      {
        logIn ? 
          (authenticated ? <AccountNav /> : '') 
          : 
          <Button variant='small' onClick={() => navigage('/login')}>Log In</Button>
      }
    </header>
  )
}