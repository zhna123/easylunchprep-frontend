import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant, className='', ...props }: 
  {children: ReactNode, variant: string, className?: string} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
