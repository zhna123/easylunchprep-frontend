import Breadcrumb from './Breadcrumb'
import styles from './DietaryPref.module.css'

export default function DietaryPref() {
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>Dietary Preferences</p>
    <div className={styles.checkbox_container}>

      <div className={styles.checkbox}>
        <input type="checkbox" id="vegetarian" name="vegetarian" />
        <label htmlFor="vegetarian">Vegetarian</label>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" id="vegan" name="vegan" />
        <label htmlFor="vegan">Vegan</label>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" id="gluten-free" name="gluten-free" />
        <label htmlFor="gluten-free">Gluten-Free</label>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" id="dairy-free" name="dairy-free" />
        <label htmlFor="dairy-free">Dairy-Free</label>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" id="nut-free" name="nut-free" />
        <label htmlFor="nut-free">Nut-Free</label>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" id="halal" name="halal" />
        <label htmlFor="halal">Halal</label>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" id="kosher" name="kosher" />
        <label htmlFor="kosher">Kosher</label>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" id="no-added-sugar" name="no-added-sugar" />
        <label htmlFor="no-added-sugar">No Added Sugar</label>
      </div>
    </div>
    </>
  )
}