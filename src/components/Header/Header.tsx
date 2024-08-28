import LOGO from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button';

import Icon from '@mdi/react';
import { mdiAccountCircle, mdiChevronDown} from '@mdi/js';


export default function Header({logIn = false}) {

  // fix hardcode 
  const authenticated = true;

  const navigage = useNavigate();

  const AccountNav = () => {
    return (
      <div className={styles.nav}>
        Hello! Mary.
        <div className={styles.accountIcons}>
          <Icon path={mdiAccountCircle}
            title={"user account"}
            size={1.5}
            className={styles.icon}
          />
          <Icon path={mdiChevronDown}
            size={1}
            className={styles.icon}
          />
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