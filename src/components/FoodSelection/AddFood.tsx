import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FoodDetail from "../FoodDetail/FoodDetail";
import styles from "./AddFood.module.css"
import { useAuth } from "../../contexts/AuthContext/useAuth";
import {  useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFoodAddMutation } from "../../hooks/mutations/useFoodMutation";
import PLACE_HOLDER from '../../assets/default.png'
import { uploadFile } from "../../utils/AxiosUtils";
import { useState } from "react";


type Inputs = {
  name: string,
  description: string,
  file: File | null,
  category: string
}

export default function AddFood({category}: {category: string}) {

  const authContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);

  const addFoodMutation = useFoodAddMutation(authContext.userId, queryClient, category);

  // food category is fixed here, user can't change it
  const addFood = async (data: Inputs) => {
    setUploading(true);
    if (data.file != null) {
      const categoryPrefix = category.toLowerCase();
      uploadFile(authContext.userId, categoryPrefix, data.file)
    }

    addFoodMutation.mutate({
      name: data.name,
      description: data.description,
      image: data.file == null ? '' : data.file.name,
      category: category.toUpperCase()
    })
  }

  const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({
      defaultValues: {}
    })

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    addFood(data)
    navigate(`/select/${category}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FoodDetail category={category} imagePath={PLACE_HOLDER} register={register} setValue={setValue} errors={errors} displayCategory={false} />
      <div className={styles.buttons}>
        <Link to={`/select/${category}`}>Cancel</Link>
        <Button variant="small" type="submit">
          {uploading ? "Submitting..." : "Done"}
        </Button>
      </div>
    </form>
  )
}