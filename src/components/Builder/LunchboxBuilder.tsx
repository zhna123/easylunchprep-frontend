import Header from "../Header/Header";
import styles from "./LunchboxBuilder.module.css"
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useBuildStep } from "../../hooks/useBuildStep";

export default function LunchboxBuilder() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const buildStepContext = useBuildStep();

  const handleSelection = (path: string) => {
    if (!buildStepContext.completeBuildStep) {
      buildStepContext.setCompleteBuildStep(true);
    }
    navigate(path);
  }

  return (
    <>
    <Header showLogInButton={authContext.isAuthenticated ? false : true} />
    <div className={styles.builder_bg}>
      <div className={styles.name}>
        <label htmlFor="name">Name(Optional)</label>
        <input type="text" id="name" name="name"/>
      </div>
      <div className={styles.box}>
        <div className={`${styles.fruits} ${styles.content}`} onClick={() => handleSelection('/select/fruits')}>
          Fruits
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.vegetables} ${styles.content}`} onClick={() => handleSelection('/select/vegetables')}>
          Vegetables
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.protein} ${styles.content}`} onClick={() => handleSelection('/select/protein')}>
          Protein
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.grain} ${styles.content}`} onClick={() => handleSelection('/select/grain')}>
          Grain
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.dairy} ${styles.content}`} onClick={() => handleSelection('/select/dairy')}>
          Dairy
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to={authContext.isAuthenticated ? '/account' : '/'}>Cancel</Link>
        <Button variant="outline">Start Over</Button>
        <Button variant="dark">Done</Button>
      </div>
    </div>
    </>
    
  )
}