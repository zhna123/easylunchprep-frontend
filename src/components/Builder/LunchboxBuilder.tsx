import Header from "../Header/Header";
import styles from "./LunchboxBuilder.module.css"
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { useBuildStep } from "../../contexts/BuildStepContext/useBuildStep";
import { useLunchbox } from "../../contexts/LunchboxContext/useLunchbox";
import { Food } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLunchboxAddMutation } from "../../hooks/mutations/useLunchboxMutation";


export default function LunchboxBuilder() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const buildStepContext = useBuildStep();
  const queryClient = useQueryClient();
  const {lunchbox, setLunchbox} = useLunchbox();

  const addLunchboxMutation = useLunchboxAddMutation(authContext.userId, queryClient)

  const createLunchbox = () => 
    addLunchboxMutation.mutate({
      name: lunchbox.name,
      favorite: lunchbox.favorite,
      foods: lunchbox.foods
    })

  const onCreateLunchbox = () => {
    createLunchbox()
    navigate('/account')
  }

  const handleSelection = (path: string) => {
    if (!buildStepContext.completeBuildStep) {
      buildStepContext.setCompleteBuildStep(true);
    }
    navigate(path);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLunchbox((pre) => ({
      ...pre,
      name: e.target.value || ''
    }))
  }

  const getCurrentCategoryFood = (category: string, foods: Food[]) => {
    if (foods.length === 0) {
      return category;
    }
    const categoryFoods = foods.filter(f => f.category === category);
    if (categoryFoods.length === 0) {
      return category;
    }
    return categoryFoods[0].name;
  }

  return (
    <>
    <Header showLogInButton={authContext.isAuthenticated ? false : true} />
    <div className={styles.builder_bg}>
      <div className={styles.name}>
        <label htmlFor="name">Name(Optional)</label>
        <input type="text" id="name" name="name"
          value={lunchbox.name || ''}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.box}>
        <div className={`${styles.fruits} ${styles.content}`} onClick={() => handleSelection('/select/fruits')}>
          {
            getCurrentCategoryFood("FRUITS", lunchbox.foods)
          }
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.vegetables} ${styles.content}`} onClick={() => handleSelection('/select/vegetables')}>
          {
            getCurrentCategoryFood("VEGETABLES", lunchbox.foods)
          }
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.protein} ${styles.content}`} onClick={() => handleSelection('/select/protein')}>
          {
            getCurrentCategoryFood("PROTEIN", lunchbox.foods)
          }
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.grain} ${styles.content}`} onClick={() => handleSelection('/select/grain')}>
          {
            getCurrentCategoryFood("GRAIN", lunchbox.foods)
          }
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
        <div className={`${styles.dairy} ${styles.content}`} onClick={() => handleSelection('/select/dairy')}>
          {
            getCurrentCategoryFood("DAIRY", lunchbox.foods)
          }
          <Icon path={mdiPlus} size={2} className={styles.icon}/>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to={authContext.isAuthenticated ? '/account' : '/'}>Cancel</Link>
        <Button variant="outline" onClick={() => setLunchbox({name: "", favorite: false, foods: []})}>Start Over</Button>
        <Button variant="dark" onClick={onCreateLunchbox}>Done</Button>
      </div>
    </div>
    </>
    
  )
}