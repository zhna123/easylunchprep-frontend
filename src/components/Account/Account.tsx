import { Link, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Account.module.css";

import Icon from '@mdi/react';
import { mdiCog, mdiFoodApple, mdiLandPlots, mdiBarleyOff } from '@mdi/js';
import { useState } from "react";
import clsx from "clsx";


export default function Account() {

  const [activeItem, setActiveItem] = useState('my lunchboxes');

  const handleSettingActiveItem = (item: string) => {
    setActiveItem(item)
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
        <p className={styles.logout}>Log Out</p>
      </div>
    )
  }

  return (
    <div>
      <Header logIn={true} />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}