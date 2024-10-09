import styles from './SavedFood.module.css'
import Icon from '@mdi/react';
import Card from '../Card/Card';
import { mdiPlus } from '@mdi/js';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFoodById, retrieveFoodByUserId } from '../../utils/AxiosUtils';
import { useAuth } from '../../hooks/useAuth';
import { Food } from '../../types/types';
import PLACE_HOLDER from '../../assets/food_placeholder.jpg'

export default function SavedFood() {
  
  const navigate = useNavigate();
  const authContext = useAuth();
  const queryClient = useQueryClient();

  const delMutation = useMutation({
    mutationFn: async (food_id: string) => {
      return await deleteFoodById(food_id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authContext.userId, 'food'], exact: true })
    }
  })

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

  const onDeleteClick = (id: string) => {
    delMutation.mutate(id);
  }

  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Saved Food</p>
    <div className={styles.search_box}>
      <Search />
    </div>
    <div className={styles.cards}>
      <div className={styles.add_btn} onClick={()=>navigate('/account/add_food')}>
        <Icon path={mdiPlus} size={3} className={styles.plus} />
      </div>
      {
        data.map(food => (
          <div key={food.id}>
            <Card text={food.name} onDeleteClick={() => onDeleteClick(food.id)} >
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