export function nameof<T>(key: keyof T, instance?: T): keyof T {
	return key
}

export const CaseInsensitiveComparator = (valueA, valueB) => {
	return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
}
