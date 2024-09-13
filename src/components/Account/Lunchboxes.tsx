
import styles from './Lunchboxes.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Breadcrumb from './Breadcrumb';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';


export default function Lunchboxes() {
  const navigate = useNavigate()
  
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
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
    </div>
    <hr />
    <div className={styles.cards}>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
      <Card onClick={() => alert('Card clicked!')} >
        some content
      </Card>
    </div>
    </>
  )
}