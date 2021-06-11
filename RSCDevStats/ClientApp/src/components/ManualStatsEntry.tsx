import React from "react"
import styled from "styled-components"
import ManualStatsEntryItem from "./ManualStatsEntryItem"
import { Autocomplete } from "@material-ui/lab"
import { TextField } from "@material-ui/core"
import { PlayerTrackerId } from "../models/PlayerTrackerId"
import { atom, useRecoilState } from "recoil"

interface Props {
	className?: string
}

interface ManualEntry {
	Player: string
	Score: number
	Goals: number
}

const playerTrackerIdsState = atom<PlayerTrackerId[] | undefined>({
	key: "playerTrackerIds", // unique ID (with respect to other atoms/selectors)
	default: undefined, // default value (aka initial value)
})

// const top100Films = [
// 	{ title: "The Shawshank Redemption", year: 1994 },
// 	{ title: "The Godfather", year: 1972 },
// 	{ title: "The Godfather: Part II", year: 1974 },
// ]

const ManualStatsEntry = (props: Props) => {
	const [entries, setEntries] = React.useState<ManualEntry[]>([
		{ Player: "test", Score: 1, Goals: 2 },
		{ Player: "test", Score: 1, Goals: 2 },
	])

	const [playerTrackerIds] = useRecoilState(playerTrackerIdsState)

	return (
		<div className={props.className + " manual-stats-entry"}>
			<Autocomplete
				className="manual-stats-entry-autocomplete"
				loading={playerTrackerIds === undefined}
				options={playerTrackerIds ?? []}
				getOptionLabel={(option) => {
					return option.Name
				}}
				// defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="limitTags"
						placeholder="Favorites"
					/>
				)}
			/>
			{entries.map((entry) => (
				<ManualStatsEntryItem />
			))}
		</div>
	)
}

export default styled(ManualStatsEntry)`
	margin: 25px;
	margin-right: 100px;
	display: flex;
	height: calc(100% - 50px);
	display: flex;
	flex-direction: column;
	width: 100%;

	.manual-stats-entry-autocomplete {
		color: orange;
	}
`
