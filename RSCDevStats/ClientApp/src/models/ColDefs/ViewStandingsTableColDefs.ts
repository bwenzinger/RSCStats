import { ColDef } from "ag-grid-community"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { MatchResult } from "../MatchResult"
import { Standing } from "../Standing"

const ViewStandingsTableColDefs: ColDef[] = [
	{
		headerName: "Tier",
		field: nameof<Standing>("Tier"),
		comparator: CaseInsensitiveComparator,
	},
	{ headerName: "Team", field: nameof<Standing>("Team") },
	{
		headerName: "GamesPlayed",
		field: nameof<Standing>("GamesPlayed"),
	},
	{
		headerName: "Wins",
		field: nameof<Standing>("Wins"),
	},
	{
		headerName: "Losses",
		field: nameof<Standing>("Losses"),
	},
]

export default ViewStandingsTableColDefs
