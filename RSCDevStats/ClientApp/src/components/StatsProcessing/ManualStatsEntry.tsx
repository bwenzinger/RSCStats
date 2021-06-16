import React from "react"
import styled from "styled-components"
import { Autocomplete } from "@material-ui/lab"
import { Fab, TextField } from "@material-ui/core"
import { PlayerTrackerId } from "../../models/PlayerTrackerId"
import { atom, useRecoilState } from "recoil"
import { Add, Save } from "@material-ui/icons"
import { ManualPlayerStatsEntry } from "../../models/ManualPlayerStatsEntry"
import { v4 as uuidv4 } from "uuid"
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap"
import { IndividualGamePlayerStats } from "../../models/CumulativePlayerStats"
import produce from "immer"
import ManualStatsEntryList from "./ManualStatsEntryList"
import BallchasingApi from "../../BallchasingApi"

interface Props {
	className?: string
}

const ballChasingApi = new BallchasingApi()

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

const ManualStatsEntry = (props: Props) => {
	// const [entries, setEntries] = React.useState<ManualEntry[]>([
	// 	{ Player: "test", Score: 1, Goals: 2 },
	// 	{ Player: "test", Score: 1, Goals: 2 },
	// ])
	// const [playerStatIds, setPlayerStatIds] = React.useState<string[]>([])

	// const playerStats = React.useRef<ManualPlayerStatsEntry[]>([])
	const [entries, setEntries] = React.useState<ManualPlayerStatsEntry[]>([])
	const [selectedLeague, setSelectedLeague] =
		React.useState<string | null>(null)

	const [selectedPlayer, setSelectedPlayer] =
		React.useState<PlayerTrackerId | null>(null)

	const [showUploadingModal, setShowUploadingModal] =
		React.useState<boolean>(false)

	const [isUploading, setIsUploading] = React.useState<boolean>(false)

	const [playerTrackerIds] = useRecoilState(playerTrackerIdsState)

	return (
		<div className={props.className + " manual-stats-entry"}>
			{/* <div className="manual-stats-entry-content"> */}
			<Autocomplete
				className="manual-stats-entry-autocomplete"
				loading={playerTrackerIds === undefined}
				options={
					playerTrackerIds?.filter(
						(element, index, array) =>
							array.findIndex((x) => x.RSCId === element.RSCId) === index
					) ?? []
				}
				getOptionLabel={(option) => {
					return option.Name
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Select Player"
						// placeholder="Favorites"
					/>
				)}
				onChange={onPlayerChange}
			/>
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
			<ManualStatsEntryList
				entries={entries}
				onValueChange={onValueChange}
				onDeleteClick={onDeleteClick}
			/>
			{/* {entries.map((entry) => (
				<ManualStatsEntryItem
					playerStats={entry}
					onValueChange={(id: string, field: string, newValue: number) => {
						// playerStats.current[id][field] = newValue
						// const playerStat = playerStats.current.find((x) => x.id === id)
						// if (playerStat) {
						// 	playerStat[field] = newValue
						// }
						const updatedEntries = produce(entries, (draftState) => {
							let entry = draftState.find((x) => x.id === id)
							if (entry) {
								entry[field] = newValue
							}
						})
						setEntries(updatedEntries)
					}}
					onDeleteClick={(id: string) => {
						setEntries(entries.filter((x) => x.id !== id))
						// setPlayerStatIds([...playerStatIds.filter((x) => x !== id)])
						// playerStats.current = playerStats.current.filter((x) => x.id !== id)
					}}
				/>
			))} */}
			{/* </div> */}
			{selectedPlayer && selectedLeague && (
				<div className="manual-stats-entry-floating-actionbutton">
					<Fab
						className="manual-stats-entry-fab"
						color="primary"
						aria-label="add"
						onClick={() => {
							setEntries([...entries, { id: uuidv4() }])
							// playerStats.current.push({
							// 	id: id,
							// })
							// setPlayerStatIds([...playerStatIds, id])
						}}
					>
						<Add />
					</Fab>
					<Fab
						className="manual-stats-entry-fab"
						color="primary"
						aria-label="add"
						onClick={() => {
							uploadManualStats()
						}}
					>
						<Save />
					</Fab>
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

	function onPlayerChange(
		event: object,
		value: PlayerTrackerId | null,
		reason: string
	) {
		setSelectedPlayer(value)
		// if (value === null) {
		// 	setEntries([])
		// } else {
		// 	setEntries([
		// 		{ id: uuidv4() },
		// 		{ id: uuidv4() },
		// 		{ id: uuidv4() },
		// 		{ id: uuidv4() },
		// 	])
		// }
	}

	function onLeagueChange(event: object, value: string | null, reason: string) {
		setSelectedLeague(value)
	}

	function onValueChange(id: string, field: string, newValue: number) {
		// const updatedEntries = produce(entries, (draftState) => {
		// 	let entry = draftState.find((x) => x.id === id)
		// 	if (entry) {
		// 		entry[field] = newValue
		// 	}
		// })
		// setEntries(updatedEntries)
		let entry = entries.find((x) => x.id === id)
		if (entry) {
			entry[field] = newValue //yes this isn't using setState, but its intentional for performance reasons
		}
	}

	function onDeleteClick(id: string) {
		setEntries(entries.filter((x) => x.id !== id))
		// setPlayerStatIds([...playerStatIds.filter((x) => x !== id)])
		// playerStats.current = playerStats.current.filter((x) => x.id !== id)
	}

	function uploadManualStats() {
		setShowUploadingModal(true)
		setIsUploading(true)
		let playerStatsToUpload: IndividualGamePlayerStats[] = []

		entries.forEach((entry) => {
			playerStatsToUpload.push({
				Name: entry.Player!!,
				RSCId: selectedPlayer!!.RSCId,
				OnlineId: "",
				ReplayId: "",
				ReplayTitle: "",
				Week: -1,
				Tier: selectedLeague!!,
				Team: "",
				OponentTeam: "",
				Score: entry.Score,
				Goals: entry.Goals,
				Assists: entry.Assists,
				Saves: entry.Saves,
				Shots: entry.Shots,
				Cycle:
					entry.Goals!! > 0 &&
					entry.Assists!! > 0 &&
					entry.Shots!! > 0 &&
					entry.Saves!! > 0,
			})
		})

		ballChasingApi.instance
			.post<IndividualGamePlayerStats[]>(
				`InsertWeeklyStats`,
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
	}
}

export default styled(ManualStatsEntry)`
	margin: 25px;
	margin-right: 100px;
	height: calc(100% - 50px);
	display: flex;
	flex-direction: column;
	/* width: 100%; */
	overflow-y: auto;
	/* background-color: orange; */
	min-width: 300px;
	padding-top: 10px;

	/* .manual-stats-entry-content {
		height: calc(100% - 50px);
		width: 100%;
		display: flex;
		flex-direction: column;
	} */

	.manual-stats-entry-floating-actionbutton {
		/* height: calc(100% - 50px);
		width: 100%; */
		position: fixed;
		bottom: 0;
		right: 0;
		width: 200px;
		height: 100px;
	}

	.manual-stats-entry-autocomplete {
		margin-bottom: 20px;
		background-color: #2a3045;
		border-radius: 10px;
	}

	.manual-stats-entry-fab {
		height: 60px;
		width: 60px;
		margin-right: 10px;
	}
`
