import { Link, useNavigate } from "react-router-dom";
import styles from "./UserFood.module.css"
import sharedStyles from "../../styles/sharedStyles.module.css"
import Card from "../Card/Card";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useAuth } from "../../hooks/useAuth";
import PLACE_HOLDER from '../../assets/food_placeholder.jpg'
import { useFoodQuery } from "../../hooks/queries/useFoodQuery";
import { useFoodDeleteMutation } from "../../hooks/mutations/useFoodMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Food } from '../../types/types';

// TODO need to filter by category
export default function UserFood({foodName, loggedIn}: {foodName: string, loggedIn: boolean}) {
  const navigate = useNavigate()
  const authContext = useAuth();
  const queryClient = useQueryClient();

  const delMutation = useFoodDeleteMutation(authContext.userId, queryClient);

  const {isPending, error, data} = useFoodQuery(authContext.userId);

  if (isPending) {
    return "Loading...";
  }
  if (error) {
    return "An error occurred " + error.message;
  }

  const onDeleteClick = (id: string) => {
    delMutation.mutate(id);
  }

  const onEditClick = (id: string, food: Food) => navigate(`/select/${foodName}/add/${id}`, { state: { food }})

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
              onDeleteClick={() => onDeleteClick(food.id)} 
              onEditClick={() => onEditClick(food.id, food)}
            >
              <img src={`${PLACE_HOLDER}`} alt="food" className={sharedStyles.image} />
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
    loggedIn ? 
    <Food />
    :
    <div className={styles.msg_container}>
      <Link to='/login' className={styles.link_style}>Log in</Link>&nbsp; to access and add your own food!
    </div>
  )
}