import { useNavigate } from "react-router-dom";
import styles from "./UserFood.module.css"
import sharedStyles from "../../styles/sharedStyles.module.css"
import Card from "../Card/Card";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import PLACE_HOLDER from '../../assets/default.png'
import { useFoodByCategoryQuery } from "../../hooks/queries/useFoodQuery";
import { Food } from '../../types/types';
import { useLunchbox } from "../../contexts/LunchboxContext/useLunchbox";


export default function UserFood({category}: {category: string}) {
  const navigate = useNavigate()
  const authContext = useAuth();
  const {lunchbox, setLunchbox} = useLunchbox()

  const {isPending, error, data} = useFoodByCategoryQuery(authContext.userId, category);

  if (isPending) {
    return "Loading...";
  }
  if (error) {
    return "An error occurred " + error.message;
  }

  const onAddClick = (food: Food) => {
    setLunchbox(pre => {
      const exists = pre.foods.some(f => f.id === food.id);
      if (exists) return pre
      
      // Check if the food category already has an item
      const categoryIndex = pre.foods.findIndex(f => f.category === food.category);

      if (categoryIndex !== -1) {
        // If an item from the same category exists, replace it with the new one
        const updatedFoods = [...pre.foods];
        updatedFoods[categoryIndex] = food; // Replace the food at the same category index
        return {
          ...pre,
          foods: updatedFoods
        };
      } else {
        // If no item in the same category, just add the new food
        return {
          ...pre,
          foods: [...pre.foods, food]
        };
      }
    })
    navigate("/build")
  }

  const Food = () => {
    return (
      <>
      <p className={styles.title}>Add your own</p>
      <div className={sharedStyles.cards}>
        <div className={sharedStyles.add_btn} onClick={()=>navigate('add')}>
          <Icon path={mdiPlus} size={3} className={sharedStyles.plus} />
        </div>
        {
        data.map(food => (
          <div key={food.id}>
            <Card
              onSelectClick={() => onAddClick(food)}
            >
              <img 
                src={food.image && food.image !== '' 
                  ? `${import.meta.env.VITE_S3_BASE_URL}${food.image}` 
                  : PLACE_HOLDER
                }             
                alt="food" className={sharedStyles.image} />
            </Card>
            <div className={sharedStyles.food_name}>
              {food.name}
            </div>
          </div>
        ))
      }
      </div>
      </>
    )
  }

  return (
    <Food />
  )
}