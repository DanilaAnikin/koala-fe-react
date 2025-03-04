import {DataItem} from "../../types";

export interface TableRowProps {
	item: DataItem;
	deleteItem: (path: string[]) => void;
}
