import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddSavedFood.module.css"
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewFood, updateFoodById } from "../../utils/AxiosUtils";
import { Food, FoodInput } from "../../types/types";


type Inputs = {
  name: string,
  description: string,
  image: string,
}

export default function AddSavedFood({foodName}: {foodName: string}) {
  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();

  const foodData = id ? location.state : null;

  const addFoodMutation = useMutation({
    mutationFn: async (foodInput: FoodInput) => {
      const response = await addNewFood(authContext.userId, foodInput);
      return response.data;
    },
    onSuccess: (data) => {
      // set temporary cache 
      queryClient.setQueryData(['food', String(data.id)], data)
      queryClient.invalidateQueries({ queryKey: [authContext.userId, 'food'], exact: true })
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (food: Food) => {
      const response = await updateFoodById(food.id, food)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['food', String(data.id)], data)
      queryClient.invalidateQueries({ queryKey: [authContext.userId, 'food'], exact: true })
    }
  })

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
      <FoodDetail foodName={foodName} register={register} errors={errors} foodData={foodData}/>
      <div className={styles.buttons}>
        <Link to={`/account/food`}>Cancel</Link>
        <Button variant="small" type="submit">Done</Button>
      </div>
    </form>
    </>
  )
}