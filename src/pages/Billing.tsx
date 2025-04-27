import React, { useEffect, useState } from "react";
import styles from "../styles/billing.module.css";
import CommonTable from "../components/CommonTable";
import axiosInstance from "../services/api/axiosInstance";
import showToast from "../services/common/toast";
import Loader from "../components/Loader";

type Medicine = {
  name: string;
  quantity: number;
  price: number;
};

const Billing: React.FC = () => {
  const [customer, setCustomer] = useState<string>("Select Customer");
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const customers = await axiosInstance.get("/customers");
        console.log(customers);
      } catch (err: any) {
        showToast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const handleAddMedicine = () => {
    if (!medicineName || quantity <= 0 || price <= 0) return;

    const newMed: Medicine = {
      name: medicineName,
      quantity,
      price,
    };

    setMedicines([...medicines, newMed]);
    setMedicineName("");
    setQuantity(1);
    setPrice(0);
  };

  const total = medicines.reduce(
    (acc, med) => acc + med.quantity * med.price,
    0
  );

  const handleGenerateBill = () => {
    if (customer === "Select Customer" || medicines.length === 0) {
      alert("Please select a customer and add at least one medicine.");
      return;
    }
    alert(`Bill generated for ${customer} - ₹${total}`);
    // Here you can trigger PDF generation / backend call etc.
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Medical Store Billing</h1>

      <div className={styles.section}>
        <label>Customer:</label>
        <select
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className={styles.select}
        >
          <option disabled>Select Customer</option>
          <option>Rahul Sharma</option>
          <option>Priya Mehta</option>
          <option>Vikram Singh</option>
        </select>
      </div>

      <div className={styles.section}>
        <h3 className={styles.addMedText}>Add Medicine</h3>
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          min={0}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={styles.input}
        />
        <button onClick={handleAddMedicine} className={styles.addBtn}>
          + Add
        </button>
      </div>
      {medicines && medicines.length > 0 && (
        <>
          <CommonTable data={medicines} />
          <button className={styles.generateBtn} onClick={handleGenerateBill}>
            🧾 Generate Bill
          </button>
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Billing;
