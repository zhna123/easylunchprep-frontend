import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddSavedFood.module.css"
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useFoodAddMutation, useFoodUpdateMutation } from "../../hooks/mutations/useFoodMutation";
import { useState } from "react";
import PLACE_HOLDER from '../../assets/default.png'
import { uploadFile } from "../../utils/AxiosUtils";


type Inputs = {
  name: string,
  description: string,
  file: File | null,
  category: string,
}

export default function AddSavedFood({category}: {category: string}) {
  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();

  const [uploading, setUploading] = useState(false);

  const foodData = id ? location.state : null;

  const imagePath = foodData == null || foodData.food.image === '' ? PLACE_HOLDER :
    `${import.meta.env.VITE_S3_BASE_URL}${authContext.userId}/images/${foodData.food.category.toLowerCase()}/${foodData.food.image}` 
  
  const addFoodMutation = useFoodAddMutation(authContext.userId, queryClient);

  const updateMutation = useFoodUpdateMutation(authContext.userId, queryClient);

  const addFood = async (data: Inputs) => {
    // handle image upload to s3
    setUploading(true);
    if (data.file != null) {
      const categoryPrefix = data.category.toLowerCase();
      uploadFile(authContext.userId, categoryPrefix, data.file)
    }

    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: data.file == null ? '' : data.file.name,
      category: data.category
    })
  }
  const updateFood = async (data: Inputs) => {
    setUploading(true);
    if (data.file != null) {
      const categoryPrefix = data.category.toLowerCase();
      uploadFile(authContext.userId, categoryPrefix, data.file)
    }
    // if data.file is null, no image change made, so no need to upload again
    updateMutation.mutate({
      id: id!,
      name: data.name,
      description: data.description,
      image: data.file == null ? foodData.food.image : data.file.name,
      category: data.category
    })
  }

  const {
    register,
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
      <FoodDetail category={category} imagePath={imagePath} register={register} setValue={setValue} errors={errors}/>
      <div className={styles.buttons}>
        <Link to={`/account/food`}>Cancel</Link>
        <Button variant="small" type="submit">
          {uploading ? "Submitting..." : "Done"}
        </Button>
      </div>
    </form>
    </>
  )
}