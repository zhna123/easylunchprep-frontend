import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Header from "../Header/Header";
import styles from './Home.module.css';
import { useAuth } from "../../contexts/AuthContext/useAuth";


export default function Home() {  

  const navigate = useNavigate()
  const authContext = useAuth();

    return (
      <>
      <Header showLogInButton={authContext.isAuthenticated ? false : true} />
      <main className={styles.container}>
          <h4>Welcome to Easy Lunch Prep!</h4>
          <h2>Make healthy choices while building your daily lunchbox with ease.</h2>
          <ol>
            <li className={styles.step}>Step 1 &nbsp;&nbsp;&nbsp;Start with one of the 5 food groups.</li>
            <li className={styles.step}>Step 2 &nbsp;&nbsp;&nbsp;Choose food under this group.</li>
            <li className={styles.step}>Step 3 &nbsp;&nbsp;&nbsp;Repeat for other food groups.</li>
          </ol>
          <div className={styles.buttons}>
            <Button variant="button" onClick={() => navigate('/build')}>Build Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
      </main>
      </>
    )
}