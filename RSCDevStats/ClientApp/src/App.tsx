import React, { useEffect } from "react"
import { useRecoilState } from "recoil"

import "./custom.css"
import "./styles/ag-grid/material.scss"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import type from "@material-ui/lab/themeAugmentation" //dont delete
import Layout from "./components/Layout"
import { Route } from "react-router"
import ViewStats from "./components/ViewStats"
import { LeagueTeamsState, PlayerDetailsState } from "./recoil/RscImportAtom"
import { PlayerDetails } from "./models/PlayerDetails"
import ReplayUpload from "./components/ReplayUpload"
import BackendApi from "./BackendApi"
import { LeagueTeam } from "./models/LeagueTeam"
import ViewStandings from "./components/ViewStandings"
import StatsProcessing from "./components/StatsProcessing/StatsProcessing"
import styled from "styled-components"
import LoginPage from "./components/LoginPage"
import { UserCredentialsState } from "./recoil/UserCredentialsAtom"

interface PassedProps {
	className?: string
}

const backendApi = new BackendApi()

const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			"@global": {
				html: {
					WebkitFontSmoothing: "auto",
				},
			},
		},
		MuiInputBase: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiFormLabel: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiIconButton: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiInput: {
			underline: {
				color: "#d0d2d6",
			},
		},
		MuiPaper: {
			root: {
				backgroundColor: "#2a3045",
				color: "#d0d2d6",
			},
		},
		MuiSwitch: {
			colorSecondary: {
				color: "#7267e9",
				"&$checked": {
					color: "#7267e9",
				},
				"&$checked + $track": {
					backgroundColor: "#7267e9",
				},
			},
		},
		// MuiAutocomplete: {
		// 	popper: {
		// 		color: "green",
		// 	},
		// },
	},
})

const App = (props: PassedProps) => {
	const [playerDetails, setPlayerDetails] = useRecoilState(PlayerDetailsState)

	const [leagueTeams, setLeagueTeams] = useRecoilState(LeagueTeamsState)

	const [userCredentials] = useRecoilState(UserCredentialsState)

	useEffect(() => {
		backendApi.instance
			.get<PlayerDetails[]>(`GoogleSheets/GetAllPlayers`)
			.then(function (response) {
				// handle success
				setPlayerDetails(response.data)
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})

		backendApi.instance
			.get<LeagueTeam[]>(`GoogleSheets/GetAllTeams`)
			.then(function (response) {
				// handle success
				setLeagueTeams(response.data)
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}, [setLeagueTeams, setPlayerDetails])

	return (
		<div className={props.className + " App"}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Route exact path="/" component={ViewStats} />
					{/* <Route path="/upload" component={ReplayUpload} /> */}
					<Route path="/stats-processing" component={StatsProcessing} />
					<Route path="/playerstats" component={ViewStats} />
					<Route path="/standings" component={ViewStandings} />
					{!userCredentials && <Route path="/login" component={LoginPage} />}
					{/* <Route path="/fetch-data" component={FetchData} /> */}
				</Layout>
			</ThemeProvider>
			{/* </RecoilRoot> */}
		</div>
	)
}

export default styled(App)`
	height: 100vh;
`
