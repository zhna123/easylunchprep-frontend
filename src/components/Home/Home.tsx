import Button from "../Button/Button";
import Header from "../Header/Header";
import styles from './Home.module.css';


export default function Home() {  

    return (
      <>
      <Header />
      <main className={styles.container}>
          <h4>Welcome to Easy Lunch Prep!</h4>
          <h2>Make healthy choices while building your daily lunchbox with ease.</h2>
          <ol>
            <li className={styles.step}>Step 1 &nbsp;&nbsp;&nbsp;Start with one of the 5 food groups.</li>
            <li className={styles.step}>Step 2 &nbsp;&nbsp;&nbsp;Choose food under this group.</li>
            <li className={styles.step}>Step 3 &nbsp;&nbsp;&nbsp;Repeat for other food groups.</li>
          </ol>
          <div className={styles.buttons}>
            <Button variant="button">Build Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
      </main>
      </>
    )
}