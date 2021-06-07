import React, { useEffect } from "react"
import styled from "styled-components"
import BallchasingApi from "../BallchasingApi"
import BallchasingApiRateLimited from "../BallchasingApiRateLimited"
import {
	BallChasingGroup,
	BallChasingGroupStats,
} from "../models/BallChasingApiModels"
import { PlayerTrackerId } from "../models/PlayerTrackerId"
import { gapi } from "gapi-script"
import {
	CumulativePlayerStats,
	IndividualGamePlayerStats,
} from "../models/CumulativePlayerStats"
import { ReplayPlayerStats, ReplayStatsRoot } from "../models/ReplayStats"
import {
	BallChasingReplay,
	BallChasingReplayPlayersEntity,
} from "../models/BallChasingReplay"
import { AgGridReact } from "ag-grid-react"
// import WeeklyCumulativeStatsTableColDefs from "../models/WeeklyCumulativeStatsTableColDefs"
import { GridOptions } from "ag-grid-community"
import WeeklyPerGameStatsTableColDefs from "../models/WeeklyPerGameStatsTableColDefs"
import WeeklyCumulativeStatsTableColDefs from "../models/WeeklyCumulativeStatsTableColDefs"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
// import { Schedule } from "./models/Scheduling"

interface PassedProps {
	className?: string
	isDragAccept?: boolean
	isDragReject?: boolean
	isDragActive?: boolean
}

const trackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s"

const rawStatsGoogleSheet = "1y4abHsJrmkdQAGGNW7ZAVpnrL3lZVN5Eh4bnsxWfHlo"

const ballChasingApi = new BallchasingApi()
const ballChasingApiRateLimited = new BallchasingApiRateLimited()

const StatsCongregate = (props: PassedProps) => {
	// const [schedule, setSchedule] = React.useState<Schedule[]>()

	const [playerTrackerIds, setPlayerTrackerIds] =
		React.useState<PlayerTrackerId[]>()

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
	const [selectedDayGroup, setSelectedDayGroup] =
		React.useState<BallChasingGroup>()
	const [ballChasingTeamGroups, setBallChasingTeamGroups] =
		React.useState<BallChasingGroup[]>()
	const [showCumulativeStats, setShowCumulativeStats] =
		React.useState<boolean>(false)

	const [isUploading, setIsUploading] = React.useState<boolean>(false)
	const [showUploadingModal, setShowUploadingModal] =
		React.useState<boolean>(false)

	const [gridOptions] = React.useState<GridOptions>({
		rowSelection: "multiple",
		defaultColDef: {
			resizable: true,
			sortable: true,
		},
	})

	const [cumulativePlayerStats, setCumulativePlayerStats] = React.useState<
		CumulativePlayerStats[]
	>([])

	const [perGamePlayerStats, setPerGamePlayerStats] = React.useState<
		IndividualGamePlayerStats[]
	>([])

	useEffect(() => {
		ballChasingApi.instance
			.get<BallChasingGroup[]>(`GetGroupsByCreator/76561199096013422`) //this is the RSC steam
			.then(function (response) {
				// handle success
				const groupId = response.data.find((x) => x.name === "RSC")?.id

				ballChasingApi.instance
					.get<BallChasingGroup[]>(`GetGroupsByParentGroup/${groupId}`)
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

	useEffect(() => {
		const client = gapi.client as any

		client.sheets.spreadsheets.values
			.get({
				spreadsheetId: trackerLinksSheetId,
				range: "Link List",
			})
			.then(
				function (response: any) {
					const tempPlayerTrackerIds: PlayerTrackerId[] = []
					response.result.values.forEach((element: any) => {
						let trackerLink = element[2] as string

						let trackerPlatform = ""
						let trackerId = ""

						if (trackerLink.startsWith("http://")) {
							trackerLink = trackerLink.replace("http://", "https://") //just make them all https since it doesn't really matter
						}

						//some of the links include "rocket-league"
						if (trackerLink.includes("/rocket-league/")) {
							trackerLink = trackerLink.replace("/rocket-league", "")
						}

						if (trackerLink.includes("/xbl/")) {
							trackerLink = trackerLink.replace("/xbl", "/xbox") //not sure if there's a difference here?
						}

						if (trackerLink.includes("/ps/")) {
							trackerLink = trackerLink.replace("/ps/", "/psn/") //not sure if there's a difference here?
						}

						if (trackerLink.includes("steam")) {
							//steam
							trackerPlatform = "Steam"
							trackerId = trackerLink.split(
								"https://rocketleague.tracker.network/profile/steam/"
							)[1]
						} else if (trackerLink.includes("epic")) {
							//epic
							trackerPlatform = "Epic"
							//uri is in ASCII so we need to decode it
							trackerId = decodeURIComponent(trackerLink).split(
								"https://rocketleague.tracker.network/profile/epic/"
							)[1]
						} else if (trackerLink.includes("xbox")) {
							//xbox
							trackerPlatform = "Xbox"
							trackerId = decodeURIComponent(trackerLink).split(
								"https://rocketleague.tracker.network/profile/xbox/"
							)[1]
						} else if (trackerLink.includes("switch")) {
							//xbox
							trackerPlatform = "Switch"
							trackerId = trackerLink.split(
								"https://rocketleague.tracker.network/profile/switch/"
							)[1]
						} else {
							trackerPlatform = "PS4"
							//playstation
							trackerId = trackerLink.split(
								"https://rocketleague.tracker.network/profile/psn/"
							)[1]
						}

						// if (!trackerId) {
						//   console.log(trackerLink)
						//   console.log(trackerId)
						// }

						//if the tracker id still contains /overview at the end, remove it
						if (trackerId && trackerId.includes("/")) {
							trackerId = trackerId.split("/")[0]
						}

						tempPlayerTrackerIds.push({
							RSCId: element[0],
							Name: element[1],
							TrackerLink: element[2],
							platform: trackerPlatform,
							platformId: trackerId,
						})
					})
					// console.log("player tracker ids:")
					// console.log(tempPlayerTrackerIds)

					setPlayerTrackerIds(tempPlayerTrackerIds)
				},
				function (error: any) {
					console.log("Error: " + error.result.error.message)
				}
			)
	}, [])

	React.useEffect(() => {
		if (showCumulativeStats) {
			gridOptions.api?.setRowData(perGamePlayerStats)
			gridOptions.api?.setColumnDefs(WeeklyPerGameStatsTableColDefs)
		} else {
			gridOptions.api?.setRowData(cumulativePlayerStats)
			gridOptions.api?.setColumnDefs(WeeklyCumulativeStatsTableColDefs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showCumulativeStats])

	return (
		<div className={props.className + " Stats-Congregate"}>
			{/* <ReplayUpload /> */}
			<div className="headerBox">
				{/* <button className="headerButton" onClick={onTestClick}>
					test stats upload
				</button> */}
				{selectedSeasonGroup && <div>Selected: {selectedSeasonGroup.name}</div>}
				{!selectedSeasonGroup && <div>Please select a season</div>}
				{!selectedSeasonGroup && ballChasingSeasonGroups && (
					<div>
						{ballChasingSeasonGroups.map((element) => (
							<Button
								className="ballchasing-group-button"
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
									className="ballchasing-group-button"
									onClick={() => onLeagueGroupClick(element)}
									key={"ballchasing-group-" + element.name}
								>
									{element.name}
								</Button>
							))}
						</div>
					)}
				{selectedDayGroup && <div>Selected: {selectedDayGroup.name}</div>}
				{!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
					<div>Please select a day</div>
				)}
				{!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
					<div>
						{ballChasingDayGroups.map((element) => (
							<Button
								className="ballchasing-group-button"
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
						<Button className="headerButton" onClick={exportToExcel}>
							Export to excel
						</Button>,
						<Button
							className="toggleStatsViewButton"
							onClick={() => setShowCumulativeStats(!showCumulativeStats)}
						>
							Toggle per game/cumulative stats
						</Button>,
					]}
			</div>

			{ballChasingTeamGroups &&
				ballChasingTeamGroups.length > 0 && [
					<div
						className={"ag-theme-material stats-grid"}
						// style={{ height: "1000px", width: "100%" }}
					>
						{!showCumulativeStats && (
							<AgGridReact
								gridOptions={gridOptions}
								columnDefs={WeeklyPerGameStatsTableColDefs}
								// onGridReady={(params) => {
								// 	params.api?.sizeColumnsToFit()
								// }}
								// rowData={props.playerStats}
							/>
						)}
						{showCumulativeStats && (
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
						<Button color="success" onClick={uploadSelectedStats}>
							Upload Selected Stats
						</Button>
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

	function exportToExcel() {
		gridOptions?.api?.exportDataAsCsv()
	}

	function onSeasonGroupClick(group: BallChasingGroup) {
		setSelectedSeasonGroup(group)

		ballChasingApi.instance
			.get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
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
		setSelectedLeagueGroup(group)
		ballChasingApi.instance
			.get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
			.then(function (response) {
				// handle success
				if (response.data.length === 1) {
					ballChasingApi.instance
						.get<BallChasingGroup[]>(
							`GetGroupsByParentGroup/${response.data[0].id}`
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

	function onDayGroupClick(group: BallChasingGroup) {
		setSelectedDayGroup(group)
		ballChasingApi.instance
			.get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
			.then(function (response) {
				// handle success
				setBallChasingTeamGroups(response.data)

				let tempPlayerStats: CumulativePlayerStats[] = []
				let tempPlayerStatsByGame: IndividualGamePlayerStats[] = []
				// let timeout = 0
				// let numberResponsesProcessed = 0
				response.data.forEach((item) => {
					// timeout += 1000
					// setTimeout(function () {
					ballChasingApiRateLimited.instance
						.get<BallChasingGroupStats>(`GetGroupById/${item.id}`)
						.then(function (getDayGroupByIdResponse) {
							ballChasingApiRateLimited.instance
								.get<ReplayStatsRoot>(`GetReplaysByGroup/${item.id}`)
								.then(function (getReplaysForDayGroupResponse) {
									const detailedReplays: BallChasingReplay[] = []

									getReplaysForDayGroupResponse.data.list?.forEach((replay) => {
										ballChasingApiRateLimited.instance
											.get<BallChasingReplay>(`GetReplayById/${replay.id}`)
											.then(function (getSingleReplayResponse) {
												detailedReplays.push(getSingleReplayResponse.data)
												if (
													detailedReplays.length ===
													getReplaysForDayGroupResponse.data.list?.length
												) {
													getDayGroupByIdResponse.data.players?.forEach(
														(groupPlayerBeingProcessed) => {
															let foundPlayer = playerTrackerIds?.find(
																(x) =>
																	x.platformId?.toUpperCase() ===
																	groupPlayerBeingProcessed.id?.toUpperCase()
															)
															if (
																!foundPlayer &&
																groupPlayerBeingProcessed.platform === "Epic"
															) {
																foundPlayer = playerTrackerIds?.find(
																	(x) =>
																		x.platformId?.toUpperCase() ===
																		groupPlayerBeingProcessed.name?.toUpperCase()
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

															// getReplaysForDayGroupResponse.data.list?.forEach(
															// 	(replay) => {
															// 		const tempPlayerStatsFromReplays = replay[
															// 			playerTeamIsBlue ? "blue" : "orange"
															// 		].players?.filter(
															// 			(x) =>
															// 				x.id.id.toUpperCase() ===
															// 				groupPlayerBeingProcessed.id.toUpperCase()
															// 		)
															// 		if (tempPlayerStatsFromReplays) {
															// 			playerStatsFromReplays.push(
															// 				...tempPlayerStatsFromReplays
															// 			)
															// 		}
															// 	}
															// )

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
																			Name: groupPlayerBeingProcessed.name,
																			RSCId: foundPlayer?.RSCId,
																			OnlineId: groupPlayerBeingProcessed.id,
																			ReplayId: replay.id!!,
																			ReplayTitle: replay.title ?? "",
																			Week:
																				parseInt(
																					group?.name
																						.match(/\d+/g)
																						?.toString() ?? ""
																				) ?? -1,
																			Tier: selectedLeagueGroup?.name ?? "",
																			Team: groupPlayerBeingProcessed.team, //TODO THIS SHOULD COME FROM RSC SOMEWHERE
																			GamesWon: playerWonGame ? 1 : 0,
																			GamesLost: playerWonGame ? 0 : 1,
																			Score: tempPlayerStats.stats.core.score,
																			Goals: tempPlayerStats.stats.core.goals,
																			Assists:
																				tempPlayerStats.stats.core.assists,
																			Saves: tempPlayerStats.stats.core.saves,
																			Shots: tempPlayerStats.stats.core.shots,
																			MVP:
																				playerWonGame &&
																				tempPlayerStats.stats.core.mvp,
																			Cycle:
																				tempPlayerStats.stats.core.goals > 0 &&
																				tempPlayerStats.stats.core.assists >
																					0 &&
																				tempPlayerStats.stats.core.saves > 0 &&
																				tempPlayerStats.stats.core.shots > 0,
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
																			bpm: tempPlayerStats.stats.boost.bpm,
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
																			LossMVP:
																				!playerWonGame &&
																				tempPlayerStats.stats.core.mvp,
																		})
																	}
																}
															})

															if (foundPlayer) {
																tempPlayerStats.push({
																	Name: groupPlayerBeingProcessed.name,
																	RSCId: foundPlayer?.RSCId,
																	OnlineId: groupPlayerBeingProcessed.id,
																	Tier: selectedLeagueGroup?.name ?? "",
																	Team: groupPlayerBeingProcessed.team, //TODO THIS SHOULD COME FROM RSC SOMEWHERE
																	GamesWon:
																		groupPlayerBeingProcessed.cumulative.wins,
																	GamesLost:
																		groupPlayerBeingProcessed.cumulative.games -
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
																	MVPs: playerStatsFromReplays.filter(
																		(x) => x.mvp === true
																	).length,
																	Cycle: playerIndividualReplayStats.filter(
																		(x) =>
																			x.stats.core.goals > 0 &&
																			x.stats.core.assists > 0 &&
																			x.stats.core.saves > 0 &&
																			x.stats.core.shots > 0
																	).length,
																	HatTrick: playerIndividualReplayStats.filter(
																		(x) => x.stats.core.goals > 2
																	).length,
																	Playmaker: playerIndividualReplayStats.filter(
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
																	bpm: groupPlayerBeingProcessed.cumulative
																		.boost.bpm,
																	// AvgBoostAmount: number
																	// BoostCollected: number
																	// BoostCollectedBigPads: number
																	// BoostCollectedSmallPads: number
																	// CountCollectedBigPads: number
																	// CountCollectedSmallPads: number
																	// BoostStolen: number
																	// BoostStolenBigPads: number
																	// BoostStolenSmallPads: number
																	// CountStolenBigPads: number
																	// CountStolenSmallpads: number
																	// ZeroBoostTime: number
																	// HundredBoostTime: number
																	// BoostUsedWhileSupersonic: number
																	// BoostOverfillTotal: number
																	// BoostOverfillStolen: number
																	// AverageSpeed: number
																	// TotalDistance: number
																	// TimeSlowSpeed: number
																	// PercentSlowSpeed: number
																	// TimeBoostSpeed: number
																	// PercentBoostSpeed: number
																	// TimeSupersonic: number
																	// PercentSupersonic: number
																	// TimeOnGround: number
																	// PercentOnGround: number
																	// TimeLowAir: number
																	// PercentLowAir: number
																	// TimeHighAir: number
																	// PercentHighAir: number
																	// TimePowerslide: number
																	// AveragePowerslideTime: number
																	// CountPowerslide: number
																	// TimeMostBack: number
																	// PercentMostBack: number
																	// TimeMostForward: number
																	// PercentMostForward: number
																	// TimeInFrontOfBall: number
																	// PercentInFrontOfBall: number
																	// TimeDefensiveHalf: number
																	// PercentDefensiveHalf: number
																	// TimeOffensiveHalf: number
																	// PercentOffensiveHalf: number
																	// TimeDefensiveThird: number
																	// PercentageDefensiveThird: number
																	// TimeNeutralThird: number
																	// PercentNeutralThird: number
																	// TimeOffensiveThird: number
																	// PercentOffensiveThird: number
																	// AverageDistanceToBall: number
																	// AverageDistanceToBallHasPossession: number
																	// AverageDistanceToBallNoPossession: number
																	// DemosInflicted: number
																	// DemosTaken: number
																	// LossMVP: number
																})
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

	function onTestClick() {
		ballChasingApi.instance
			.get<BallChasingGroupStats>(`GetGroupById/test-99u4wfwt1u`) //TODO UN-HARDCODE THIS
			.then(function (response) {
				const playerStatValues: [(string | number)[]] = [[]]

				// handle success
				console.log("test group:")
				console.log(response.data)
				response.data.players?.forEach((player) => {
					const foundPlayer = playerTrackerIds?.find(
						(x) => x.platformId?.toUpperCase() === player.id?.toUpperCase()
					)
					console.log(foundPlayer)
					playerStatValues.push([
						foundPlayer?.RSCId ?? "unknown player",
						"", //tier
						foundPlayer?.Name ?? "unknown player",
						"", //team
						"test day",
						player.cumulative.wins,
						player.cumulative.games - player.cumulative.wins,
						player.cumulative.core.mvp,
						player.cumulative.core.score,
					])
				})

				const client = gapi.client as any

				client.sheets.spreadsheets.values
					.append({
						spreadsheetId: rawStatsGoogleSheet,
						majorDimension: "ROWS",
						range: "Sheet1",
						valueInputOption: "USER_ENTERED",
						values: playerStatValues,
					})
					.then(
						function (response: any) {
							console.log("append response:")
							// console.log(response.result)
							console.log(response)
						},
						function (error: any) {
							console.log("Error: " + error.result.error.message)
						}
					)
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

export default styled(StatsCongregate)`
	margin: 25px;
	display: flex;
	flex-direction: column;
	height: 100%;

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
	}

	.toggleStatsViewButton {
		width: 300px;
	}
`
