import React, { useEffect } from "react"
// import "./App.css"
import styled from "styled-components"
import { gapi } from "gapi-script"
import Layout from "./Layout"
import { Route } from "react-router"
import { Home } from "./Home"
import ReplayUpload from "./ReplayUpload"
import ViewStats from "./ViewStats"
import StatsProcessing from "./StatsProcessing/StatsProcessing"
// import { PlayerTrackerId } from "../models/PlayerTrackerId"
import { useRecoilState } from "recoil"
// import { PlayerContract } from "../models/PlayerContract"
import { LeagueTeam } from "../models/LeagueTeam"
import ViewStandings from "./ViewStandings"
import { LeagueTeamsState, PlayerDetailsState } from "../recoil/RscImportAtom"
import BackendApi from "../BackendApi"
import { PlayerDetails } from "../models/PlayerDetails"
// import App from "./App"

interface PassedProps {
	className?: string
}

const backendApi = new BackendApi()

// const CLIENT_ID =
// 	"4165028778-f4urno332m7tg92t5c9s92ao0hmcr9qn.apps.googleusercontent.com"

// // Array of API discovery doc URLs for APIs used by the quickstart
// const DISCOVERY_DOCS = [
// 	"https://sheets.googleapis.com/$discovery/rest?version=v4",
// ]

// const trackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s"

// const playerContractsSheetId = "1WOQz4JWI3N2fhqAkwmmRKBm52_iKc7nax-Ad4nPwrvA"

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// const SCOPES = "https://www.googleapis.com/auth/drive"

// const initClient = () => {
// 	if (done) {
// 		return
// 	}
// 	done = true
// 	gapi.client
// 		.init({
// 			apiKey: process.env.REACT_APP_GAPI_KEY,
// 			clientId: CLIENT_ID,
// 			discoveryDocs: DISCOVERY_DOCS,
// 			scope: SCOPES,
// 		})
// 		.then((test: any) => {
// 			// Listen for sign-in state changes.
// 			console.log("gapi.auth2", gapi.auth2)

// 			// gapi.auth2
// 			//   .getAuthInstance()
// 			//   .isSignedIn.listen(options.updateLoggedInStatus)

// 			// // Handle the initial sign-in state.
// 			// options.updateLoggedInStatus(
// 			//   gapi.auth2.getAuthInstance().isSignedIn.get()
// 			// )
// 		})
// 		.catch((err: any) => {
// 			console.error("Caught error", err)
// 		})
// }

const App = (props: PassedProps) => {
	// const [isSignedIntoGapi, setIsSignedIntoGapi] = React.useState<boolean>(false)

	// const [initiatedClient, setInitiatedClient] = React.useState<boolean>(false)

	// const [initiatedClient, setInitiatedClient] = React.useState<boolean>(false)

	const [playerDetails, setPlayerDetails] = useRecoilState(PlayerDetailsState)

	// const [uniquePlayerNames, setUniquePlayerNames] = useRecoilState(
	// 	UniquePlayerNamesState
	// )

	// const [playerContracts, setPlayerContracts] =
	// 	useRecoilState(PlayerContractsState)

	const [leagueTeams, setLeagueTeams] = useRecoilState(LeagueTeamsState)

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

	// useEffect(() => {
	// 	if (playerTrackerIds && playerTrackerIds?.length > 0) {
	// 		const client = gapi.client as any

	// 		client.sheets.spreadsheets.values
	// 			.get({
	// 				spreadsheetId: playerContractsSheetId,
	// 				range: "Contracts",
	// 			})
	// 			.then(
	// 				function (response: any) {
	// 					const tempPlayerContracts: PlayerContract[] = []
	// 					response.result.values.forEach((element: any, index: number) => {
	// 						if (index !== 0) {
	// 							const foundPlayerTracker = playerTrackerIds.find(
	// 								(x) => x.Name === element[0]
	// 							)
	// 							if (foundPlayerTracker) {
	// 								tempPlayerContracts.push({
	// 									RSCId: foundPlayerTracker.RSCId,
	// 									OnlineId: foundPlayerTracker.PlatformId,
	// 									OnlinePlatform: foundPlayerTracker.Platform,
	// 									Name: element[0],
	// 									Franchise: element[1],
	// 									Team: element[2],
	// 									BaseMmr: element[3],
	// 									CurrentMmr: element[4],
	// 									ContractStatus: element[5],
	// 									ContractLength: element[6],
	// 								})
	// 							}
	// 						}
	// 					})

	// 					setPlayerContracts(tempPlayerContracts)
	// 				},
	// 				function (error: any) {
	// 					console.log("Error: " + error.result.error.message)
	// 				}
	// 			)
	// 	}
	// }, [playerTrackerIds, setPlayerContracts])

	return (
		<div className={props.className + " App"}>
			{/* {!isSignedIntoGapi && initiatedClient && (
				// <button onClick={onSignInClick}>Sign in</button>
			)}
			{isSignedIntoGapi && ( */}
			<Layout>
				<Route exact path="/" component={ViewStats} />
				<Route path="/upload" component={ReplayUpload} />
				<Route path="/statsstuff" component={StatsProcessing} />
				<Route path="/viewstats" component={ViewStats} />
				<Route path="/standings" component={ViewStandings} />
				{/* <Route path="/fetch-data" component={FetchData} /> */}
			</Layout>
			{/* )} */}
			{/* {isSignedIntoGapi && <div>it works!</div>} */}
		</div>
	)

	// function onSignInClick() {
	// 	gapi.auth2
	// 		.getAuthInstance()
	// 		.signIn()
	// 		.then(function (response: any) {
	// 			// handle success
	// 			setIsSignedIntoGapi(true)
	// 			// useEffect(() => {
	// 			const client = gapi.client as any

	// 			client.sheets.spreadsheets.values
	// 				.get({
	// 					spreadsheetId: playerContractsSheetId,
	// 					range: "Teams",
	// 				})
	// 				.then(
	// 					function (response: any) {
	// 						const tempLeagueTeams: LeagueTeam[] = []
	// 						response.result.values.forEach((element: any, index: number) => {
	// 							if (index !== 0) {
	// 								tempLeagueTeams.push({
	// 									TeamName: element[0],
	// 									Franchise: element[1],
	// 									Tier: element[2],
	// 								})
	// 							}
	// 						})

	// 						setLeagueTeams(tempLeagueTeams)
	// 					},
	// 					function (error: any) {
	// 						console.log("Error: " + error.result.error.message)
	// 					}
	// 				)

	// 			backendApi.instance
	// 				.get<PlayerDetails[]>(`GoogleSheets/GetAllPlayers`)
	// 				.then(function (response) {
	// 					setPlayerTrackerIds(response.data)
	// 					setUniquePlayerNames([
	// 						...new Set<string>([...response.data.map((x) => x.Name)]),
	// 					])
	// 				})
	// 				.catch(function (error) {
	// 					// handle error
	// 					console.log(error)
	// 				})
	// 				.then(function () {
	// 					// always executed
	// 				})

	// 			// client.sheets.spreadsheets.values
	// 			// 	.get({
	// 			// 		spreadsheetId: trackerLinksSheetId,
	// 			// 		range: "Link List",
	// 			// 	})
	// 			// 	.then(
	// 			// 		function (response: any) {
	// 			// 			const tempPlayerTrackerIds: PlayerTrackerId[] = []
	// 			// 			response.result.values.forEach((element: any) => {
	// 			// 				let trackerLink = element[2] as string

	// 			// 				let trackerPlatform = ""
	// 			// 				let trackerId = ""

	// 			// 				if (trackerLink.startsWith("http://")) {
	// 			// 					trackerLink = trackerLink.replace("http://", "https://") //just make them all https since it doesn't really matter
	// 			// 				}

	// 			// 				//some of the links include "rocket-league"
	// 			// 				if (trackerLink.includes("/rocket-league/")) {
	// 			// 					trackerLink = trackerLink.replace("/rocket-league", "")
	// 			// 				}

	// 			// 				if (trackerLink.includes("/xbl/")) {
	// 			// 					trackerLink = trackerLink.replace("/xbl", "/xbox") //not sure if there's a difference here?
	// 			// 				}

	// 			// 				if (trackerLink.includes("/ps/")) {
	// 			// 					trackerLink = trackerLink.replace("/ps/", "/psn/") //not sure if there's a difference here?
	// 			// 				}

	// 			// 				if (trackerLink.includes("steam")) {
	// 			// 					//steam
	// 			// 					trackerPlatform = "Steam"
	// 			// 					trackerId = trackerLink.split(
	// 			// 						"https://rocketleague.tracker.network/profile/steam/"
	// 			// 					)[1]
	// 			// 				} else if (trackerLink.includes("epic")) {
	// 			// 					//epic
	// 			// 					trackerPlatform = "Epic"
	// 			// 					//uri is in ASCII so we need to decode it
	// 			// 					trackerId = decodeURIComponent(trackerLink).split(
	// 			// 						"https://rocketleague.tracker.network/profile/epic/"
	// 			// 					)[1]
	// 			// 				} else if (trackerLink.includes("xbox")) {
	// 			// 					//xbox
	// 			// 					trackerPlatform = "Xbox"
	// 			// 					trackerId = decodeURIComponent(trackerLink).split(
	// 			// 						"https://rocketleague.tracker.network/profile/xbox/"
	// 			// 					)[1]
	// 			// 				} else if (trackerLink.includes("switch")) {
	// 			// 					//xbox
	// 			// 					trackerPlatform = "Switch"
	// 			// 					trackerId = trackerLink.split(
	// 			// 						"https://rocketleague.tracker.network/profile/switch/"
	// 			// 					)[1]
	// 			// 				} else {
	// 			// 					trackerPlatform = "PS4"
	// 			// 					//playstation
	// 			// 					trackerId = trackerLink.split(
	// 			// 						"https://rocketleague.tracker.network/profile/psn/"
	// 			// 					)[1]
	// 			// 				}

	// 			// 				// if (!trackerId) {
	// 			// 				//   console.log(trackerLink)
	// 			// 				//   console.log(trackerId)
	// 			// 				// }

	// 			// 				//if the tracker id still contains /overview at the end, remove it
	// 			// 				if (trackerId && trackerId.includes("/")) {
	// 			// 					trackerId = trackerId.split("/")[0]
	// 			// 				}

	// 			// 				tempPlayerTrackerIds.push({
	// 			// 					RSCId: element[0],
	// 			// 					Name: element[1],
	// 			// 					TrackerLink: element[2],
	// 			// 					platform: trackerPlatform,
	// 			// 					platformId: trackerId,
	// 			// 				})
	// 			// 			})
	// 			// 			// console.log("player tracker ids:")
	// 			// 			// console.log(tempPlayerTrackerIds)

	// 			// 			setPlayerTrackerIds(tempPlayerTrackerIds)

	// 			// 			setUniquePlayerNames([
	// 			// 				...new Set<string>([
	// 			// 					...tempPlayerTrackerIds.map((x) => x.Name),
	// 			// 				]),
	// 			// 			])
	// 			// 		},
	// 			// 		function (error: any) {
	// 			// 			console.log("Error: " + error.result.error.message)
	// 			// 		}
	// 			// 	)

	// 			// }, [])
	// 		})
	// 		.catch(function (error: any) {
	// 			// handle error
	// 			console.log(error)
	// 		})
	// 		.then(function () {
	// 			// always executed
	// 		})
	// }
}

export default styled(App)`
	height: 100vh;
`
