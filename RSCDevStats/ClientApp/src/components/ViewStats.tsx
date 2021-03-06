import React, { useEffect } from "react"
import styled from "styled-components"
import BackendApi from "../BackendApi"
import {
	CumulativePlayerStats,
	IndividualGamePlayerStats,
} from "../models/CumulativePlayerStats"
import { AgGridReact } from "ag-grid-react"
import { GridOptions } from "ag-grid-community"
import ViewStatsCumulativeStatsTableColDefs from "../models/ColDefs/ViewStatsCumulativeStatsTableColDefs"
import { Button } from "reactstrap"
import { nameof } from "../utils/utils"
import ViewStatsPerGameStatsTableColDefs from "../models/ColDefs/ViewStatsPerGameStatsTableColDefs"
import { useRecoilState } from "recoil"
import { PlayerDetails } from "../models/PlayerDetails"
import { PlayerDetailsState } from "../recoil/RscImportAtom"

interface PassedProps {
	className?: string
}

const backendApi = new BackendApi()

const ViewStats = (props: PassedProps) => {
	const [playerDetails] = useRecoilState<PlayerDetails[] | undefined>(
		PlayerDetailsState
	)

	const [cumulativePlayerStats, setCumulativePlayerStats] = React.useState<
		CumulativePlayerStats[] | undefined
	>(undefined)

	const [perGamePlayerStats, setPerGamePlayerStats] = React.useState<
		IndividualGamePlayerStats[] | undefined
	>(undefined)

	const [showCumulativeStats, setShowCumulativeStats] =
		React.useState<boolean>(true)

	const [gridOptions] = React.useState<GridOptions>({
		// rowSelection: "multiple",
		defaultColDef: {
			resizable: true,
			sortable: true,
			filter: true,
			// width: 135,
		},
		applyColumnDefOrder: true,
		suppressColumnVirtualisation: true,
	})

	useEffect(() => {
		if (playerDetails && playerDetails.length > 0) {
			backendApi.instance
				.get<IndividualGamePlayerStats[]>(`PlayerStats/GetAllWeeklyStats`)
				.then(function (response) {
					// handle success
					setPerGamePlayerStats(response.data)
					const cumulativeStats: CumulativePlayerStats[] = []
					const processedPlayerIds: string[] = []

					new Set<string>(response.data.map((x) => x.RSCId)).forEach(
						(rscId) => {
							processedPlayerIds.push(rscId)

							let matchingPlayer = response.data.find((x) => x.RSCId === rscId)

							let playerContract = playerDetails?.find((x) => x.RSCId === rscId)

							function sumAllGameStats(propertyName: string) {
								return allPlayerStats
									.map((item) => item[propertyName])
									.reduce((prev, next) => prev!! + next!!)
							}

							function averageAllGameStats(propertyName: string) {
								return (
									allPlayerStats
										.map((item) => item[propertyName])
										.reduce((prev, next) => prev!! + next!!)!! /
									allPlayerStats.length
								)
							}

							const allPlayerStats = response.data.filter(
								(x) => x.RSCId === rscId
							)

							const wins = sumAllGameStats(
								nameof<IndividualGamePlayerStats>("GamesWon")
							)

							cumulativeStats.push({
								Name: matchingPlayer!!.Name, //TODO should come from database
								RSCId: rscId,
								Tier: matchingPlayer!!.Tier,
								Team: playerContract?.Team ?? "",
								GamesPlayed: allPlayerStats.length,
								WinPercent: (wins / allPlayerStats.length) * 100,
								GamesWon: wins,
								GamesLost: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("GamesLost")
								),
								MVPs: allPlayerStats.filter((x) => x.MVP && x.GamesWon!! > 0)
									.length,
								Score: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Score")
								),
								Goals: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Goals")
								),
								Assists: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Assists")
								),
								Saves: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Saves")
								),
								Shots: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Shots")
								),
								Cycle: allPlayerStats.filter((x) => x.Cycle).length,
								HatTrick: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("HatTrick")
								),
								Playmaker: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Playmaker")
								),
								Savior: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("Savior")
								),
								GoalsAgainst: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("GoalsAgainst")
								),
								PointsAgainst: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("PointsAgainst")
								),
								AssistAgainst: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("AssistAgainst")
								),
								SavesAgainst: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("SavesAgainst")
								),
								ShotsAgainst: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("ShotsAgainst")
								),
								Bpm: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("Bpm")
								),
								AvgBoostAmount: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("AvgBoostAmount")
								),
								BoostCollected: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostCollected")
								),
								BoostCollectedBigPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostCollectedBigPads")
								),
								BoostCollectedSmallPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostCollectedSmallPads")
								),
								CountCollectedBigPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("CountCollectedBigPads")
								),
								CountCollectedSmallPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("CountCollectedSmallPads")
								),
								BoostStolen: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostStolen")
								),
								BoostStolenBigPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostStolenBigPads")
								),
								BoostStolenSmallPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostStolenSmallPads")
								),
								CountStolenBigPads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("CountStolenBigPads")
								),
								CountStolenSmallpads: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("CountStolenSmallpads")
								),
								ZeroBoostTime: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("ZeroBoostTime")
								),
								HundredBoostTime: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("HundredBoostTime")
								),
								BoostUsedWhileSupersonic: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostUsedWhileSupersonic")
								),
								BoostOverfillTotal: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostOverfillTotal")
								),
								BoostOverfillStolen: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("BoostOverfillStolen")
								),
								AverageSpeed: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("AverageSpeed")
								),
								TotalDistance: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TotalDistance")
								),
								TimeSlowSpeed: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeSlowSpeed")
								),
								PercentSlowSpeed: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentSlowSpeed")
								),
								TimeBoostSpeed: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeBoostSpeed")
								),
								PercentBoostSpeed: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentBoostSpeed")
								),
								TimeSupersonic: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeSupersonic")
								),
								PercentSupersonic: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentSupersonic")
								),
								TimeOnGround: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeOnGround")
								),
								PercentOnGround: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentOnGround")
								),
								TimeLowAir: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeLowAir")
								),
								PercentLowAir: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentLowAir")
								),
								TimeHighAir: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeHighAir")
								),
								PercentHighAir: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentHighAir")
								),
								TimePowerslide: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimePowerslide")
								),
								AveragePowerslideTime: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("AveragePowerslideTime")
								),
								CountPowerslide: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("CountPowerslide")
								),
								TimeMostBack: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeMostBack")
								),
								PercentMostBack: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentMostBack")
								),
								TimeMostForward: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeMostForward")
								),
								PercentMostForward: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentMostForward")
								),
								TimeInFrontOfBall: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeInFrontOfBall")
								),
								PercentInFrontOfBall: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentInFrontOfBall")
								),
								TimeDefensiveHalf: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeDefensiveHalf")
								),
								PercentDefensiveHalf: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentDefensiveHalf")
								),
								TimeOffensiveHalf: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeOffensiveHalf")
								),
								PercentOffensiveHalf: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentOffensiveHalf")
								),
								TimeDefensiveThird: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeDefensiveThird")
								),
								PercentageDefensiveThird: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentageDefensiveThird")
								),
								TimeNeutralThird: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeNeutralThird")
								),
								PercentNeutralThird: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentNeutralThird")
								),
								TimeOffensiveThird: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("TimeOffensiveThird")
								),
								PercentOffensiveThird: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("PercentOffensiveThird")
								),
								AverageDistanceToBall: averageAllGameStats(
									nameof<IndividualGamePlayerStats>("AverageDistanceToBall")
								),
								AverageDistanceToBallHasPossession: averageAllGameStats(
									nameof<IndividualGamePlayerStats>(
										"AverageDistanceToBallHasPossession"
									)
								),
								AverageDistanceToBallNoPossession: averageAllGameStats(
									nameof<IndividualGamePlayerStats>(
										"AverageDistanceToBallNoPossession"
									)
								),
								DemosInflicted: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("DemosInflicted")
								),
								DemosTaken: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("DemosTaken")
								),
								LossMVP: sumAllGameStats(
									nameof<IndividualGamePlayerStats>("LossMVP")
								),
							})
						}
					)

					setCumulativePlayerStats(cumulativeStats)
					if (showCumulativeStats) {
						gridOptions.api?.setRowData(cumulativeStats)
						gridOptions.api?.setColumnDefs(ViewStatsCumulativeStatsTableColDefs)
						if (gridOptions.columnApi) {
							gridOptions.columnApi.autoSizeColumns(
								gridOptions.columnApi!.getAllColumns()!
							)
						}
					} else {
						gridOptions.api?.setRowData(response.data)
						gridOptions.api?.setColumnDefs(ViewStatsPerGameStatsTableColDefs)
						if (gridOptions.columnApi) {
							gridOptions.columnApi.autoSizeColumns(
								gridOptions.columnApi!.getAllColumns()!
							)
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
		}
	}, [playerDetails])

	React.useEffect(() => {
		if (showCumulativeStats) {
			if (cumulativePlayerStats) {
				gridOptions.api?.setRowData(cumulativePlayerStats)
				gridOptions.api?.setColumnDefs(ViewStatsCumulativeStatsTableColDefs)
			}
		} else {
			if (perGamePlayerStats) {
				gridOptions.api?.setRowData(perGamePlayerStats)
				gridOptions.api?.setColumnDefs(ViewStatsPerGameStatsTableColDefs)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showCumulativeStats])

	return (
		<div className={props.className + " Stats-Congregate"}>
			<div className="headerBox">
				{!showCumulativeStats && (
					<Button
						className="toggleStatsViewButton action-button-color material-drop-shadow"
						onClick={() => setShowCumulativeStats(true)}
					>
						Show Cumulative Stats
					</Button>
				)}
				{showCumulativeStats && (
					<Button
						className="toggleStatsViewButton action-button-color material-drop-shadow"
						onClick={() => setShowCumulativeStats(false)}
					>
						Show Per Game Stats
					</Button>
				)}
			</div>
			<div className={"ag-theme-material stats-grid material-drop-shadow"}>
				<AgGridReact
					gridOptions={gridOptions}
					// rowData={undefined}
					// columnDefs={ViewStatsCumulativeStatsTableColDefs}
					// onGridReady={(params) => {
					// 	params.api?.sizeColumnsToFit()
					// }}
					// rowData={props.playerStats}
				/>
				{/* {showCumulativeStats && (
					<AgGridReact
						gridOptions={gridOptions}
						columnDefs={WeeklyCumulativeStatsTableColDefs}
						// onGridReady={(params) => {
						// 	params.api?.sizeColumnsToFit()
						// }}
						// rowData={props.playerStats}
					/>
				)} */}
			</div>
		</div>
	)

	function exportToExcel() {
		gridOptions?.api?.exportDataAsCsv()
	}
}

export default styled(ViewStats)`
	margin: 25px;
	margin-left: 100px;
	margin-right: 100px;
	/* margin-top: 0px; */
	display: flex;
	flex-direction: column;
	height: calc(100% - 56px - 50px);
	/* padding: 10px; */
	/* border-radius: 10px; */

	.headerBox {
		flex: 0;
		margin-bottom: 10px;
	}

	.headerButton {
		width: 150px;
		margin-right: 10px;
	}

	.stats-grid {
		height: 100%;
		width: 100%;
		background-color: #2a3045;
		padding: 10px;
		border-radius: 10px;
	}

	.toggleStatsViewButton {
		width: 300px;
		margin-bottom: 15px;
		/* background-color: #7267e9;
		border: none;
		:hover {
			background-color: #8278eb;
		} */
	}
`
