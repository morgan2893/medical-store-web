import React from "react";
import * as Yup from "yup";
import styles from "../styles/login.module.css";
import { useFormik } from "formik";
import axiosInstance from "../services/api/axiosInstance";
import axios from "axios";
import { useAppDispatch } from "../services/redux/hooks";
import { login } from "../services/redux/slices/userSlice";
import showToast from "../services/common/toast";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: LoginFormValues) => {
      try {
        const response: any = await axiosInstance.post("/auth/login", values);
        dispatch(login(response.data));
        const { token, data } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", data.role);

        showToast.success("Login successful!");
        navigate("/user"); // Redirect to dashboard or home page
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Login failed:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>🩺 MedStore</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p className={styles.footer}>© 2025 MedStore</p>
      </div>
    </div>
  );
};

export default Login;
