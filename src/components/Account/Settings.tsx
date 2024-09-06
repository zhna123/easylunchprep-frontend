import Button from "../Button/Button"
import Breadcrumb from "./Breadcrumb"
import styles from "./Settings.module.css"

export default function Settings() {
  return (
    <>
    <Breadcrumb />
    <p className={styles.title}>Settings</p>
    <div className={styles.sub_title}>Update Password</div>
    <form className={styles.settings_form}>
      <div>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' name="old-password" />
      </div>

      <div>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' name="new-password" />
      </div>
        
      <div className={styles.buttons}>
        <Button variant='button' type="submit">Update</Button>
      </div>
    </form>
    <div>
    </div>
    </>
  )
}