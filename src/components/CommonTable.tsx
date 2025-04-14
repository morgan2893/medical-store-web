import React, { useState, useMemo } from "react";
import styles from "../styles/commonTable.module.css";
import { CommonTableProps } from "../utils/types";

function CommonTable<T extends Record<string, any>>({
  data,
  loading = false,
}: Omit<CommonTableProps<T>, "columns">) {
  const [search, setSearch] = useState("");

  // Dynamically generate columns from first item in data
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      key: key as keyof T,
      header: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      sortable: true,
    }));
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.header}</th>
              ))}
              {/* {(onEdit || onDelete) && <th>Actions</th>} */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.loading}>
                  <div className={styles.shimmer}></div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.empty}>
                  😕 No records found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={String(col.key)} data-label={col.header}>
                      {String(row[col.key])}
                    </td>
                  ))}
                  {/* {(onEdit || onDelete) && (
                    <td className={styles.actions}>
                      {onEdit && (
                        <button onClick={() => onEdit(row)}>✏️</button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)}>🗑️</button>
                      )}
                    </td>
                  )} */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* {!loading && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next ➡
          </button>
        </div>
      )} */}
    </div>
  );
}

export default CommonTable;
