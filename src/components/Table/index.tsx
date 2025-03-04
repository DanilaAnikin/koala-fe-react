import {TableProps} from "./types.ts";
import TableRow from "../TableRow";
import {useMemo} from "react";
import TableHeaders from "../TableHeaders";

export default function Table({items, deleteItem}: TableProps){

	const headers = useMemo(() => {
		const firstItem = items[0];
		if(!firstItem){
			return []
		}

		return Object.keys(firstItem).filter(key => key !== 'children')
	}, [items])

	if(!items.length){
		return(
			<span>
				No data
			</span>
		)
	}

	return (
		<div className="border border-slate-100 p-2 rounded">
			{headers.length && (
				<TableHeaders item={items[0]}/>
			)}
			{items.map((item) => (
				<TableRow
					key={item.id}
					item={item}
					deleteItem={(path) => deleteItem([...path])}
				/>
			))}
		</div>
	);
}
