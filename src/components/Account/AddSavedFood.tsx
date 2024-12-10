import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddSavedFood.module.css"
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useFoodAddMutation, useFoodUpdateMutation } from "../../hooks/mutations/useFoodMutation";


type Inputs = {
  name: string,
  description: string,
  image: File | null,
  category: string,
}

export default function AddSavedFood({foodName}: {foodName: string}) {
  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();

  const foodData = id ? location.state : null;

  const addFoodMutation = useFoodAddMutation(authContext.userId, foodName, queryClient);

  const updateMutation = useFoodUpdateMutation(authContext.userId, foodName, queryClient);

  const addFood = (data: Inputs) => 
    // TODO need handle image upload to s3
    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: data.image == null ? '' : data.image.name,
      category: data.category
    })
  const updateFood = (data: Inputs) => 
    updateMutation.mutate({
      id: id!,
      name: data.name,
      description: data.description,
      image: data.image == null ? '' : data.image.name,
      category: data.category
    })

  const {
    register,
    watch,
    setValue,
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
    navigate("/account/food")
  }
  
  return (
    <>
    <Header showLogInButton={authContext.isAuthenticated ? false : true} />
      {
        addFoodMutation.isError ? (
          <div>An error occurred: {addFoodMutation.error.message}</div>
        ) : null
      }

      {addFoodMutation.isSuccess ? <div>Food added!</div> : null}
    <form onSubmit={handleSubmit(onSubmit)}>
      <FoodDetail foodName={foodName} register={register} watch={watch} setValue={setValue} errors={errors}/>
      <div className={styles.buttons}>
        <Link to={`/account/food`}>Cancel</Link>
        <Button variant="small" type="submit">Done</Button>
      </div>
    </form>
    </>
  )
}