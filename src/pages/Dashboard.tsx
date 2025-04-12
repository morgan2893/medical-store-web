import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Dashboard</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>💊 Medicines</h3>
          <p>120</p>
        </div>
        <div className={styles.card}>
          <h3>👤 Customers</h3>
          <p>58</p>
        </div>
        <div className={styles.card}>
          <h3>💵 Sales</h3>
          <p>₹45,230</p>
        </div>
        <div className={styles.card}>
          <h3>📦 Low Stock</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
