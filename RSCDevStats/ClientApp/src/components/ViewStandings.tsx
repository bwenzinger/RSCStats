import React, { useEffect } from "react"
import styled from "styled-components"
import BackendApi from "../BackendApi"
import { CumulativePlayerStats } from "../models/CumulativePlayerStats"
import { AgGridReact } from "ag-grid-react"
import { GridOptions } from "ag-grid-community"
import ViewStatsCumulativeStatsTableColDefs from "../models/ColDefs/ViewStatsCumulativeStatsTableColDefs"
import { Button } from "reactstrap"
import { MatchResult } from "../models/MatchResult"
import { Standing } from "../models/Standing"
import ViewMatchResultsTableColDefs from "../models/ColDefs/ViewMatchResultsTableColDefs"
import ViewStandingsTableColDefs from "../models/ColDefs/ViewStandingsTableColDefs"

interface PassedProps {
	className?: string
}

const backendApi = new BackendApi()

const ViewStats = (props: PassedProps) => {
	const [matchResults, setMatchResults] = React.useState<MatchResult[]>([])
	const [standings, setStandings] = React.useState<Standing[]>([])

	const [showWeekByWeek, setShowWeekByWeek] = React.useState<boolean>(false)

	const [gridOptions] = React.useState<GridOptions>({
		// rowSelection: "multiple",
		defaultColDef: {
			resizable: true,
			sortable: true,
			filter: true,
		},
		applyColumnDefOrder: true,
	})

	useEffect(() => {
		backendApi.instance
			.get<MatchResult[]>(`MatchResults/GetAllMatchResults`)
			.then(function (response) {
				setMatchResults(response.data)
				const tempStandings: Standing[] = []
				response.data.forEach((result) => {
					const existingHomeTeamStanding = tempStandings.find(
						(x) => x.Team === result.HomeTeam
					)
					const existingAwayTeamStanding = tempStandings.find(
						(x) => x.Team === result.AwayTeam
					)
					const homeLosses = 4 - result.HomeTeamWins
					const awayLosses = 4 - result.AwayTeamWins
					if (existingHomeTeamStanding) {
						existingHomeTeamStanding.GamesPlayed += 4
						existingHomeTeamStanding.Wins += result.HomeTeamWins
						existingHomeTeamStanding.Losses += homeLosses
					} else {
						tempStandings.push({
							Tier: result.Tier,
							Team: result.HomeTeam,
							GamesPlayed: 4,
							Wins: result.HomeTeamWins,
							Losses: homeLosses,
						})
					}
					if (existingAwayTeamStanding) {
						const losses = 4 - result.AwayTeamWins
						existingAwayTeamStanding.GamesPlayed += 4
						existingAwayTeamStanding.Wins += result.AwayTeamWins
						existingAwayTeamStanding.Losses += losses
					} else {
						tempStandings.push({
							Tier: result.Tier,
							Team: result.AwayTeam,
							GamesPlayed: 4,
							Wins: result.AwayTeamWins,
							Losses: awayLosses,
						})
					}
				})
				setStandings(tempStandings)
				if (showWeekByWeek) {
					gridOptions.api?.setRowData(response.data)
					gridOptions.api?.setColumnDefs(ViewMatchResultsTableColDefs)
				} else {
					gridOptions.api?.setRowData(tempStandings)
					gridOptions.api?.setColumnDefs(ViewStandingsTableColDefs)
				}
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
		if (showWeekByWeek) {
			gridOptions.api?.setRowData(matchResults)
			gridOptions.api?.setColumnDefs(ViewMatchResultsTableColDefs)
		} else {
			gridOptions.api?.setRowData(standings)
			gridOptions.api?.setColumnDefs(ViewStandingsTableColDefs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showWeekByWeek])

	return (
		<div className={props.className + " Stats-Congregate"}>
			<div className="headerBox">
				{!showWeekByWeek && (
					<Button
						className="toggleStatsViewButton action-button-color material-drop-shadow"
						onClick={() => setShowWeekByWeek(true)}
					>
						Show Week By Week
					</Button>
				)}
				{showWeekByWeek && (
					<Button
						className="toggleStatsViewButton action-button-color material-drop-shadow"
						onClick={() => setShowWeekByWeek(false)}
					>
						Show Overall Standings
					</Button>
				)}
			</div>
			<div className={"ag-theme-material stats-grid material-drop-shadow"}>
				<AgGridReact
					gridOptions={gridOptions}
					// columnDefs={ViewStandingsTableColDefs}
					// onGridReady={(params) => {
					// 	params.api?.sizeColumnsToFit()
					// }}
					// rowData={matchResults}
				/>
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
