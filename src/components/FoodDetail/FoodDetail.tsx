import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import Button from "../Button/Button"
import styles from "./FoodDetail.module.css"
import clsx from "clsx"
import { ChangeEvent, useState } from "react"

type Inputs = {
  name: string,
  description: string,
  image: File | null,
  category: string,
}


export default function FoodDetail({foodName, register, watch, setValue, errors, displayCategory=true}: 
  {
    foodName: string,
    register: UseFormRegister<Inputs>,
    watch: UseFormWatch<Inputs>,
    setValue: UseFormSetValue<Inputs>,
    errors: FieldErrors,
    displayCategory?: boolean

  }) {

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); 
  const selectedFile = watch("image");

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract file extension

      // Check if the file has a valid extension
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert(`Please upload a valid image file (${allowedExtensions.join(', ')}).`);
        return;
      }

      // setSelectedFile(file);
      setValue("image", file);

      // Generate preview using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("file_input")?.click(); // Programmatically trigger the file input click
  };
  
  return (
    <div className={styles.container}>
      <p className={styles.title}>{`Add ${foodName}`}</p>
      <div className={styles.detail_container}>
        <div className={styles.detail}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" 
              {...register("name", {required: true})} 
            />
            <div className={
              clsx(styles.error_message, {
                [styles.active]: errors.name
              })
            }>
              <span className={styles.error}>This field is required</span>
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea className={styles.textarea} id="description" {...register("description")} />
          </div>
          {
            displayCategory ? (
              <div>
                <label htmlFor="category">Category</label>
                <select id="category" {...register("category")}>
                  <option value="">--Please choose a category--</option>
                  <option value="FRUITS">Fruits</option>
                  <option value="VEGETABLES">Vegetables</option>
                  <option value="PROTEIN">Protein</option>
                  <option value="GRAIN">Grain</option>
                  <option value="DAIRY">Dairy</option>
                </select>
              </div>
            ) : <div></div>
          }
        </div>
        <div className={styles.photo}>
          <div className={styles.photo_display}>
            {preview && (
              <img
                src={preview}
                alt="File Preview"
                className={styles.photo_image}
              />
            )}
          </div>
          {selectedFile && <small>{selectedFile.name}</small>}
          {/* Hidden file input */}
          <input type="file" id="file_input" {...register("image")} 
            onChange={handleFileChange}
            style={{display: 'none'}}
            accept=".jpg,.jpeg,.png,.gif" // Limit file picker to certain extensions
          />
          <Button variant="small" onClick={handleClick}>Upload A Photo</Button>
        </div>
      </div>
    </div>
  )
}