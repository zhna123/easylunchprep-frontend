import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddFood.module.css"
import { useAuth } from "../../hooks/useAuth";
import {  useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFoodAddMutation, useFoodUpdateMutation } from "../../hooks/mutations/useFoodMutation";

type Inputs = {
  name: string,
  description: string,
  image: string,
}

export default function AddFood({foodName}: {foodName: string}) {

  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const location = useLocation();

  const foodData = id ? location.state : null;

  const addFoodMutation = useFoodAddMutation(authContext.userId, queryClient);

  const updateMutation = useFoodUpdateMutation(authContext.userId, queryClient);

  const addFood = (data: Inputs) => 
    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: "/",
      category: "FRUITS"
    })
  const updateFood = (data: Inputs) => 
    updateMutation.mutate({
      id: id!,
      name: data.name,
      description: data.description,
      image: "/",
      category: "FRUITS"
    })

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({
      defaultValues: foodData ? foodData.food : {}
    })

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (id) {
      updateFood(data)
    } else {
      addFood(data)
    }
    navigate(`/select/${foodName}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FoodDetail foodName={foodName} register={register} errors={errors} />
      <div className={styles.buttons}>
        <Link to={`/select/${foodName}`}>Cancel</Link>
        <Button variant="small">Done</Button>
      </div>
    </form>
  )
}