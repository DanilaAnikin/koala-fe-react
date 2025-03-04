import data from '../data/data.json'
import {RawDataItem} from "../types.ts";

/**
 * Api Load data
 * Returns data from example json file, can be made asynchronous and load data from external API
 */
export function apiLoadData(){
	return data as RawDataItem[]
}
