import React from "react";
import styles from "../styles/pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];
    const delta = 0;
    let lastPage: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        if (lastPage !== null && i - lastPage > 1) {
          pages.push("...");
        }
        pages.push(i);
        lastPage = i;
      }
    }

    return pages;
  };

  return (
    <div className={`${styles.paginationWrapper} ${className}`}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.navButton}
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(Number(page))}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.navButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
