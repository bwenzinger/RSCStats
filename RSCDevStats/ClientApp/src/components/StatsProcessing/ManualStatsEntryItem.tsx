import {
	FormControlLabel,
	Grid,
	Switch,
	TextField,
	Typography,
} from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import { nameof } from "../../utils/utils"
import CssTextField from "../common/CssTextField"
import { ManualPlayerStatsEntry } from "../../models/ManualPlayerStatsEntry"

interface Props {
	className?: string
	playerStats: ManualPlayerStatsEntry
	onDeleteClick: (id: string) => void
	onValueChange: (id: string, field: string, newValue: number) => void
}

const inputProps = { style: { color: "#d0d2d6" } }

const ManualStatsEntryItem = (props: Props) => {
	// const typingScoreIdentifier = React.useRef<NodeJS.Timeout>()
	// const localPlayerStats = React.useRef<ManualPlayerStatsEntry>({
	// 	id: props.playerStatsId,
	// })

	const [localPlayerStats, setLocalPlayerStats] =
		React.useState<ManualPlayerStatsEntry>(props.playerStats)

	// const onScoreChange = React.useRef(
	// 	_.debounce((newValue) => {
	// 		props.onValueChange(
	// 			props.playerStats.id,
	// 			nameof<ManualPlayerStatsEntry>("Score"),
	// 			newValue
	// 		)

	// 		// Fire API call or Comments manipulation on client end side
	// 	}, 1000)
	// ).current

	// const onScoreChange2 = (e) => {
	// 	onScoreChange(e.target.value)
	// }
	// const onChange = (e) => {
	// 	delayedOnChange(e.target.value)
	// }

	// const delayedOnChange = React.useCallback(
	// 	_.debounce(
	// 		(event) =>
	// 			props.onValueChange(
	// 				props.playerStats.id,
	// 				nameof<ManualPlayerStatsEntry>("Score"),
	// 				event.target.value
	// 			),
	// 		500
	// 	),
	// 	[]
	// )

	// React.useEffect(() => {
	// 	console.log("mounted list item: " + props.playerStats.id)
	// })

	return (
		<div className={props.className + " material-drop-shadow"}>
			{/* <div>{props.playerStatsId}</div> */}
			<CssTextField
				inputProps={inputProps}
				className="manual-stats-entry-field"
				label="Score"
				type="number"
				// id={"score-" + props.playerStatsId}
				value={localPlayerStats.Score}
				onChange={onScoreChange}
			/>
			<CssTextField
				className="manual-stats-entry-field"
				label="Goals"
				type="number"
				// id={"goals-" + props.playerStatsId}
				value={props.playerStats.Goals}
				onChange={onGoalsChange}
			/>
			<CssTextField
				className="manual-stats-entry-field"
				label="Assists"
				type="number"
				// id={"assists-" + props.playerStatsId}
				value={props.playerStats.Assists}
				onChange={onAssistsChange}
			/>
			<CssTextField
				className="manual-stats-entry-field"
				label="Saves"
				type="number"
				// id={"saves-" + props.playerStatsId}
				value={props.playerStats.Saves}
				onChange={onSavesChange}
			/>
			<CssTextField
				className="manual-stats-entry-field"
				label="Shots"
				type="number"
				// id={"shots-" + props.playerStatsId}
				value={props.playerStats.Shots}
				onChange={onShotsChange}
			/>

			{/* <Typography component="div" className="manual-stats-entry-switch">
				<Grid component="label" container alignItems="center" spacing={1}>
					<Grid item>Lost</Grid>
					<Grid item>
						<Switch
							// checked={state.checkedC}
							// onChange={handleChange}
							name="checkedC"
						/>
					</Grid>
					<Grid item>Won</Grid>
				</Grid>
			</Typography>

			<DividerDiv />

			<FormControlLabel
				className="manual-stats-entry-switch"
				control={
					<Switch
						// checked={state.checkedA}
						// onChange={handleChange}
						name="checkedA"
					/>
				}
				label="MVP"
			/> */}

			{/* <Switch
				color="primary"
				className="manual-stats-entry-switch"
				value="checkedA"
				inputProps={{ "aria-label": "Switch A" }}
			/> */}

			<IconButton onClick={() => props.onDeleteClick(props.playerStats.id)}>
				<DeleteIcon style={{ fill: "#d0d2d6" }} />
			</IconButton>
		</div>
	)

	function onScoreChange(event: any) {
		const newValue = event.target.value
		setLocalPlayerStats({ ...localPlayerStats, Score: newValue })
		props.onValueChange(
			props.playerStats.id,
			nameof<ManualPlayerStatsEntry>("Score"),
			newValue
		)
	}

	function onGoalsChange(event: any) {
		const newValue = event.target.value
		setLocalPlayerStats({ ...localPlayerStats, Goals: newValue })
		props.onValueChange(
			props.playerStats.id,
			nameof<ManualPlayerStatsEntry>("Goals"),
			event.target.value
		)
	}

	function onAssistsChange(event: any) {
		const newValue = event.target.value
		setLocalPlayerStats({ ...localPlayerStats, Assists: newValue })
		props.onValueChange(
			props.playerStats.id,
			nameof<ManualPlayerStatsEntry>("Assists"),
			event.target.value
		)
	}

	function onSavesChange(event: any) {
		const newValue = event.target.value
		setLocalPlayerStats({ ...localPlayerStats, Saves: newValue })
		props.onValueChange(
			props.playerStats.id,
			nameof<ManualPlayerStatsEntry>("Saves"),
			event.target.value
		)
	}

	function onShotsChange(event: any) {
		const newValue = event.target.value
		setLocalPlayerStats({ ...localPlayerStats, Shots: newValue })
		props.onValueChange(
			props.playerStats.id,
			nameof<ManualPlayerStatsEntry>("Shots"),
			event.target.value
		)
	}

	// function doneTypingScore(newValue) {
	// 	props.onValueChange(
	// 		props.playerStats.id,
	// 		nameof<ManualPlayerStatsEntry>("Score"),
	// 		newValue
	// 	)
	// }
}

export default styled(React.memo(ManualStatsEntryItem))`
	margin-bottom: 25px;
	display: flex;
	height: 75px;
	background-color: #2a3045;
	border-radius: 10px;
	width: 100%;
	padding: 15px;

	.manual-stats-entry-field {
		width: 60px;
		margin-right: 50px;
		margin-top: auto;
		margin-bottom: auto;
	}
	.manual-stats-entry-switch {
		margin-top: auto;
		margin-bottom: auto;
	}
`
