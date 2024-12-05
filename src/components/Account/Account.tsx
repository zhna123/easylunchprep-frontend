import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Account.module.css";

import Icon from '@mdi/react';
import { mdiCog, mdiFoodApple, mdiLandPlots, mdiBarleyOff } from '@mdi/js';
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext/useAuth";


export default function Account() {

  const authContext = useAuth()
  const navigate = useNavigate()

  const [activeItem, setActiveItem] = useState('');
  const location = useLocation(); // get current url path

  // Function to map the current URL path to the corresponding sidebar item
  const getActiveItemFromPath = (path: string) => {
    switch (path) {
      case '/account/food':
        return 'food';
      case '/account/dietary':
        return 'dietary';
      case '/account/settings':
        return 'settings';
      default:
        return 'my lunchboxes'; // Default to 'my lunchboxes' for the root path
    }
  };

  useEffect(() => {
    const activeItemFromPath = getActiveItemFromPath(location.pathname);
    setActiveItem(activeItemFromPath);
  }, [location.pathname]); // Re-run the effect when the URL path changes


  const handleSettingActiveItem = (item: string) => {
    setActiveItem(item);
  }

  const handleLogOut = () => {
    if(authContext.logOut()) {
      navigate('/')
    }
  }

  const Sidebar = () => {
    return (
      <div className={styles.sidebar}>
        <p className={styles.sidebar_title}>Account Info</p>
        <ul>
          <Link to={''}>
          <li className={clsx(styles.sidebar_item, {
              [styles.sidebar_item_active]: activeItem === 'my lunchboxes'
            })} 
            onClick={() => handleSettingActiveItem('my lunchboxes')}>
            <Icon path={mdiLandPlots} size={1} className={styles.icon} />
            My Lunchboxes
          </li>
          </Link>
          <Link to={'food'}>
          <li className={clsx(styles.sidebar_item, {
              [styles.sidebar_item_active]: activeItem === 'food'
            })} 
            onClick={() => handleSettingActiveItem('food')}>
            <Icon path={mdiFoodApple} size={1} className={styles.icon} />
            My Saved Food
          </li>
          </Link>
          <Link to={'dietary'}>
          <li className={clsx(styles.sidebar_item, {
              [styles.sidebar_item_active]: activeItem === 'dietary'
            })} 
            onClick={() => handleSettingActiveItem('dietary')}>
            <Icon path={mdiBarleyOff} size={1} className={styles.icon} />
            Dietary Preferences
          </li>
          </Link>
          <Link to={'settings'}>
          <li className={clsx(styles.sidebar_item, {
              [styles.sidebar_item_active]: activeItem === 'settings'
            })} 
            onClick={() => handleSettingActiveItem('settings')}>
            <Icon path={mdiCog} size={1} className={styles.icon} />
            Settings
          </li>
          </Link>
        </ul>
        <p className={styles.logout} onClick={()=>handleLogOut()}>Log Out</p>
      </div>
    )
  }

  return (
    <div>
      <Header showLogInButton={false} />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}