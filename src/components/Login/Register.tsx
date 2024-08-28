import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../Header/Header";
import Button from "../Button/Button";
import styles from "./Login.module.css";

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export default function Register() {

  const {
    handleSubmit,
    register,
    formState: { errors,  },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Header />
      <h3>Create An Account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' {...register("firstName", {required: true})} />
        </div>

        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' {...register("lastName", {required: true})} />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...register("email", {required: true})} />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' {...register("password", { required: true })} />
        </div>
        
        <div className={styles.buttons}>
          <Button variant='button' type="submit">Create</Button>
        </div>
      </form>
    </div>
  )
}