import { SetterOrUpdater, useRecoilState } from "recoil"
import { UserCredentialsState } from "../recoil/UserCredentialsAtom"

export function nameof<T>(key: keyof T, instance?: T): keyof T {
	return key
}

export const CaseInsensitiveComparator = (valueA, valueB) => {
	return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
}
