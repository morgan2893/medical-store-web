import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api/axiosInstance";
import { removeKeysFromArray } from "../services/common/helperFunctions";
import CommonTable from "../components/CommonTable";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import styles from "../styles/medicines.module.css";
import { useNavigate } from "react-router-dom";

const Medicines = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: any = await axiosInstance.get(`/products?page=${page}`);
        setData(
          removeKeysFromArray(response.data.data, [
            "createdBy",
            "__v",
            "_id",
            "createdAt",
            "addedBy",
          ])
        );
        setPagination(response.data.pagination);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);
  return (
    <div style={{ padding: 16 }}>
      <div className={styles.header}>
        <h2>Medicines</h2>
        <button
          className={styles.addButton}
          onClick={() => navigate("/add-medicine")}
        >
          Add medicine
        </button>
      </div>
      <CommonTable data={data} />
      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages}
        onPageChange={(page) => setPage(page)}
      />
      {loading && <Loader visible={loading} message="Fetching your data..." />}
    </div>
  );
};

export default Medicines;
