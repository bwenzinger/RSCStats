import React, { useEffect } from "react"
// import "./App.css"
import styled from "styled-components"
import { gapi } from "gapi-script"
import Layout from "./Layout"
import { Route } from "react-router"
import { Home } from "./Home"
import ReplayUpload from "./ReplayUpload"
import StatsCongregate from "./StatsCongregate"
import ViewStats from "./ViewStats"
import StatsProcessing from "./StatsProcessing"
import { PlayerTrackerId } from "../models/PlayerTrackerId"
import { atom, useRecoilState } from "recoil"
// import App from "./App"

interface PassedProps {
	className?: string
}

const playerTrackerIdsState = atom<PlayerTrackerId[] | undefined>({
	key: "playerTrackerIds", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})

let done = false

const CLIENT_ID =
	"4165028778-f4urno332m7tg92t5c9s92ao0hmcr9qn.apps.googleusercontent.com"

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
	"https://sheets.googleapis.com/$discovery/rest?version=v4",
]

const trackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s"

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive"

const initClient = () => {
	if (done) {
		return
	}
	done = true
	gapi.client
		.init({
			apiKey: process.env.REACT_APP_GAPI_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
		})
		.then((test: any) => {
			// Listen for sign-in state changes.
			console.log("gapi.auth2", gapi.auth2)

			// gapi.auth2
			//   .getAuthInstance()
			//   .isSignedIn.listen(options.updateLoggedInStatus)

			// // Handle the initial sign-in state.
			// options.updateLoggedInStatus(
			//   gapi.auth2.getAuthInstance().isSignedIn.get()
			// )
		})
		.catch((err: any) => {
			console.error("Caught error", err)
		})
}

const SignInWrapper = (props: PassedProps) => {
	const [isSignedIntoGapi, setIsSignedIntoGapi] = React.useState<boolean>(false)

	const [initiatedClient, setInitiatedClient] = React.useState<boolean>(false)

	const [playerTrackerIds, setPlayerTrackerIds] = useRecoilState(
		playerTrackerIdsState
	)

	useEffect(() => {
		gapi.load("client:auth2", () => initClient())

		setInitiatedClient(true)
	}, [])

	return (
		<div className={props.className + " App"}>
			{!isSignedIntoGapi && initiatedClient && (
				<button onClick={onSignInClick}>Sign in</button>
			)}
			{isSignedIntoGapi && (
				<Layout>
					<Route exact path="/" component={Home} />
					<Route path="/upload" component={ReplayUpload} />
					<Route path="/statsstuff" component={StatsProcessing} />
					<Route path="/viewstats" component={ViewStats} />
					{/* <Route path="/fetch-data" component={FetchData} /> */}
				</Layout>
			)}
			{/* {isSignedIntoGapi && <div>it works!</div>} */}
		</div>
	)

	function onSignInClick() {
		gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(function (response: any) {
				// handle success
				setIsSignedIntoGapi(true)
				// useEffect(() => {
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
				// }, [])
			})
			.catch(function (error: any) {
				// handle error
				console.log(error)
			})
			.then(function () {
				// always executed
			})
	}
}

export default styled(SignInWrapper)`
	height: 100vh;
`
