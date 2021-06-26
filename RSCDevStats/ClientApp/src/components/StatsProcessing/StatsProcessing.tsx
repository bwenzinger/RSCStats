import React from "react"
import styled from "styled-components"
import ManualStatsEntry from "./ManualStatsEntry"
import StatsCongregate from "./StatsCongregate"
// import { IconButton } from "@material-ui/core"
// import NavigateNextIcon from "@material-ui/icons/NavigateNext"

interface PassedProps {
	className?: string
}

const AutomaticTab = "AUTOMATIC"
const ManualTab = "MANUAL"

const StatsProcessing = (props: PassedProps) => {
	const [selectedTab, setSelectedTab] = React.useState<string>(AutomaticTab)

	return (
		<div className={props.className + " stats-processing"}>
			<div className="sideNavBar material-drop-shadow">
				{/* <IconButton className="navBarButton">
					Automatic
					<NavigateNextIcon />
				</IconButton> */}
				<button
					className={
						"navBarButton text-left" +
						(selectedTab === AutomaticTab ? " bold-button-text" : "")
					}
					onClick={() => setSelectedTab(AutomaticTab)}
				>
					Automatic
				</button>
				<button
					className="navBarButton text-left"
					onClick={() => setSelectedTab(ManualTab)}
				>
					Manual Entry
				</button>
			</div>
			{selectedTab === AutomaticTab && (
				<div className="stats-processing-content material-drop-shadow">
					<StatsCongregate />
				</div>
			)}
			{selectedTab === ManualTab && <ManualStatsEntry />}
		</div>
	)
}

export default styled(StatsProcessing)`
	height: calc(100% - 56px);
	/* height: 100%; */
	display: flex;

	.sideNavBar {
		/* width: 200px; */
		/* height: calc(100% - 56px); */
		margin-top: 20px;
		margin-bottom: 20px;
		margin-right: 20px;
		margin-left: 100px;
		display: flex;
		flex-direction: column;
		background-color: #2a3045;
		border-radius: 5px;
		padding-top: 15px;
		flex: 0 0 200px;
		/* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
	}

	.navBarButton {
		background-color: transparent;
		width: 100%;
		height: 50px;
		border: none;
		color: #d0d2d6;
		:hover {
			color: #54596a;
		}
		padding-left: 30px;
	}

	.stats-processing-content {
		margin-top: 20px;
		margin-bottom: 20px;
		margin-right: 100px;
		background-color: #2a3045;
		border-radius: 5px;
		width: 100%;
	}

	.bold-button-text {
		font-weight: bold;
	}
`
