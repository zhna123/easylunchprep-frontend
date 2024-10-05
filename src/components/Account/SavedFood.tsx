import styles from './SavedFood.module.css'
import Icon from '@mdi/react';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { retrieveFoodByUserId } from '../../utils/AxiosUtils';
import { useAuth } from '../../hooks/useAuth';
import { Food } from '../../types/types';
import PLACE_HOLDER from '../../assets/food_placeholder.jpg'

export default function SavedFood() {
  
  const navigate = useNavigate();
  const authContext = useAuth();

  const {isPending, error, data} = useQuery({
    queryKey: [authContext.userId, 'food'],
    queryFn: async () => {
      const response = await retrieveFoodByUserId(authContext.userId);
      return await response.data as Food[]
    }
  })

  if (isPending) {
    return "Loading...";
  }
  if (error) {
    return "An error occurred " + error.message;
  }

  const onDeleteClick = () => {
    return null
  }

  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <div className={styles.search_box}>
      <Search />
    </div>
    <div className={styles.cards}>
      <div className={styles.add_btn}>
        <Icon path={mdiPlus} size={3} className={styles.plus} />
      </div>
      {
        // data.length === 0 ? <div>No food added yet.</div> :
        data.map(food => (
          <div className={styles.food_card}>
            <Card key={food.id} text={food.name} onDeleteClick={onDeleteClick} >
              <img src={`${PLACE_HOLDER}`} alt="food" className={styles.image} />
            </Card>
            <div className={styles.food_name}>
              {food.name}
            </div>
          </div>
        ))
      }
    </div>
    </>
    
  )
}