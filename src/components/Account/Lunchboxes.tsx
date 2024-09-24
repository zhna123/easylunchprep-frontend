
import styles from './Lunchboxes.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { retrieveLunchboxesByUserId } from '../../utils/AxiosUtils';
import { useAuth } from '../../hooks/useAuth';


export default function Lunchboxes() {
  const navigate = useNavigate()
  const authContext = useAuth()

  const {isPending, error, data} = useQuery({
    queryKey: [authContext.userId, 'lunchboxes'],
    queryFn: async () => {
      const response = await retrieveLunchboxesByUserId(authContext.userId);
      return await response.data;
    }
  })
  if (isPending) {
    return "Loading...";
  }
  if (error) {
    return "An error occurred " + error.message;
  }
  
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>My Lunchboxes</p>
    <div className={styles.searchbox_container}>
      <Search />
      <Button variant='small' onClick={()=>navigate('/build')}>Build New</Button>
    </div>
    <p className={styles.content_title}>Favorites</p>
    <div className={styles.cards}>
      {
        data.filter(d => d.favorite).map(box => (
          <Card key={box.id} onClick={() => alert('Card clicked!')} >
            {box.name}
          </Card>
        ))
      } 
    </div>
    <hr />
    <div className={styles.cards}>
      {
        data.map(box => (
          <Card key={box.id} onClick={() => alert('Card clicked!')} >
            {box.name}
          </Card>
        ))
      }
    </div>
    </>
  )
}