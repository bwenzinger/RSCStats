import React, { useEffect } from "react"
import styled from "styled-components"
import BackendApi from "../../BackendApi"
import BackendApiRateLimited from "../../BackendApiRateLimited"
import {
	BallChasingGroup,
	BallChasingGroupStats,
	TeamsEntity,
} from "../../models/BallChasingApiModels"
import {
	CumulativePlayerStats,
	IndividualGamePlayerStats,
} from "../../models/CumulativePlayerStats"
import { ReplayPlayerStats, ReplayStatsRoot } from "../../models/ReplayStats"
import {
	BallChasingReplay,
	BallChasingReplayPlayersEntity,
} from "../../models/BallChasingReplay"
import { AgGridReact } from "ag-grid-react"
// import WeeklyCumulativeStatsTableColDefs from "../models/WeeklyCumulativeStatsTableColDefs"
import { GridOptions } from "ag-grid-community"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import WeeklyCumulativeStatsTableColDefs from "../../models/ColDefs/WeeklyCumulativeStatsTableColDefs"
import WeeklyPerGameStatsTableColDefs from "../../models/ColDefs/WeeklyPerGameStatsTableColDefs"
import { useRecoilState } from "recoil"
import { MatchResult } from "../../models/MatchResult"
import MatchResultsTableColDefs from "../../models/ColDefs/MatchResultsTableColDefs"
import {
	LeagueTeamsState,
	PlayerDetailsState,
} from "../../recoil/RscImportAtom"
import { PlayerDetails } from "../../models/PlayerDetails"
// import { Schedule } from "./models/Scheduling"

interface PassedProps {
	className?: string
	isDragAccept?: boolean
	isDragReject?: boolean
	isDragActive?: boolean
}

// const playerTrackerIdsState = atom<PlayerTrackerId[] | undefined>({
// 	key: "playerTrackerIds", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

// const playerContractsState = atom<PlayerContract[] | undefined>({
// 	key: "playerContracts", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

// const leagueTeamsState = atom<LeagueTeam[] | undefined>({
// 	key: "leagueTeams", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

// const rawStatsGoogleSheet = "1y4abHsJrmkdQAGGNW7ZAVpnrL3lZVN5Eh4bnsxWfHlo"

const backendApi = new BackendApi()
const backendApiRateLimited = new BackendApiRateLimited()

const StatsCongregate = (props: PassedProps) => {
	// const [schedule, setSchedule] = React.useState<Schedule[]>()

	// const [playerTrackerIds, setPlayerTrackerIds] =
	// 	React.useState<PlayerTrackerId[]>()

	const [playerDetails] = useRecoilState<PlayerDetails[] | undefined>(
		PlayerDetailsState
	)

	// const [playerContracts, setPlayerContracts] =
	// 	useRecoilState(PlayerContractsState)

	const [leagueTeams] = useRecoilState(LeagueTeamsState)

	const [ballChasingSeasonGroups, setBallChasingSeasonGroups] =
		React.useState<BallChasingGroup[]>()
	const [selectedSeasonGroup, setSelectedSeasonGroup] =
		React.useState<BallChasingGroup>()
	const [ballChasingLeagueGroups, setBallChasingLeagueGroups] =
		React.useState<BallChasingGroup[]>()
	const [selectedLeagueGroup, setSelectedLeagueGroup] =
		React.useState<BallChasingGroup>()
	const [ballChasingDayGroups, setBallChasingDayGroups] =
		React.useState<BallChasingGroup[]>()
	const [ballChasingGroupedDayGroups, setBallChasingGroupedDayGroups] =
		React.useState<BallChasingGroup[]>()
	const [selectedDayGroup, setSelectedDayGroup] =
		React.useState<BallChasingGroup>()
	const [ballChasingTeamGroups, setBallChasingTeamGroups] =
		React.useState<BallChasingGroup[]>()
	const [showCumulativeStats, setShowCumulativeStats] =
		React.useState<boolean>(false)

	const [showSelectDayGroups, setShowSelectDayGroups] =
		React.useState<boolean>(false)

	const [isUploading, setIsUploading] = React.useState<boolean>(false)
	const [showUploadingModal, setShowUploadingModal] =
		React.useState<boolean>(false)

	const [showMatchResults, setShowMatchResults] = React.useState<boolean>(false)

	const [matchResults, setMatchResults] = React.useState<MatchResult[]>([])

	const [gridOptions] = React.useState<GridOptions>({
		rowSelection: "multiple",
		defaultColDef: {
			resizable: true,
			sortable: true,
			filter: true,
		},
	})

	const [matchResultsGridOptions] = React.useState<GridOptions>({
		rowSelection: "multiple",
		defaultColDef: {
			resizable: true,
			sortable: true,
			filter: true,
		},
	})

	const [cumulativePlayerStats, setCumulativePlayerStats] = React.useState<
		CumulativePlayerStats[]
	>([])

	const [perGamePlayerStats, setPerGamePlayerStats] = React.useState<
		IndividualGamePlayerStats[]
	>([])

	const [outStandingRequests, setOutStandingRequests] =
		React.useState<number>(0)
	const [processedRequests, setProcessedRequests] = React.useState<number>(0)

	const processedRequestsRef = React.useRef<number>(0)
	const outStandingRequestsRef = React.useRef<number>(0)

	useEffect(() => {
		backendApi.instance
			.get<BallChasingGroup[]>(
				`BallChasingApi/GetGroupsByCreator/76561199096013422`
			) //this is the RSC steam
			.then(function (response) {
				// handle success
				const groupId = response.data.find((x) => x.name === "RSC")?.id

				backendApi.instance
					.get<BallChasingGroup[]>(
						`BallChasingApi/GetGroupsByParentGroup/${groupId}`
					)
					.then(function (response) {
						// handle success
						setBallChasingSeasonGroups(response.data)
					})
					.catch(function (error) {
						// handle error
						console.log(error)
					})
					.then(function () {
						// always executed
					})
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}, [])

	React.useEffect(() => {
		if (showCumulativeStats) {
			gridOptions.api?.setRowData(cumulativePlayerStats)
			gridOptions.api?.setColumnDefs(WeeklyCumulativeStatsTableColDefs)
		} else {
			gridOptions.api?.setRowData(perGamePlayerStats)
			gridOptions.api?.setColumnDefs(WeeklyPerGameStatsTableColDefs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showCumulativeStats])

	return (
		<div className={props.className + " Stats-Congregate"}>
			<div className="headerBox">
				{/* <button className="headerButton" onClick={onTestClick}>
					test stats upload
				</button> */}
				{selectedSeasonGroup && <div>Selected: {selectedSeasonGroup.name}</div>}
				{playerDetails && playerDetails.length > 0 && !selectedSeasonGroup && (
					<div>Please select a season</div>
				)}
				{!selectedSeasonGroup && ballChasingSeasonGroups && (
					<div>
						{ballChasingSeasonGroups.map((element) => (
							<Button
								className="ballchasing-group-button action-button-color material-drop-shadow"
								onClick={() => onSeasonGroupClick(element)}
								key={"ballchasing-group-" + element.name}
							>
								{element.name}
							</Button>
						))}
					</div>
				)}
				{selectedLeagueGroup && <div>Selected: {selectedLeagueGroup.name}</div>}
				{!selectedLeagueGroup &&
					selectedSeasonGroup &&
					ballChasingLeagueGroups && <div>Please select a league</div>}
				{!selectedLeagueGroup &&
					selectedSeasonGroup &&
					ballChasingLeagueGroups && (
						<div>
							{ballChasingLeagueGroups.map((element) => (
								<Button
									className="ballchasing-group-button action-button-color material-drop-shadow"
									onClick={() => onLeagueGroupClick(element)}
									key={"ballchasing-group-" + element.name}
								>
									{element.name}
								</Button>
							))}
						</div>
					)}
				{showSelectDayGroups &&
					ballChasingGroupedDayGroups &&
					!ballChasingDayGroups &&
					ballChasingGroupedDayGroups.map((element) => (
						<Button
							className="ballchasing-group-button action-button-color material-drop-shadow"
							onClick={() => onGroupedDayGroupClick(element)}
							key={"ballchasing-group-" + element.name}
						>
							{element.name}
						</Button>
					))}
				{selectedDayGroup && <div>Selected: {selectedDayGroup.name}</div>}
				{!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
					<div>Please select a day</div>
				)}
				{!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
					<div>
						{ballChasingDayGroups.map((element) => (
							<Button
								className="ballchasing-group-button action-button-color material-drop-shadow"
								onClick={() => onDayGroupClick(element)}
								key={"ballchasing-group-" + element.name}
							>
								{element.name}
							</Button>
						))}
					</div>
				)}
				{ballChasingTeamGroups &&
					ballChasingTeamGroups.length > 0 && [
						<Button
							className="headerButton action-button-color material-drop-shadow"
							onClick={exportToExcel}
						>
							Export to excel
						</Button>,
						showCumulativeStats && (
							<Button
								className="toggleStatsViewButton action-button-color material-drop-shadow"
								onClick={() => setShowCumulativeStats(false)}
							>
								Show Per Game Stats
							</Button>
						),
						!showCumulativeStats && (
							<Button
								className="toggleStatsViewButton action-button-color material-drop-shadow"
								onClick={() => setShowCumulativeStats(true)}
							>
								Show Cumulative Stats
							</Button>
						),
					]}
				<div className="requests-container">
					<div className="requests-container-item">
						outstanding ballchasing requests: {outStandingRequests}
					</div>
					<div className="requests-container-item">
						completed ballchasing requests: {processedRequests}
					</div>
				</div>
			</div>

			{ballChasingTeamGroups &&
				ballChasingTeamGroups.length > 0 && [
					<div
						className={"ag-theme-material stats-grid"}
						// style={{ height: "1000px", width: "100%" }}
					>
						{showMatchResults && (
							<AgGridReact
								gridOptions={matchResultsGridOptions}
								columnDefs={MatchResultsTableColDefs}
								// onGridReady={(params) => {
								// 	params.api?.sizeColumnsToFit()
								// }}
								// rowData={matchResults}
							/>
						)}
						{!showMatchResults && !showCumulativeStats && (
							<AgGridReact
								gridOptions={gridOptions}
								columnDefs={WeeklyPerGameStatsTableColDefs}
								// onGridReady={(params) => {
								// 	params.api?.sizeColumnsToFit()
								// }}
								// rowData={props.playerStats}
							/>
						)}
						{!showMatchResults && showCumulativeStats && (
							<AgGridReact
								gridOptions={gridOptions}
								columnDefs={WeeklyCumulativeStatsTableColDefs}
								// onGridReady={(params) => {
								// 	params.api?.sizeColumnsToFit()
								// }}
								// rowData={props.playerStats}
							/>
						)}
					</div>,
					<div className="footerBox">
						{showMatchResults && (
							<Button
								className="skip-button material-drop-shadow"
								color="secondary"
								onClick={() => setShowMatchResults(false)}
							>
								Skip
							</Button>
						)}
						{showMatchResults && (
							<Button
								className="material-drop-shadow"
								color="success"
								onClick={uploadMatchResults}
							>
								Upload Selected Match Results
							</Button>
						)}
						{!showMatchResults && (
							<Button
								className="material-drop-shadow"
								color="success"
								onClick={uploadSelectedStats}
							>
								Upload Selected Stats
							</Button>
						)}
					</div>,
				]}
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

			{/* <StatsTable playerStats={playerStats} /> */}
		</div>
	)

	function uploadMatchResults() {
		setShowUploadingModal(true)
		setIsUploading(true)
		let matchesToUpload: IndividualGamePlayerStats[] = []
		matchResultsGridOptions.api?.getSelectedNodes().forEach((node) => {
			matchesToUpload.push(node.data)
		})

		backendApi.instance
			.post<MatchResult[]>(`MatchResults/InsertMatchResults`, matchesToUpload)
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

	function uploadSelectedStats() {
		setShowUploadingModal(true)
		setIsUploading(true)
		let playerStatsToUpload: IndividualGamePlayerStats[] = []
		if (showCumulativeStats) {
			gridOptions.api?.getSelectedNodes().forEach((node) => {
				let playerRSCId = (node.data as CumulativePlayerStats).RSCId

				let tempPerGameStats = perGamePlayerStats.filter(
					(x) => x.RSCId === playerRSCId
				)
				if (tempPerGameStats) {
					playerStatsToUpload.push(...tempPerGameStats)
				}
			})
		} else {
			gridOptions.api?.getSelectedNodes().forEach((node) => {
				playerStatsToUpload.push(node.data as IndividualGamePlayerStats)
			})
		}

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
	}

	function exportToExcel() {
		const fieldsToExport = gridOptions?.columnApi
			?.getAllColumns()
			?.filter((x) => x.getColDef().checkboxSelection !== true)
			.map((x) => x.getColDef().field ?? "") // exclude the checkbox column

		gridOptions?.api?.exportDataAsCsv({ columnKeys: fieldsToExport })
		// gridOptions?.api?.exportDataAsCsv({
		// 	columnKeys: [
		// 		"Name",
		// 		"RSCId",
		// 		"OnlineId",
		// 		"ReplayId",
		// 		"Replay Title",
		// 		"Tier",
		// 		"Team",
		// 		"Oponent Team",
		// 		"Wins",
		// 		"Losses",
		// 		"Score",
		// 		"Goals",
		// 		"Assists",
		// 		"Saves",
		// 		"Shots",
		// 		"MVP",
		// 		"Cycle",
		// 		"Hat Tricks",
		// 		"Playmakers",
		// 		"Saviors",
		// 		"GoalsAgainst",
		// 		"ShotsAgainst",
		// 		"bpm",
		// 	],
		// })
	}

	function onSeasonGroupClick(group: BallChasingGroup) {
		setSelectedSeasonGroup(group)

		backendApi.instance
			.get<BallChasingGroup[]>(
				`BallChasingApi/GetGroupsByParentGroup/${group.id}`
			)
			.then(function (response) {
				// handle success
				setBallChasingLeagueGroups(response.data)
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}

	function onLeagueGroupClick(group: BallChasingGroup) {
		if (group.name.match(/^\d/)) {
			setSelectedLeagueGroup({
				...group,
				name: group.name.substring(1, group.name.length),
			})
		} else {
			setSelectedLeagueGroup(group)
		}
		backendApi.instance
			.get<BallChasingGroup[]>(
				`BallChasingApi/GetGroupsByParentGroup/${group.id}`
			)
			.then(function (response) {
				// handle success
				if (response.data.length === 1) {
					backendApi.instance
						.get<BallChasingGroup[]>(
							`BallChasingApi/GetGroupsByParentGroup/${response.data[0].id}`
						)
						.then(function (response) {
							// handle success
							setBallChasingDayGroups(response.data)
						})
						.catch(function (error) {
							// handle error
							console.log(error)
						})
						.then(function () {
							// always executed
						})
				} else if (response.data.length === 2) {
					setShowSelectDayGroups(true)
					setBallChasingGroupedDayGroups(response.data)
				} else {
					setBallChasingDayGroups(response.data)
				}
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}

	function onGroupedDayGroupClick(group: BallChasingGroup) {
		// setSelectedGroupedDayGroup(group)
		backendApi.instance
			.get<BallChasingGroup[]>(
				`BallChasingApi/GetGroupsByParentGroup/${group.id}`
			)
			.then(function (response) {
				// handle success
				setBallChasingDayGroups(response.data)
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}

	function onDayGroupClick(group: BallChasingGroup) {
		setSelectedDayGroup(group)

		const groupInt = parseInt(group?.name.match(/\d+/g)?.toString() ?? "") ?? -1
		backendApi.instance
			.get<BallChasingGroup[]>(
				`BallChasingApi/GetGroupsByParentGroup/${group.id}`
			)
			.then(function (response) {
				// handle success
				setBallChasingTeamGroups(response.data)

				let tempPlayerStats: CumulativePlayerStats[] = []
				let tempPlayerStatsByGame: IndividualGamePlayerStats[] = []

				let tempMatchResults: MatchResult[] = []

				// let timeout = 0
				// let numberResponsesProcessed = 0
				response.data.forEach((item) => {
					// timeout += 1000
					// setTimeout(function () {
					backendApiRateLimited.instance
						.get<BallChasingGroupStats>(
							`BallChasingApi/GetGroupById/${item.id}`
						)
						.then(function (getDayGroupByIdResponse) {
							const teams = getDayGroupByIdResponse.data.teams
							if (teams) {
								const team1: TeamsEntity = teams[0]
								const team2: TeamsEntity = teams[1]
								if (team1 && team2 && team1.players && team2.players) {
									const mappedTeam1Players = team1.players.map((x) => x.id)
									// const team1Players = playerDetails?.filter(
									// 	//TODO MIGHT NEED TO FIX THIS
									// 	(x) =>
									// 		mappedTeam1Players.some(
									// 			(y) =>
									// 				// y.includes(
									// 				x.PlayerTrackerLinks.map((z) => z.PlatformId) ?? []
									// 			// )
									// 		) && x.Team
									// )
									const team1Players = playerDetails?.filter(
										//TODO MIGHT NEED TO FIX THIS
										(x) =>
											x.PlayerTrackerLinks.some((y) =>
												mappedTeam1Players.includes(y.PlatformId)
											) && x.Team
									)
									const mappedTeam2Players = team2.players.map((x) => x.id)
									// const team2Players = playerContracts?.filter(
									// 	(x) => mappedTeam2Players.includes(x.OnlineId) && x.Team
									// )
									const team2Players = playerDetails?.filter(
										//TODO MIGHT NEED TO FIX THIS
										(x) =>
											x.PlayerTrackerLinks.some((y) =>
												mappedTeam2Players.includes(y.PlatformId)
											) && x.Team
									)
									if (team1Players && team2Players) {
										const team1LeagueTeam = leagueTeams!.find(
											(x) => x.TeamName === team1Players[0].Team
										)
										const team2LeagueTeam = leagueTeams!.find(
											(x) => x.TeamName === team2Players[0].Team
										)

										tempMatchResults.push({
											Tier: selectedLeagueGroup!.name,
											Week: groupInt,
											HomeTeam: team1LeagueTeam!.TeamName,
											AwayTeam: team2LeagueTeam!.TeamName,
											HomeTeamWins: team1.cumulative.wins,
											AwayTeamWins: team2.cumulative.wins,
										})
										setMatchResults(tempMatchResults)
										matchResultsGridOptions.api?.setRowData(tempMatchResults)
									}
								}
							}

							backendApiRateLimited.instance
								.get<ReplayStatsRoot>(
									`BallChasingApi/GetReplaysByGroup/${item.id}`
								)
								.then(function (getReplaysForDayGroupResponse) {
									const detailedReplays: BallChasingReplay[] = []

									getReplaysForDayGroupResponse.data.list?.forEach((replay) => {
										outStandingRequestsRef.current++
										setOutStandingRequests(outStandingRequestsRef.current)
										backendApiRateLimited.instance
											.get<BallChasingReplay>(
												`BallChasingApi/GetReplayById/${replay.id}`
											)
											.then(function (getSingleReplayResponse) {
												processedRequestsRef.current++
												setProcessedRequests(processedRequestsRef.current)

												detailedReplays.push(getSingleReplayResponse.data)
												if (
													detailedReplays.length ===
													getReplaysForDayGroupResponse.data.list?.length
												) {
													getDayGroupByIdResponse.data.players?.forEach(
														(groupPlayerBeingProcessed) => {
															// let foundPlayer = playerTrackerIds?.find(
															// 	(x) =>
															// 		x.PlatformId?.toUpperCase() ===
															// 		groupPlayerBeingProcessed.id?.toUpperCase()
															// )
															let foundPlayer = playerDetails?.find(
																(x) =>
																	x.PlayerTrackerLinks.some(
																		(y) =>
																			y.PlatformId.toUpperCase() ===
																			groupPlayerBeingProcessed.id?.toUpperCase()
																	)
																// x.PlatformId?.toUpperCase() ===
																// groupPlayerBeingProcessed.id?.toUpperCase()
															)
															if (
																!foundPlayer &&
																groupPlayerBeingProcessed.platform === "Epic"
															) {
																// foundPlayer = playerTrackerIds?.find(
																// 	(x) =>
																// 		x.PlatformId?.toUpperCase() ===
																// 		groupPlayerBeingProcessed.name?.toUpperCase()
																// )
																foundPlayer = playerDetails?.find((x) =>
																	x.PlayerTrackerLinks.some(
																		(y) =>
																			y.PlatformId.toUpperCase() ===
																			groupPlayerBeingProcessed.name?.toUpperCase()
																	)
																)
															}
															let playerStatsFromReplays: ReplayPlayerStats[] =
																[]

															let playerTeamIsBlue = false
															const playerReplays =
																getReplaysForDayGroupResponse.data.list?.filter(
																	(x) =>
																		x.blue.players?.some(
																			(y) =>
																				y.id.id.toUpperCase() ===
																				groupPlayerBeingProcessed.id.toUpperCase()
																		)
																)
															if (playerReplays && playerReplays.length > 0) {
																playerTeamIsBlue = true
															}

															let playerIndividualReplayStats: BallChasingReplayPlayersEntity[] =
																[]

															detailedReplays.forEach((replay) => {
																let tempPlayerStats = replay[
																	playerTeamIsBlue ? "blue" : "orange"
																]?.players?.find(
																	(x) =>
																		x.id.id.toUpperCase() ===
																		groupPlayerBeingProcessed.id.toUpperCase()
																)

																if (tempPlayerStats) {
																	playerIndividualReplayStats.push(
																		tempPlayerStats
																	)

																	if (foundPlayer) {
																		const groupReplayData =
																			getReplaysForDayGroupResponse.data.list?.find(
																				(x) => x.id === replay.id
																			)!!

																		let pointsAgainst = 0
																		playerTeamIsBlue
																			? groupReplayData.orange.players?.forEach(
																					(tempPlayer) =>
																						(pointsAgainst += tempPlayer.score)
																			  )
																			: groupReplayData.blue.players?.forEach(
																					(tempPlayer) =>
																						(pointsAgainst += tempPlayer.score)
																			  )

																		let playerWonGame = false

																		playerWonGame = playerTeamIsBlue
																			? groupReplayData?.blue.goals >
																			  groupReplayData?.orange.goals
																				? true
																				: false
																			: groupReplayData?.orange.goals >
																			  groupReplayData?.blue.goals
																			? true
																			: false

																		let assistsAgainst = playerTeamIsBlue
																			? replay.orange?.stats.core.assists
																			: replay.blue?.stats.core.assists

																		let savesAgainst = playerTeamIsBlue
																			? replay.orange?.stats.core.saves
																			: replay.blue?.stats.core.saves
																		// playerTeamIsBlue
																		// 	? groupReplayData.orange.players?.forEach(tempPlayer => assistsAgainst += tempPlayer.)

																		tempPlayerStatsByGame.push({
																			Dummy1: "",
																			Dummy2: "",
																			Map: replay.map_name,
																			Date: "",
																			CarId: tempPlayerStats.car_id,
																			CarName: tempPlayerStats.car_name,
																			Name: groupPlayerBeingProcessed.name,
																			RSCId: foundPlayer?.RSCId,
																			OnlineId: groupPlayerBeingProcessed.id,
																			ReplayId: replay.id!!,
																			ReplayTitle: replay.title ?? "",
																			GameNumber: groupInt,
																			Tier: selectedLeagueGroup?.name ?? "",
																			Team: groupPlayerBeingProcessed.team, //TODO THIS SHOULD COME FROM RSC SOMEWHERE
																			OponentTeam:
																				getReplaysForDayGroupResponse.data
																					.list!![0][
																					playerTeamIsBlue ? "orange" : "blue"
																				].name, //TODO THIS SHOULD COME FROM RSC SOMEWHERE
																			GamesWon: playerWonGame ? 1 : 0,
																			GamesLost: playerWonGame ? 0 : 1,
																			Score: tempPlayerStats.stats.core.score,
																			Goals: tempPlayerStats.stats.core.goals,
																			Assists:
																				tempPlayerStats.stats.core.assists,
																			Saves: tempPlayerStats.stats.core.saves,
																			Shots: tempPlayerStats.stats.core.shots,
																			ShootingPercent:
																				tempPlayerStats.stats.core
																					.shooting_percentage,
																			MVP:
																				playerWonGame &&
																				tempPlayerStats.stats.core.mvp,
																			Cycle: Math.min(
																				tempPlayerStats.stats.core.goals,
																				tempPlayerStats.stats.core.assists,
																				tempPlayerStats.stats.core.saves,
																				tempPlayerStats.stats.core.shots
																			),
																			// tempPlayerStats.stats.core.goals > 0 &&
																			// tempPlayerStats.stats.core.assists >
																			// 	0 &&
																			// tempPlayerStats.stats.core.saves > 0 &&
																			// tempPlayerStats.stats.core.shots > 0,
																			HatTrick: Math.floor(
																				tempPlayerStats.stats.core.goals / 3
																			),
																			Playmaker: Math.floor(
																				tempPlayerStats.stats.core.assists / 3
																			),
																			Savior: Math.floor(
																				tempPlayerStats.stats.core.saves / 3
																			),
																			PointsAgainst: pointsAgainst,
																			GoalsAgainst:
																				tempPlayerStats.stats.core
																					.goals_against,
																			AssistAgainst: assistsAgainst,
																			SavesAgainst: savesAgainst,
																			ShotsAgainst:
																				tempPlayerStats.stats.core
																					.shots_against,
																			Bpm: tempPlayerStats.stats.boost.bpm,
																			AvgBoostAmount:
																				tempPlayerStats.stats.boost.avg_amount,
																			BoostCollected:
																				tempPlayerStats.stats.boost
																					.amount_collected,
																			BoostCollectedBigPads:
																				tempPlayerStats.stats.boost
																					.amount_collected_big,
																			BoostCollectedSmallPads:
																				tempPlayerStats.stats.boost
																					.amount_collected_small,
																			CountCollectedBigPads:
																				tempPlayerStats.stats.boost
																					.count_collected_big,
																			CountCollectedSmallPads:
																				tempPlayerStats.stats.boost
																					.count_collected_small,
																			BoostStolen:
																				tempPlayerStats.stats.boost
																					.amount_stolen,
																			BoostStolenBigPads:
																				tempPlayerStats.stats.boost
																					.amount_stolen_big,
																			BoostStolenSmallPads:
																				tempPlayerStats.stats.boost
																					.amount_stolen_small,
																			CountStolenBigPads:
																				tempPlayerStats.stats.boost
																					.count_stolen_big,
																			CountStolenSmallpads:
																				tempPlayerStats.stats.boost
																					.count_stolen_small,
																			ZeroBoostTime:
																				tempPlayerStats.stats.boost
																					.time_zero_boost,
																			HundredBoostTime:
																				tempPlayerStats.stats.boost
																					.time_full_boost,
																			BoostUsedWhileSupersonic:
																				tempPlayerStats.stats.boost
																					.amount_used_while_supersonic,
																			BoostOverfillTotal:
																				tempPlayerStats.stats.boost
																					.amount_overfill,
																			BoostOverfillStolen:
																				tempPlayerStats.stats.boost
																					.amount_overfill_stolen,
																			AverageSpeed:
																				tempPlayerStats.stats.movement
																					.avg_speed,
																			TotalDistance:
																				tempPlayerStats.stats.movement
																					.total_distance,
																			TimeSlowSpeed:
																				tempPlayerStats.stats.movement
																					.time_slow_speed,
																			PercentSlowSpeed:
																				tempPlayerStats.stats.movement
																					.percent_slow_speed,
																			TimeBoostSpeed:
																				tempPlayerStats.stats.movement
																					.time_boost_speed,
																			PercentBoostSpeed:
																				tempPlayerStats.stats.movement
																					.percent_boost_speed,
																			TimeSupersonic:
																				tempPlayerStats.stats.movement
																					.time_supersonic_speed,
																			PercentSupersonic:
																				tempPlayerStats.stats.movement
																					.percent_supersonic_speed,
																			TimeOnGround:
																				tempPlayerStats.stats.movement
																					.time_ground,
																			PercentOnGround:
																				tempPlayerStats.stats.movement
																					.percent_ground,
																			TimeLowAir:
																				tempPlayerStats.stats.movement
																					.time_low_air,
																			PercentLowAir:
																				tempPlayerStats.stats.movement
																					.percent_low_air,
																			TimeHighAir:
																				tempPlayerStats.stats.movement
																					.time_high_air,
																			PercentHighAir:
																				tempPlayerStats.stats.movement
																					.percent_high_air,
																			TimePowerslide:
																				tempPlayerStats.stats.movement
																					.time_powerslide,
																			AveragePowerslideTime:
																				tempPlayerStats.stats.movement
																					.avg_powerslide_duration,
																			CountPowerslide:
																				tempPlayerStats.stats.movement
																					.count_powerslide,
																			TimeMostBack:
																				tempPlayerStats.stats.positioning
																					.time_most_back,
																			PercentMostBack:
																				tempPlayerStats.stats.positioning
																					.percent_most_back,
																			TimeMostForward:
																				tempPlayerStats.stats.positioning
																					.time_most_forward,
																			PercentMostForward:
																				tempPlayerStats.stats.positioning
																					.percent_most_forward,
																			TimeInFrontOfBall:
																				tempPlayerStats.stats.positioning
																					.time_infront_ball,
																			PercentInFrontOfBall:
																				tempPlayerStats.stats.positioning
																					.percent_infront_ball,
																			TimeBehindBall:
																				tempPlayerStats.stats.positioning
																					.time_behind_ball,
																			PercentBehindBall:
																				tempPlayerStats.stats.positioning
																					.percent_behind_ball,
																			TimeDefensiveHalf:
																				tempPlayerStats.stats.positioning
																					.time_defensive_half,
																			PercentDefensiveHalf:
																				tempPlayerStats.stats.positioning
																					.percent_defensive_half,
																			TimeOffensiveHalf:
																				tempPlayerStats.stats.positioning
																					.time_offensive_half,
																			PercentOffensiveHalf:
																				tempPlayerStats.stats.positioning
																					.percent_offensive_half,
																			TimeDefensiveThird:
																				tempPlayerStats.stats.positioning
																					.time_defensive_third,
																			PercentageDefensiveThird:
																				tempPlayerStats.stats.positioning
																					.percent_defensive_third,
																			TimeNeutralThird:
																				tempPlayerStats.stats.positioning
																					.time_neutral_third,
																			PercentNeutralThird:
																				tempPlayerStats.stats.positioning
																					.percent_neutral_third,
																			TimeOffensiveThird:
																				tempPlayerStats.stats.positioning
																					.time_offensive_third,
																			PercentOffensiveThird:
																				tempPlayerStats.stats.positioning
																					.percent_offensive_third,
																			AverageDistanceToBall:
																				tempPlayerStats.stats.positioning
																					.avg_distance_to_ball,
																			AverageDistanceToBallHasPossession:
																				tempPlayerStats.stats.positioning
																					.avg_distance_to_ball_possession,
																			AverageDistanceToBallNoPossession:
																				tempPlayerStats.stats.positioning
																					.avg_distance_to_ball_no_possession,
																			DemosInflicted:
																				tempPlayerStats.stats.demo.inflicted,
																			DemosTaken:
																				tempPlayerStats.stats.demo.taken,
																			GoalsAgainstLastDefender:
																				tempPlayerStats.stats.positioning
																					.goals_against_while_last_defender ??
																				0,
																			LossMVP:
																				!playerWonGame &&
																				tempPlayerStats.stats.core.mvp,
																		})
																	}
																}
															})

															if (foundPlayer) {
																if (
																	tempPlayerStats.some(
																		(x) => x.RSCId === foundPlayer!!.RSCId
																	)
																) {
																	const playerStat = tempPlayerStats.find(
																		(x) => x.RSCId === foundPlayer!!.RSCId
																	)
																	if (playerStat) {
																		// const test =
																		// 	groupPlayerBeingProcessed.cumulative.games
																		playerStat.GamesPlayed! +=
																			groupPlayerBeingProcessed.cumulative.games
																	}
																	playerStat!!.GamesPlayed! +=
																		groupPlayerBeingProcessed.cumulative.games
																	playerStat!!.GamesWon! +=
																		groupPlayerBeingProcessed.cumulative.wins
																	playerStat!!.GamesLost! +=
																		groupPlayerBeingProcessed.cumulative.games -
																		groupPlayerBeingProcessed.cumulative.wins
																	playerStat!!.Score! +=
																		groupPlayerBeingProcessed.cumulative.core.score
																	playerStat!!.Goals! +=
																		groupPlayerBeingProcessed.cumulative.core.goals
																	playerStat!!.Assists! +=
																		groupPlayerBeingProcessed.cumulative.core.assists
																	playerStat!!.Saves! +=
																		groupPlayerBeingProcessed.cumulative.core.saves
																	playerStat!!.Shots! +=
																		groupPlayerBeingProcessed.cumulative.core.shots
																	playerStat!!.MVPs! =
																		tempPlayerStatsByGame.filter(
																			(x) =>
																				x.RSCId === foundPlayer!.RSCId &&
																				x.MVP === true
																		)?.length
																	playerStat!!.Cycle! +=
																		playerIndividualReplayStats.filter(
																			(x) =>
																				x.stats.core.goals > 0 &&
																				x.stats.core.assists > 0 &&
																				x.stats.core.saves > 0 &&
																				x.stats.core.shots > 0
																		).length
																	playerStat!!.HatTrick! +=
																		playerIndividualReplayStats.filter(
																			(x) => x.stats.core.goals > 2
																		).length
																	playerStat!!.Playmaker! +=
																		playerIndividualReplayStats.filter(
																			(x) => x.stats.core.assists > 2
																		).length
																	playerStat!!.Savior! +=
																		playerIndividualReplayStats.filter(
																			(x) => x.stats.core.saves > 2
																		).length
																	playerStat!!.GoalsAgainst! +=
																		groupPlayerBeingProcessed.cumulative.core.goals_against
																	playerStat!!.ShotsAgainst! +=
																		groupPlayerBeingProcessed.cumulative.core.shots_against
																	// PointsAgainst
																	// AssistAgainst
																	// SavesAgainst
																} else {
																	tempPlayerStats.push({
																		Name: groupPlayerBeingProcessed.name,
																		RSCId: foundPlayer?.RSCId,
																		Tier: selectedLeagueGroup?.name ?? "",
																		Team: groupPlayerBeingProcessed.team, //TODO THIS SHOULD COME FROM RSC SOMEWHERE
																		GamesPlayed:
																			groupPlayerBeingProcessed.cumulative
																				.games,
																		GamesWon:
																			groupPlayerBeingProcessed.cumulative.wins,
																		GamesLost:
																			groupPlayerBeingProcessed.cumulative
																				.games -
																			groupPlayerBeingProcessed.cumulative.wins,
																		Score:
																			groupPlayerBeingProcessed.cumulative.core
																				.score,
																		Goals:
																			groupPlayerBeingProcessed.cumulative.core
																				.goals,
																		Assists:
																			groupPlayerBeingProcessed.cumulative.core
																				.assists,
																		Saves:
																			groupPlayerBeingProcessed.cumulative.core
																				.saves,
																		Shots:
																			groupPlayerBeingProcessed.cumulative.core
																				.shots,
																		MVPs: tempPlayerStatsByGame.filter(
																			(x) =>
																				x.RSCId === foundPlayer!.RSCId &&
																				x.MVP === true
																		)?.length,
																		Cycle: playerIndividualReplayStats.filter(
																			(x) =>
																				x.stats.core.goals > 0 &&
																				x.stats.core.assists > 0 &&
																				x.stats.core.saves > 0 &&
																				x.stats.core.shots > 0
																		).length,
																		HatTrick:
																			playerIndividualReplayStats.filter(
																				(x) => x.stats.core.goals > 2
																			).length,
																		Playmaker:
																			playerIndividualReplayStats.filter(
																				(x) => x.stats.core.assists > 2
																			).length,
																		Savior: playerIndividualReplayStats.filter(
																			(x) => x.stats.core.saves > 2
																		).length,
																		// PointsAgainst: playerIndividualReplayStats.fore
																		GoalsAgainst:
																			groupPlayerBeingProcessed.cumulative.core
																				.goals_against,
																		// AssistAgainst: groupPlayerBeingProcessed.cumulative.core
																		// .goals_against
																		// SavesAgainst: number
																		ShotsAgainst:
																			groupPlayerBeingProcessed.cumulative.core
																				.shots_against,
																	})
																}
															} else {
																console.log("handle missing player:")
																console.log(groupPlayerBeingProcessed)
															}
														}
													)
													// console.log("new player stats: ")
													// console.log(tempPlayerStats)
													setPerGamePlayerStats(tempPlayerStatsByGame)
													setCumulativePlayerStats(tempPlayerStats)
													// gridOptions.api?.setRowData(tempPlayerStats)
													if (showCumulativeStats) {
														gridOptions.api?.setRowData(tempPlayerStats)
													} else {
														gridOptions.api?.setRowData(tempPlayerStatsByGame)
													}
												}
											})
											.catch(function (error) {
												// handle error
												console.log(error)
											})
											.then(function () {
												// always executed
											})
									})

									// console.log(tempPlayerStats)
								})
								.catch(function (error) {
									// handle error
									console.log(error)
								})
								.then(function () {
									// always executed
								})
						})
						.catch(function (error) {
							// handle error
							console.log(error)
						})
						.then(function () {
							// always executed
						})
					// }, timeout)
				})
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}

	// function onTestClick() {
	// 	ballChasingApi.instance
	// 		.get<BallChasingGroupStats>(`BallChasingApi/GetGroupById/test-99u4wfwt1u`) //TODO UN-HARDCODE THIS
	// 		.then(function (response) {
	// 			const playerStatValues: [(string | number)[]] = [[]]

	// 			// handle success
	// 			console.log("test group:")
	// 			console.log(response.data)
	// 			response.data.players?.forEach((player) => {
	// 				const foundPlayer = playerTrackerIds?.find(
	// 					(x) => x.platformId?.toUpperCase() === player.id?.toUpperCase()
	// 				)
	// 				console.log(foundPlayer)
	// 				playerStatValues.push([
	// 					foundPlayer?.RSCId ?? "unknown player",
	// 					"", //tier
	// 					foundPlayer?.Name ?? "unknown player",
	// 					"", //team
	// 					"test day",
	// 					player.cumulative.wins,
	// 					player.cumulative.games - player.cumulative.wins,
	// 					player.cumulative.core.mvp,
	// 					player.cumulative.core.score,
	// 				])
	// 			})

	// 			const client = gapi.client as any

	// 			client.sheets.spreadsheets.values
	// 				.append({
	// 					spreadsheetId: rawStatsGoogleSheet,
	// 					majorDimension: "ROWS",
	// 					range: "Sheet1",
	// 					valueInputOption: "USER_ENTERED",
	// 					values: playerStatValues,
	// 				})
	// 				.then(
	// 					function (response: any) {
	// 						console.log("append response:")
	// 						// console.log(response.result)
	// 						console.log(response)
	// 					},
	// 					function (error: any) {
	// 						console.log("Error: " + error.result.error.message)
	// 					}
	// 				)
	// 		})
	// 		.catch(function (error) {
	// 			// handle error
	// 			console.log(error)
	// 		})
	// 		.then(function () {
	// 			// always executed
	// 		})
	// }
}

export default styled(StatsCongregate)`
	margin: 25px;
	display: flex;
	flex-direction: column;
	height: calc(100% - 50px);
	width: calc(100% - 50px);

	.headerBox {
		flex: 0;
		margin-bottom: 10px;
	}
	.footerBox {
		padding: 15px;
		flex: 0;
		height: 70px;
		display: flex;
		justify-content: flex-end;
	}

	.headerButton {
		width: 150px;
		margin-right: 10px;
	}

	.ballchasing-group-button {
		margin-right: 10px;
	}

	.stats-grid {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.toggleStatsViewButton {
		width: 300px;
	}

	.requests-container {
		width: 100%;
		display: flex;
	}
	.requests-container-item {
		margin-right: 50px;
	}
	.skip-button {
		margin-right: 20px;
	}
`
