// Used for typing data before transformation, usually would be done via zod transformation or any other validator, yup, formik
export interface RawDataItem {
	data: Record<string, unknown>;
	children?: Record<string, {records: RawDataItem[]}>
}

// Used to type data after transformation, as well as on RawDataItem, the data is NOT validated, it's just a type
export interface DataItem {
	id: string; // ID is either takes from data from raw data or generated using uuid
	children: DataItem[];
	[k: string]: unknown
}

