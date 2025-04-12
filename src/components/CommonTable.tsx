import React, { useState, useMemo } from "react";
import styles from "../styles/commonTable.module.css";
import { CommonTableProps } from "../utils/types";

function CommonTable<T extends Record<string, any>>({
  data,
  searchKeys = [],
  loading = false,
  onEdit,
  onDelete,
  pageSize = 5,
}: Omit<CommonTableProps<T>, "columns">) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

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

  // Filtered & sorted data
  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKeys.length) {
      result = result.filter((row) =>
        searchKeys.some((key) =>
          String(row[key]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const order = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortOrder === "asc" ? order : -order;
      });
    }
    return result;
  }, [search, data, sortKey, sortOrder, searchKeys]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <span>{sortOrder === "asc" ? " 🔼" : " 🔽"}</span>
                  )}
                </th>
              ))}
              {(onEdit || onDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.loading}>
                  <div className={styles.shimmer}></div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.empty}>
                  😕 No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={String(col.key)} data-label={col.header}>
                      {String(row[col.key])}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className={styles.actions}>
                      {onEdit && (
                        <button onClick={() => onEdit(row)}>✏️</button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)}>🗑️</button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
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
      )}
    </div>
  );
}

export default CommonTable;
