import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "../styles/addMedicine.module.css";
import { useNavigate } from "react-router-dom";
import showToast from "../services/common/toast";
import Loader from "../components/Loader";
import axiosInstance from "../services/api/axiosInstance";

interface MedicineFormValues {
  name: string;
  description: string;
  category:
    | "tablet"
    | "syrup"
    | "capsule"
    | "drop"
    | "ointment"
    | "equipment"
    | "personal_care"
    | "other";
  manufacturer: string;
}

const AddMedicine: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const initialValues: MedicineFormValues = {
    name: "",
    description: "",
    category: "tablet",
    manufacturer: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Required"),
    description: Yup.string().trim(),
    category: Yup.string()
      .oneOf([
        "tablet",
        "syrup",
        "capsule",
        "drop",
        "ointment",
        "equipment",
        "personal_care",
        "other",
      ])
      .required("Required"),
    manufacturer: Yup.string().trim(),
  });

  const onSubmit = async (
    values: MedicineFormValues,
    { resetForm }: FormikHelpers<MedicineFormValues>
  ) => {
    console.log(values);
    try {
      const res = await axiosInstance.post("/products", values);
      if (res.status === 201) {
        showToast.success("Medicine added successfully!");
        navigate("/medicines");
      } else {
        showToast.error("Failed to add medicine.");
      }
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
    console.log("Form values:", values);
    resetForm();
  };

  const formik = useFormik<MedicineFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Medicine</h2>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.name && errors.name && (
          <div className={styles.error}>{errors.name}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.textarea}
        />
        {touched.description && errors.description && (
          <div className={styles.error}>{errors.description}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Category</label>
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        >
          <option value="tablet">Tablet</option>
          <option value="capsule">Capsule</option>
          <option value="syrup">Syrup</option>
          <option value="drop">Drop</option>
          <option value="ointment">Ointment</option>
          <option value="equipment">Equipment</option>
          <option value="personal_care">Personal Care</option>
          <option value="other">Other</option>
        </select>
        {touched.category && errors.category && (
          <div className={styles.error}>{errors.category}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Manufacturer</label>
        <input
          name="manufacturer"
          value={values.manufacturer}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.manufacturer && errors.manufacturer && (
          <div className={styles.error}>{errors.manufacturer}</div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => navigate("/medicines")}
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Add Medicine
        </button>
      </div>
      {isLoading && <Loader />}
    </form>
  );
};

export default AddMedicine;
