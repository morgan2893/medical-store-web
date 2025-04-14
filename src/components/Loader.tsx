import React from "react";
import styles from "../styles/loader.module.css";

type LoaderProps = {
  message?: string;
  visible?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  visible = false,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
