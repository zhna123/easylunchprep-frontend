import { HTMLProps, ReactNode } from "react"
import styles from "./Card.module.css"

export default function Card({children, ...props}: {
  children: ReactNode } & HTMLProps<HTMLDivElement>
) {
  return (
    <div className={styles.card} {...props}>
      <div className={styles.card_content}>
      { children }
      </div>
    </div>
  )
}