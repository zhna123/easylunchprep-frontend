import { FieldErrors, UseFormRegister } from "react-hook-form"
import Button from "../Button/Button"
import styles from "./FoodDetail.module.css"
import clsx from "clsx"

type Inputs = {
  name: string,
  description: string,
  image: string,
}


export default function FoodDetail({foodName, register, errors}: 
  {
    foodName: string,
    register: UseFormRegister<Inputs>,
    errors: FieldErrors

  }) {
  
  return (
    <>
    <p className={styles.title}>{`Add ${foodName}`}</p>
    <div className={styles.detail_container}>
      <div className={styles.detail}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name", {required: true})} />
          <div className={
            clsx(styles.error_message, {
              [styles.active]: errors.name
            })
          }>
            <span className={styles.error}>This field is required</span>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea className={styles.textarea} id="description" {...register("description")} />
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