import React, { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import axiosInstance from "../services/api/axiosInstance";

interface Customer {
  name: string;
  phone: string;
  balance: string;
}

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Customer[]>([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // simulate API
  }, []);
  const handleEdit = (row: Customer) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row: Customer) => {
    console.log("Delete:", row);
  };

  function removeKeysFromArray(arr: any, keysToRemove: any) {
    return arr.map((obj: any) =>
      Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
      )
    );
  }
  useEffect(() => {
    (async () => {
      try {
        const response: any = await axiosInstance.get("/customers");

        console.log(
          removeKeysFromArray(response.data.data, ["createdBy", "__v", "_id"])
        ); // Handle the fetched data as needed
        setData(
          removeKeysFromArray(response.data.data, [
            "createdBy",
            "__v",
            "_id",
            "createdAt",
          ])
        );
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h2>Customers</h2>
      <CommonTable
        data={data}
        searchKeys={["name", "phone"]}
        loading={loading}
        pageSize={5}
        onEdit={(row) => console.log("Edit", row)}
        onDelete={(row) => console.log("Delete", row)}
      />
    </div>
  );
};

export default Customers;
