export interface Column<T> {
  header: string;
  key: keyof T;
  sortable?: boolean;
}

export interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  searchKeys?: (keyof T)[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSize?: number;
}
