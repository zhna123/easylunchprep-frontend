import styles from './SavedFood.module.css'
import sharedStyles from '../../styles/sharedStyles.module.css'
import Icon from '@mdi/react';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import { Food } from '../../types/types';
import PLACE_HOLDER from '../../assets/food_placeholder.jpg'
import { useFoodQuery } from '../../hooks/queries/useFoodQuery';
import { useFoodDeleteMutation } from '../../hooks/mutations/useFoodMutation';
import { useQueryClient } from '@tanstack/react-query';

export default function SavedFood() {
  
  const navigate = useNavigate();
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

  const onEditClick = (id: string, food: Food) => navigate(`/account/add_food/${id}`, { state: { food }})

  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <div className={styles.search_box}>
      <Search />
    </div>
    <div className={`${sharedStyles.cards} ${styles.cards}`}>
      <div className={sharedStyles.add_btn} onClick={()=>navigate('/account/add_food')}>
        <Icon path={mdiPlus} size={3} className={sharedStyles.plus} />
      </div>
      {
        data.map(food => (
          <div key={food.id}>
            <Card text={food.name} 
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