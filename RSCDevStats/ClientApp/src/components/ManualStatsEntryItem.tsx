import React from "react"
import styled from "styled-components"

interface Props {
	className?: string
}

const ManualStatsEntryItem = (props: Props) => {
	return (
		<div
			className={
				props.className + " manual-stats-entry-item material-drop-shadow"
			}
		>
			test
		</div>
	)
}

export default styled(ManualStatsEntryItem)`
	/* margin: 25px; */
	margin-bottom: 25px;
	display: flex;
	height: 150px;
	background-color: #2a3045;
	border-radius: 10px;
	width: 100%;
	padding: 15px;
`
