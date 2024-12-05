import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddFood.module.css"
import { useAuth } from "../../contexts/AuthContext/useAuth";
import {  useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFoodAddMutation } from "../../hooks/mutations/useFoodMutation";

type Inputs = {
  name: string,
  description: string,
  image: string,
  category: string
}

export default function AddFood({foodName}: {foodName: string}) {

  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addFoodMutation = useFoodAddMutation(authContext.userId, foodName, queryClient);

  // food category is fixed here, user can't change it
  const addFood = (data: Inputs) => 
    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: "/",
      category: foodName.toUpperCase()
    })

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({
      defaultValues: {}
    })

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    addFood(data)
    navigate(`/select/${foodName}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FoodDetail foodName={foodName} register={register} errors={errors} displayCategory={false} />
      <div className={styles.buttons}>
        <Link to={`/select/${foodName}`}>Cancel</Link>
        <Button variant="small">Done</Button>
      </div>
    </form>
  )
}