import React, { Component } from "react"
import styled from "styled-components"
import { atom, useRecoilState } from "recoil"
import { Autocomplete } from "@material-ui/lab"
import { TextField, withStyles } from "@material-ui/core"
import { ICellRendererParams } from "ag-grid-community"
import { PlayerDetails } from "../../../models/PlayerDetails"
import { PlayerDetailsState } from "../../../recoil/RscImportAtom"
// import { UniquePlayerNamesState } from "../../../recoil/RscImportAtom"

interface PassedProps {
	className?: string
	value: PlayerDetails
}

type Props = PassedProps & ICellRendererParams

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
	const [playerDetails] = useRecoilState(PlayerDetailsState)

	const [playerValue] = React.useState<PlayerDetails>(props.value)

	return (
		<div style={{ paddingTop: "5px" }}>
			<Autocomplete
				fullWidth={true}
				size="small"
				className="manual-stats-entry-autocomplete"
				loading={playerDetails === undefined}
				options={playerDetails ?? []}
				value={playerValue}
				// getOptionLabel={getOptionLabel}
				renderInput={renderInput}
				// onChange={onPlayerChange}
			/>
		</div>
	)

	// function onPlayerChange(event: object, value: string | null, reason: string) {
	// 	if (props.setValue) {
	// 		props.setValue(value)
	// 	}
	// }
}
