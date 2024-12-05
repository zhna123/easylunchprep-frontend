
import styles from './Lunchboxes.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import PLACE_HOLDER from '../../assets/lunchbox_placeholder.png'
import { Lunchbox } from '../../types/types';
import { useLunchboxQuery } from '../../hooks/queries/useLunchboxQuery';
import { useLunchboxDeleteMutation, useLunchboxFavUpdateMutation } from '../../hooks/mutations/useLunchboxMutation';


export default function Lunchboxes() {
  const navigate = useNavigate()
  const authContext = useAuth()

  const queryClient = useQueryClient();

  const delMutation = useLunchboxDeleteMutation(authContext.userId, queryClient)

  const favMutation = useLunchboxFavUpdateMutation(authContext.userId, queryClient)

  const {isPending, error, data} = useLunchboxQuery(authContext.userId)
  if (isPending) {
    return "Loading...";
  }
  if (error) {
    return "An error occurred " + error.message;
  }

  const LunchboxCard = ({box}: {box:Lunchbox}) => {
    return (
      <div>
        <Card key={box.id} 
          text={box.name}
          isFavorite={box.favorite}
          onDeleteClick={()=>onDeleteClick(box.id)}
          onFavoriteClick={()=>onFavoriteClick(box)}
        >
          <div className={styles.lunchbox_grid}>
            <div className={styles.fruits}>
              <img src={`${PLACE_HOLDER}`} alt="" className={styles.image} />
            </div>
            <div className={styles.vegetables}>vegetables</div>
            <div className={styles.protein}>protein</div>
            <div className={styles.grain}>grain</div>
            <div className={styles.dairy}>dairy</div>
            <div className={styles.box_name_container}>
            </div>
          </div>
        </Card>
        <div className={styles.box_name}>
          {box.name}
        </div>  
      </div>
    )
  }

  const allLunchboxes = data.map((box) => (
    <LunchboxCard key={box.id} box={box}/>
  ))

  const favoriteLunchboxes = data.filter(d=>d.favorite).map(box => (
    <LunchboxCard key={box.id} box={box}/>
  ))


  const onDeleteClick = (id: string) => {
    delMutation.mutate(id)
  }

  const onFavoriteClick = (box: Lunchbox) => {
    const updatedLunchbox: Lunchbox = {...box, favorite: !box.favorite};
    // mutate favorite
    favMutation.mutate(updatedLunchbox)
    return !box.favorite;
  }
  
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Lunchboxes</p>
    <div className={styles.searchbox_container}>
      <Search />
      <Button variant='oval_square' onClick={()=>navigate('/build')}>Build New</Button>
    </div>
    <p className={styles.content_title}>Favorites</p>
    <div className={styles.cards}>
      
      {
        favoriteLunchboxes.length === 0 ? <div>Nothing to show here.</div> : favoriteLunchboxes
      } 
    </div>
    <hr />
    <div className={styles.cards}>
      {
        allLunchboxes.length === 0 ? <div>Nothing to show here.</div> : allLunchboxes
      }
    </div>
    </>
  )
}