import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../Header/Header"
import styles from './Login.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string
  password: string
}


export default function LogIn() {

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors,  },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Header logIn = {true} />
      <h3>Log In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...register("email", {required: true})} />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' {...register("password", { required: true })} />
        </div>
        
        <div className={styles.buttons}>
          <Button variant='button' type="submit">Log In</Button>
          <Button variant='outline' type="button" onClick={() => navigate('/register')}>Register</Button>
        </div>
      </form>
    </>
  )
}