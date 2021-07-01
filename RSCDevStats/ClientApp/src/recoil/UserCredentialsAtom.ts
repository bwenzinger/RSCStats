import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const UserCredentialsState = atom<string | undefined>({
	key: "userCredentials", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
	effects_UNSTABLE: [persistAtom],
})
