import React from "react"
import styled from "styled-components"
import { PlayerTrackerId } from "../../models/PlayerTrackerId"
import { atom, useRecoilState } from "recoil"
import { Add, Save } from "@material-ui/icons"
import { ManualPlayerStatsEntry } from "../../models/ManualPlayerStatsEntry"
import { v4 as uuidv4 } from "uuid"
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap"
import { IndividualGamePlayerStats } from "../../models/CumulativePlayerStats"
import ManualStatsEntryList from "./ManualStatsEntryList"
import { AgGridColumn, AgGridReact } from "ag-grid-react"
import { GridOptions } from "ag-grid-community"
import ManualStatsEntryColDef from "../../models/ColDefs/ManualStatsEntryColDef"
import BackendApi from "../../BackendApi"
import PlayerSelectCellRenderer from "./cellRenderers/PlayerSelectCellRenderer"
import { nameof } from "../../utils/utils"
import PlayerWonCellRenderer from "./cellRenderers/CheckboxCellRenderer"
import CheckboxCellRenderer from "./cellRenderers/CheckboxCellRenderer"
import { Autocomplete } from "@material-ui/lab"
import { TextField } from "@material-ui/core"
import { isObject } from "util"

interface Props {
	className?: string
}

const backendApi = new BackendApi()

const playerTrackerIdsState = atom<PlayerTrackerId[] | undefined>({
	key: "playerTrackerIds", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})

const leagues = [
	"Premier",
	"Master",
	"Elite",
	"Major",
	"Minor",
	"Challenger",
	"Prospect",
	"Contender",
	"Amateur",
]

// const initTestData: ManualPlayerStatsEntry[] = [
// 	{
// 		id: uuidv4(),
// 		Player: "bob",
// 	},
// ]

// const frameworkComponents = {
// 	playerSelectCellRenderer: PlayerSelectCellRenderer,
// }

const ManualStatsEntryNew = (props: Props) => {
	const [playerTrackerIds] = useRecoilState<PlayerTrackerId[] | undefined>(
		playerTrackerIdsState
	)

	const [selectedLeague, setSelectedLeague] =
		React.useState<string | null>(null)

	const [showUploadingModal, setShowUploadingModal] =
		React.useState<boolean>(false)

	const [isUploading, setIsUploading] = React.useState<boolean>(false)

	const [gridOptions] = React.useState<GridOptions>({
		// rowSelection: "multiple",
		// frameworkComponents: { frameworkComponents },
		defaultColDef: {
			editable: true,
			resizable: true,
			// sortable: true,
		},
	})

	React.useEffect(() => {
		function setSelectedCellValueAsPasteValue(event: any) {
			// var clipboardData = event.clipboardData || window.clipboardData

			var clipboardData = event.clipboardData
			var pastedData = clipboardData.getData("Text")

			const focusedCell = gridOptions.api?.getFocusedCell()
			if (focusedCell) {
				const rowNodeToUpdate = gridOptions.api?.getDisplayedRowAtIndex(
					focusedCell!!.rowIndex
				)
				if (rowNodeToUpdate) {
					if (
						focusedCell.column.getColDef().field ===
						nameof<ManualPlayerStatsEntry>("Player")
					) {
						const foundPlayer = playerTrackerIds?.find(
							(x) => x.Name === pastedData
						)
						if (foundPlayer) {
							rowNodeToUpdate.setDataValue(focusedCell.column, foundPlayer)
						}
					} else {
						rowNodeToUpdate.setDataValue(focusedCell.column, pastedData)
					}

					// gridOptions.api?.refreshCells({
					// 	rowNodes: [rowNodeToUpdate],
					// })
					gridOptions.api?.redrawRows({
						rowNodes: [rowNodeToUpdate],
					})
				}
			}
		}

		window.addEventListener("paste", setSelectedCellValueAsPasteValue)

		return () =>
			window.removeEventListener("paste", setSelectedCellValueAsPasteValue)
	}, [gridOptions.api, playerTrackerIds])

	return (
		<div
			className={
				props.className +
				" ag-theme-material manual-stats-entry material-drop-shadow"
			}
		>
			<Autocomplete
				className="manual-stats-entry-autocomplete"
				options={leagues}
				// getOptionLabel={(option) => {
				// 	return option
				// }}
				// defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Select League"
						// placeholder="Favorites"
					/>
				)}
				onChange={onLeagueChange}
			/>
			<Button
				className="headerButton action-button-color material-drop-shadow"
				onClick={() => {
					var newItems = [{}]
					var res = gridOptions.api?.applyTransaction({
						add: newItems,
						addIndex: 0,
					})
				}}
			>
				Add Row
			</Button>
			<Button
				className="headerButton action-button-color material-drop-shadow"
				onClick={() => {
					gridOptions.api?.forEachNode((x) => {
						console.log(x.data)
					})
				}}
			>
				Log data
			</Button>
			{selectedLeague && (
				<AgGridReact
					gridOptions={gridOptions}
					columnDefs={ManualStatsEntryColDef}
					rowData={[{}, {}, {}, {}, {}, {}]}
					frameworkComponents={{
						playerSelectCellRenderer: PlayerSelectCellRenderer,
						checkboxCellRenderer: CheckboxCellRenderer,
					}}
				/>
			)}
			{selectedLeague && (
				<div className="footerBox">
					<Button color="success" onClick={uploadManualStats}>
						Upload Stats
					</Button>
				</div>
			)}
			<Modal isOpen={showUploadingModal}>
				{isUploading && <ModalBody>Submitting...</ModalBody>}
				{!isUploading && <ModalBody>Successfully Submitted!</ModalBody>}
				<ModalFooter>
					<Button
						color="secondary"
						onClick={() => setShowUploadingModal(false)}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)

	function onLeagueChange(event: object, value: string | null, reason: string) {
		setSelectedLeague(value)
	}

	function uploadManualStats() {
		setShowUploadingModal(true)
		setIsUploading(true)
		let playerStatsToUpload: IndividualGamePlayerStats[] = []

		gridOptions.api?.forEachNode((node) => {
			let nodeData = node.data as ManualPlayerStatsEntry

			if (nodeData.Player) {
				let foundPlayer = playerTrackerIds?.find(
					(x) => x.Name === nodeData.Player
				)

				playerStatsToUpload.push({
					Name: nodeData.Player ?? "",
					RSCId: foundPlayer?.RSCId ?? "",
					OnlineId: "",
					ReplayId: "",
					ReplayTitle: "",
					Week: -1,
					Tier: selectedLeague!!,
					Team: "",
					OponentTeam: "",
					GamesWon: nodeData.Won ? 1 : 0,
					GamesLost: nodeData.Won ? 0 : 1,
					MVP: nodeData.MVP,
					Score: nodeData.Score,
					Goals: nodeData.Goals,
					Assists: nodeData.Assists,
					Saves: nodeData.Saves,
					Shots: nodeData.Shots,
					Cycle:
						nodeData.Goals!! > 0 &&
						nodeData.Assists!! > 0 &&
						nodeData.Shots!! > 0 &&
						nodeData.Saves!! > 0,
				})
			}
		})

		if (playerStatsToUpload && playerStatsToUpload.length > 0) {
			backendApi.instance
				.post<IndividualGamePlayerStats[]>(
					`PlayerStats/InsertWeeklyStats`,
					playerStatsToUpload
				)
				.then(function (response) {
					// handle success
					setIsUploading(false)
				})
				.catch(function (error) {
					// handle error
					console.log(error)
				})
				.then(function () {
					// always executed
				})
		} else {
			setIsUploading(false)
		}
	}
}

export default styled(ManualStatsEntryNew)`
	margin: 25px;
	margin-right: 100px;
	display: flex;
	flex-direction: column;
	width: 1400px;
	padding: 20px;
	background-color: #2a3045;
	border-radius: 5px;
	height: 650px;

	.headerButton {
		width: 300px;
		margin-top: 15px;
	}

	.footerBox {
		padding: 15px;
		flex: 0;
		height: 70px;
		display: flex;
		justify-content: flex-end;
	}
`
