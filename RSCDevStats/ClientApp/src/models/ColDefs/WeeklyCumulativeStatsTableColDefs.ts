import { ColDef } from "ag-grid-community"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { CumulativePlayerStats } from "../CumulativePlayerStats"

const WeeklyCumulativeStatsTableColDefs: ColDef[] = [
	{
		checkboxSelection: true,
		headerCheckboxSelection: true,
		pinned: true,
		width: 20,
	},
	{
		headerName: "Name",
		field: nameof<CumulativePlayerStats>("Name"),
		pinned: true,
		comparator: CaseInsensitiveComparator,
	},
	{ headerName: "RSCId", field: nameof<CumulativePlayerStats>("RSCId") },
	// { headerName: "OnlineId", field: nameof<CumulativePlayerStats>("OnlineId") },
	{ headerName: "Tier", field: nameof<CumulativePlayerStats>("Tier") },
	{ headerName: "Team", field: nameof<CumulativePlayerStats>("Team") },
	{
		headerName: "Games Played",
		field: nameof<CumulativePlayerStats>("GamesPlayed"),
	},
	{ headerName: "Games Won", field: nameof<CumulativePlayerStats>("GamesWon") },
	{
		headerName: "Games Lost",
		field: nameof<CumulativePlayerStats>("GamesLost"),
	},
	{ headerName: "Score", field: nameof<CumulativePlayerStats>("Score") },
	{ headerName: "Goals", field: nameof<CumulativePlayerStats>("Goals") },
	{ headerName: "Assists", field: nameof<CumulativePlayerStats>("Assists") },
	{ headerName: "Saves", field: nameof<CumulativePlayerStats>("Saves") },
	{ headerName: "Shots", field: nameof<CumulativePlayerStats>("Shots") },
	{ headerName: "MVPs", field: nameof<CumulativePlayerStats>("MVPs") },
	{ headerName: "Cycle", field: nameof<CumulativePlayerStats>("Cycle") },
	{ headerName: "HatTrick", field: nameof<CumulativePlayerStats>("HatTrick") },
	{
		headerName: "Playmaker",
		field: nameof<CumulativePlayerStats>("Playmaker"),
	},
	{ headerName: "Savior", field: nameof<CumulativePlayerStats>("Savior") },
	{
		headerName: "GoalsAgainst",
		field: nameof<CumulativePlayerStats>("GoalsAgainst"),
	},
	{
		headerName: "ShotsAgainst",
		field: nameof<CumulativePlayerStats>("ShotsAgainst"),
	},
]

export default WeeklyCumulativeStatsTableColDefs
