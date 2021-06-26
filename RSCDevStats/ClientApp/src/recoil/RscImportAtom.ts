import { atom } from "recoil"
import { LeagueTeam } from "../models/LeagueTeam"
import { PlayerDetails } from "../models/PlayerDetails"

export const PlayerDetailsState = atom<PlayerDetails[] | undefined>({
	key: "playerDetails", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})

// export const UniquePlayerNamesState = atom<string[] | undefined>({
// 	key: "uniquePlayerNames", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

// export const PlayerContractsState = atom<PlayerContract[] | undefined>({
// 	key: "playerContracts", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

export const LeagueTeamsState = atom<LeagueTeam[] | undefined>({
	key: "leagueTeams", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})
