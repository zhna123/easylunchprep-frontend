import { ReactNode } from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant, ...props }: 
  {children: ReactNode, variant: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
