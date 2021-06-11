import { ColDef } from "ag-grid-community"
import { nameof } from "../utils/utils"
import { IndividualGamePlayerStats } from "./CumulativePlayerStats"

const WeeklyPerGameStatsTableColDefs: ColDef[] = [
	{
		checkboxSelection: true,
		headerCheckboxSelection: true,
		pinned: true,
		width: 20,
	},
	{
		headerName: "Name",
		field: nameof<IndividualGamePlayerStats>("Name"),
		pinned: true,
	},
	{ headerName: "RSCId", field: nameof<IndividualGamePlayerStats>("RSCId") },
	{
		headerName: "OnlineId",
		field: nameof<IndividualGamePlayerStats>("OnlineId"),
	},
	{
		headerName: "ReplayId",
		field: nameof<IndividualGamePlayerStats>("ReplayId"),
	},
	{
		headerName: "Replay Title",
		field: nameof<IndividualGamePlayerStats>("ReplayTitle"),
	},
	{ headerName: "Tier", field: nameof<IndividualGamePlayerStats>("Tier") },
	{ headerName: "Team", field: nameof<IndividualGamePlayerStats>("Team") },
	{
		headerName: "Oponent Team",
		field: nameof<IndividualGamePlayerStats>("OponentTeam"),
	},
	{
		headerName: "Wins",
		field: nameof<IndividualGamePlayerStats>("GamesWon"),
	},
	{
		headerName: "Losses",
		field: nameof<IndividualGamePlayerStats>("GamesLost"),
	},
	{ headerName: "Score", field: nameof<IndividualGamePlayerStats>("Score") },
	{ headerName: "Goals", field: nameof<IndividualGamePlayerStats>("Goals") },
	{
		headerName: "Assists",
		field: nameof<IndividualGamePlayerStats>("Assists"),
	},
	{ headerName: "Saves", field: nameof<IndividualGamePlayerStats>("Saves") },
	{ headerName: "Shots", field: nameof<IndividualGamePlayerStats>("Shots") },
	{ headerName: "MVP", field: nameof<IndividualGamePlayerStats>("MVP") },
	{ headerName: "Cycle", field: nameof<IndividualGamePlayerStats>("Cycle") },
	{
		headerName: "Hat Tricks",
		field: nameof<IndividualGamePlayerStats>("HatTrick"),
	},
	{
		headerName: "Playmakers",
		field: nameof<IndividualGamePlayerStats>("Playmaker"),
	},
	{ headerName: "Saviors", field: nameof<IndividualGamePlayerStats>("Savior") },
	{
		headerName: "GoalsAgainst",
		field: nameof<IndividualGamePlayerStats>("GoalsAgainst"),
	},
	{
		headerName: "ShotsAgainst",
		field: nameof<IndividualGamePlayerStats>("ShotsAgainst"),
	},
	{ headerName: "bpm", field: nameof<IndividualGamePlayerStats>("Bpm") },
]

export default WeeklyPerGameStatsTableColDefs
