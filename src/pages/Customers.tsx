import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import axiosInstance from "../services/api/axiosInstance";
import Pagination from "../components/Pagination";
import { removeKeysFromArray } from "../services/common/helperFunctions";
import Loader from "../components/Loader";

interface Customer {
  name: string;
  phone: string;
  balance: string;
}

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: any = await axiosInstance.get(
          `/customers?page=${page}`
        );
        setData(
          removeKeysFromArray(response.data.data, [
            "createdBy",
            "__v",
            "_id",
            "createdAt",
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
      <h2>Customers</h2>
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

export default Customers;
