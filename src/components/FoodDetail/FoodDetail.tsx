import Button from "../Button/Button"
import styles from "./FoodDetail.module.css"

export default function FoodDetail({foodName}: {foodName: string}) {
  return (
    <>
    <p className={styles.title}>{`Add ${foodName}`}</p>
    <div className={styles.detail_container}>
      <div className={styles.detail}>
        <div className={styles.name}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className={styles.description}>
          <label htmlFor="description">Description</label>
          <textarea className={styles.textarea} name="description" id="description" />
        </div>
      </div>
      <div className={styles.photo}>
        <div className={styles.photo_display}></div>
        <Button variant="small">Upload A Photo</Button>
      </div>
    </div>
    </>
  )
}