import {DataItem} from "../../types";

export interface TableProps {
	items: DataItem[];
	deleteItem: (path: string[]) => void;
}
