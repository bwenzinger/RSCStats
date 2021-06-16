import { ColDef } from "ag-grid-community"
import PlayerSelectCellRenderer from "../../components/StatsProcessing/cellRenderers/PlayerSelectCellRenderer"
import { nameof } from "../../utils/utils"
import { ManualPlayerStatsEntry } from "../ManualPlayerStatsEntry"

const ManualStatsEntryColDef: ColDef[] = [
	{
		headerName: "Player",
		field: nameof<ManualPlayerStatsEntry>("Player"),
		pinned: true,
		cellRenderer: "playerSelectCellRenderer",
		width: 350,
		editable: false,
	},
	{
		headerName: "Won?",
		field: nameof<ManualPlayerStatsEntry>("Won"),
		width: 90,
		cellRenderer: "checkboxCellRenderer",
		editable: false,
	},
	{
		headerName: "MVP?",
		field: nameof<ManualPlayerStatsEntry>("MVP"),
		width: 90,
		cellRenderer: "checkboxCellRenderer",
		editable: false,
	},
	{
		headerName: "Score",
		field: nameof<ManualPlayerStatsEntry>("Score"),
		width: 100,
	},
	{
		headerName: "Goals",
		field: nameof<ManualPlayerStatsEntry>("Goals"),
		width: 100,
	},
	{
		headerName: "Assists",
		field: nameof<ManualPlayerStatsEntry>("Assists"),
		width: 100,
	},
	{
		headerName: "Saves",
		field: nameof<ManualPlayerStatsEntry>("Saves"),
		width: 100,
	},
	{
		headerName: "Shots",
		field: nameof<ManualPlayerStatsEntry>("Shots"),
		width: 100,
	},
]

export default ManualStatsEntryColDef
