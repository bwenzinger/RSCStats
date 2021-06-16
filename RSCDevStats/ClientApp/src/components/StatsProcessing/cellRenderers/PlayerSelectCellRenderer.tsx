import React, { Component } from "react"
import styled from "styled-components"
import { atom, useRecoilState } from "recoil"
import { PlayerTrackerId } from "../../../models/PlayerTrackerId"
import { Autocomplete } from "@material-ui/lab"
import { TextField, withStyles } from "@material-ui/core"
import { ICellRendererParams } from "ag-grid-community"

interface PassedProps {
	className?: string
	value: PlayerTrackerId
}

type Props = PassedProps & ICellRendererParams

// const playerTrackerIdsState = atom<PlayerTrackerId[] | undefined>({
// 	key: "playerTrackerIds", // unique ID (with respect to other atoms/selectors)
// 	default: undefined, // default value (aka initial value)
// })

const uniquePlayerNamesState = atom<string[] | undefined>({
	key: "uniquePlayerNames", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})

// const customStyle = {
// 	root: {
// 		marginTop: "auto",
// 		marginBottom: "auto",
// 	},
// }

const renderInput = (params) => (
	<TextField
		{...params}
		variant="standard"
		// label="Select Player"
		// placeholder="Favorites"
	/>
)

export default (props: Props) => {
	// const [playerTrackerIds] = useRecoilState<PlayerTrackerId[] | undefined>(
	// 	playerTrackerIdsState
	// )

	const [uniquePlayerNames] = useRecoilState(uniquePlayerNamesState)

	const [playerValue] = React.useState<PlayerTrackerId>(props.value)

	return (
		<div style={{ paddingTop: "5px" }}>
			<Autocomplete
				fullWidth={true}
				size="small"
				className="manual-stats-entry-autocomplete"
				loading={uniquePlayerNames === undefined}
				options={uniquePlayerNames ?? []}
				value={playerValue?.Name}
				// getOptionLabel={getOptionLabel}
				renderInput={renderInput}
				onChange={onPlayerChange}
			/>
		</div>
	)

	function onPlayerChange(event: object, value: string | null, reason: string) {
		if (props.setValue) {
			props.setValue(value)
		}
	}
}
