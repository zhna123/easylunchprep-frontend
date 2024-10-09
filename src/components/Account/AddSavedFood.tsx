import { Link, useNavigate } from "react-router-dom";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddSavedFood.module.css"
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { addNewFood } from "../../utils/AxiosUtils";
import { FoodInput } from "../../types/types";


type Inputs = {
  name: string,
  description: string,
  image: string,
}

export default function AddSavedFood({foodName}: {foodName: string}) {
  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addFoodMutation = useMutation({
    mutationFn: async (foodInput: FoodInput) => {
      const response = await addNewFood(authContext.userId, foodInput);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authContext.userId, 'food'], exact: true })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data)
    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: "/",
      category: "FRUITS"
    })
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
      <FoodDetail foodName={foodName} register={register} errors={errors}/>
      <div className={styles.buttons}>
        <Link to={`/account/food`}>Cancel</Link>
        <Button variant="small" type="submit">Done</Button>
      </div>
    </form>
    </>
  )
}