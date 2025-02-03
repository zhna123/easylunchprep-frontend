import { Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import Button from "../Button/Button"
import styles from "./FoodDetail.module.css"
import clsx from "clsx"
import { ChangeEvent, useState } from "react"
import PillMultiSelect from "../PillMultiSelect/PillMultiSelect"


type Inputs = {
  name: string,
  description: string,
  file: File | null,
  categories: string[],
}


export default function FoodDetail({category, imagePath, control, register, setValue, errors, displayCategory=true}: 
  {
    category: string,
    imagePath: string,
    control: any,
    register: UseFormRegister<Inputs>,
    setValue: UseFormSetValue<Inputs>,
    errors: FieldErrors,
    displayCategory?: boolean

  }) {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); 

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

      setSelectedFile(file);
      setValue("file", file);

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
      <p className={styles.title}>{`Add ${category}`}</p>
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
              <span className={styles.error}>The name field is required</span>
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea className={styles.textarea} id="description" {...register("description")} />
          </div>
          {
            displayCategory ? (
              <>
              <p>Select Categories:</p>

              {/* Wrap the PillMultiSelect in a Controller */}
              <Controller
                name="categories" // The name of the form field
                control={control} // React Hook Form control object
                rules={{
                  required: "You must select at least one category", // Validation rule
                  validate: (value) =>
                    value.length > 0 || "You must select at least one category", // Additional validation
                }}
                render={({ field }) => (
                  <PillMultiSelect
                    value={field.value} // Pass the current field value
                    onChange={field.onChange} // Pass the onChange handler
                    options={[
                      { label: "Fruits", value: "FRUITS" },
                      { label: "Vegetables", value: "VEGETABLES" },
                      { label: "Protein", value: "PROTEIN" },
                      { label: "Grain", value: "GRAIN" },
                      { label: "Dairy", value: "DAIRY" },
                    ]}
                  />
                )}
              />
              {errors.category && <p className="error-message">{String(errors.category.message)}</p>}
              </>
            ) : <div></div>
            
          }
        </div>
        <div className={styles.photo}>
          <div className={styles.photo_display}>
            {
              !preview && (
                <img
                  src={imagePath}
                  alt="food image"
                  className={styles.photo_image} />
              )
            }
            {preview && (
              <img
                src={preview}
                alt="File Preview"
                className={styles.photo_image}
              />
            )}
          </div>
          {selectedFile ? <small>{selectedFile.name}</small> : <small>No file selected.</small>}
          {/* Hidden file input */}
          <input type="file" id="file_input"
            onChange={handleFileChange}
            style={{display: 'none'}}
            accept=".jpg,.jpeg,.png,.gif" // Limit file picker to certain extensions
          />
          <Button type="button" variant="small" onClick={handleClick}>Upload A Photo</Button>
        </div>
      </div>
    </div>
  )
}