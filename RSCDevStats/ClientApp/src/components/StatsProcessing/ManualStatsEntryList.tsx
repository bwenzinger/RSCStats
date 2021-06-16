import React from "react"
import styled from "styled-components"
import ManualStatsEntryItem from "./ManualStatsEntryItem"
import { ManualPlayerStatsEntry } from "../../models/ManualPlayerStatsEntry"

interface Props {
	className?: string
	entries: ManualPlayerStatsEntry[]
	onDeleteClick: (id: string) => void
	onValueChange: (id: string, field: string, newValue: number) => void
}

const ManualStatsEntryList = (props: Props) => {
	// const [entries, setEntries] = React.useState<ManualEntry[]>([
	// 	{ Player: "test", Score: 1, Goals: 2 },
	// 	{ Player: "test", Score: 1, Goals: 2 },
	// ])
	// const [playerStatIds, setPlayerStatIds] = React.useState<string[]>([])

	// const playerStats = React.useRef<ManualPlayerStatsEntry[]>([])
	// const [entries, setEntries] = React.useState<ManualPlayerStatsEntry[]>([])

	React.useEffect(() => {
		console.log("mounted list")
	})

	return (
		<div className={props.className + " manual-stats-entry-list"}>
			{props.entries.map((entry) => (
				<ManualStatsEntryItem
					key={"manual-stats-entry-item-" + entry.id}
					playerStats={entry}
					onValueChange={props.onValueChange}
					// onValueChange={(id: string, field: string, newValue: number) => {
					// 	// playerStats.current[id][field] = newValue
					// 	// const playerStat = playerStats.current.find((x) => x.id === id)
					// 	// if (playerStat) {
					// 	// 	playerStat[field] = newValue
					// 	// }
					// 	const updatedEntries = produce(entries, (draftState) => {
					// 		let entry = draftState.find((x) => x.id === id)
					// 		if (entry) {
					// 			entry[field] = newValue
					// 		}
					// 	})
					// 	setEntries(updatedEntries)
					// }}
					onDeleteClick={props.onDeleteClick}
					// onDeleteClick={(id: string) => {
					// 	setEntries(entries.filter((x) => x.id !== id))
					// 	// setPlayerStatIds([...playerStatIds.filter((x) => x !== id)])
					// 	// playerStats.current = playerStats.current.filter((x) => x.id !== id)
					// }}
				/>
			))}
		</div>
	)
}

export default styled(React.memo(ManualStatsEntryList))``
