import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "../styles/stock.module.css";
import { useNavigate } from "react-router-dom";
import showToast from "../services/common/toast";
import Loader from "../components/Loader";
import axiosInstance from "../services/api/axiosInstance";
import { Dropdown } from "primereact/dropdown";

interface MedicineFormValues {
  batchNo: string;
  expiryDate: string;
  distributor: string;
  price: string;
  quantity: string;
  pricePerUnit: string;
  products: string;
}

const AddStock: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const initialValues: MedicineFormValues = {
    batchNo: "",
    expiryDate: "",
    distributor: "",
    price: "",
    quantity: "",
    pricePerUnit: "",
    products: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Required"),
    batchNo: Yup.string().trim().required("Required"),
    expiryDate: Yup.string().trim().required("Required"),
    distributor: Yup.string().trim().required("Required"),
    price: Yup.string().trim().required("Required"),
    quantity: Yup.string().trim().required("Required"),
    pricePerUnit: Yup.string().trim().required("Required"),
    products: Yup.string().trim().required("Required"),
  });

  const onSubmit = async (
    values: MedicineFormValues,
    { resetForm }: FormikHelpers<MedicineFormValues>
  ) => {
    console.log(values);
    try {
      const res = await axiosInstance.post("/stocks", values);
      if (res.status === 201) {
        showToast.success("stock added successfully!");
        // navigate("/medicines");
      } else {
        showToast.error("Failed to add medicine.");
      }
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
    console.log("Form values:", values);
    // resetForm();
  };

  const formik = useFormik<MedicineFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: any = await axiosInstance.get(`/stocks`);
        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Medicine</h2>
      <div className={styles.formGroup}>
        <label>Bach No.</label>
        <input
          name="batchNo"
          value={values.batchNo}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.batchNo && errors.batchNo && (
          <div className={styles.error}>{errors.batchNo}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Expiry Date</label>
        <input
          name="expiryDate"
          value={values.expiryDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.expiryDate && errors.expiryDate && (
          <div className={styles.error}>{errors.expiryDate}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>distributor</label>
        <input
          name="distributor"
          value={values.distributor}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.distributor && errors.distributor && (
          <div className={styles.error}>{errors.distributor}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>price</label>
        <input
          name="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.price && errors.price && (
          <div className={styles.error}>{errors.price}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>quantity</label>
        <input
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.quantity && errors.quantity && (
          <div className={styles.error}>{errors.quantity}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>pricePerUnit</label>
        <input
          name="pricePerUnit"
          value={values.pricePerUnit}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {touched.pricePerUnit && errors.pricePerUnit && (
          <div className={styles.error}>{errors.pricePerUnit}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Product</label>
        <Dropdown
          name="products"
          value={values.products}
          onChange={(e) => formik.setFieldValue("products", e.value)}
          options={products}
          optionLabel="name"
          placeholder="Select a Product"
          className="w-full md:w-14rem"
          checkmark={true}
          highlightOnSelect={false}
        />

        {touched.products && errors.products && (
          <div className={styles.error}>{errors.products}</div>
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

export default AddStock;
