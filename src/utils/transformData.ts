import {DataItem, RawDataItem} from "../types";
import {v4 as uuidV4} from 'uuid'

/**
 * The json data structure has the following system: item -> {data, children}
 * Children -> has_xxx -> records -> items (and again, iterated)
 * This transformer takes care of unnecessary levels
 */
export function transformData(item: RawDataItem): DataItem{
	if(!item.data){
		throw new Error("Invalid item")
	}

	if(!item.children){
		return transformItem({...item.data, children: []});
	}

	const childrenValues = Object.entries(item.children)

	if(childrenValues.length === 0){
		return transformItem({...item.data, children: []});
	}

	// In here I assume that there is only one children object, that's why the 0 index access
	const childrenValue = childrenValues[0][1]

	if(!childrenValue.records){
		return transformItem({...item.data, children: []});
	}

	return transformItem({
		...item.data,
		children: childrenValue.records.map(r => transformData(r))
	})
}

/*
* In order to have at least some data consistency, we convert all the IDs to string values and if they're not present
* Wel generate unique UUID
* */
function transformItem(item: Omit<DataItem, 'id'>){
	return {
		...item,
		id: item.id ? `${item.id}` : uuidV4(),
	} as DataItem
}
