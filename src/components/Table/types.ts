import { DataItem } from "../../types";

export interface TableProps {
  items: DataItem[];
  deleteItem: (path: string[]) => void;
  // When false, "No data" is not displayed when items is empty.
  showEmptyMessage?: boolean;
}
