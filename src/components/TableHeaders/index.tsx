import {TableHeaderProps} from "./types.ts";
import {useMemo} from "react";

export default function TableHeaders({item}: TableHeaderProps){
	const headers = useMemo(() => Object.keys(item).filter(key => key !== 'children'), [item])

	if(!headers.length){
		return <></>
	}

	return (
		<div
			className="grid bg-black p-2 font-bold rounded border border-gray-700"
			style={{ gridTemplateColumns: `minmax(0, 30px) repeat(${headers.length}, minmax(0, 1fr)) minmax(0, 100px)` }}
		>
			{/* Empty div for expansion icon*/}
			<div/>
			{headers.map((key, index) => (
				<div key={index} className="text-center overflow-hidden px-2">{key}</div>
			))}
			<div className="text-center">
				Actions
			</div>
		</div>
	)
}
