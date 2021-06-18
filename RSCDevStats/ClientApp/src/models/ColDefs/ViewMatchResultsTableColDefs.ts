import { ColDef } from "ag-grid-community"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { MatchResult } from "../MatchResult"

const ViewMatchResultsTableColDefs: ColDef[] = [
	{
		headerName: "Week",
		field: nameof<MatchResult>("Week"),
		comparator: CaseInsensitiveComparator,
	},
	{ headerName: "Tier", field: nameof<MatchResult>("Tier") },
	{
		headerName: "HomeTeam",
		field: nameof<MatchResult>("HomeTeam"),
	},
	{
		headerName: "HomeTeamWins",
		field: nameof<MatchResult>("HomeTeamWins"),
	},
	{
		headerName: "AwayTeam",
		field: nameof<MatchResult>("AwayTeam"),
	},
	{ headerName: "AwayTeamWins", field: nameof<MatchResult>("AwayTeamWins") },
]

export default ViewMatchResultsTableColDefs
