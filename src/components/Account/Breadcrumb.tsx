import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.slice(1).split('/'); //location pathname starts with /

  return (
    <nav className={styles.breadcrumb}>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {pathnames.length > 0 && <span className={styles.separator}>/</span>}
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={index}>
              <span className={styles.active}>{name}</span>
            </li>
          ) : (
            <li key={index}>
              <Link to={routeTo}>{name}</Link>
              <span className={styles.separator}>/</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
