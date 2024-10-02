import { HTMLProps, ReactNode, useEffect, useState } from "react"
import styles from "./Card.module.css"
import Icon from '@mdi/react';
import { mdiHeartOutline } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiPencilBoxOutline } from '@mdi/js';


export default function Card({children, isFavorite, onDeleteClick, onFavoriteClick, ...props}: 
  {
    children: ReactNode,
    isFavorite: boolean,
    onDeleteClick: () => void,
    onFavoriteClick: () => boolean,
  } 
  & HTMLProps<HTMLDivElement>
) {

  const [favorite, setFavorite] = useState(isFavorite);

  // Update favorite state when isFavorite prop changes
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = () => {
    const b = onFavoriteClick();
    setFavorite(b);
  }

  return (
    
    <div className={styles.card} {...props}>
      <div className={styles.card_content}>
      { children }
      </div>
      <div onClick={handleFavoriteClick}>
        {

          favorite ? 
          <Icon path={mdiHeart} size={1} className={styles.heart_filled}/>
          : 
          <Icon path={mdiHeartOutline} size={1} className={styles.heart}/>
        }
      </div>
      
      <div onClick={onDeleteClick}>
        <Icon path={mdiTrashCanOutline} size={1} className={styles.trash} />
      </div>
      <Icon path={mdiPencilBoxOutline} size={1} className={styles.edit} />
    </div>
    
  )
}