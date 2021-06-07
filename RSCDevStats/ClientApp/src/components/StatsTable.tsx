import React, { useState } from "react"
// import "./App.css"
import styled from "styled-components"
import { AgGridReact } from "ag-grid-react"
import { GridOptions } from "ag-grid-community"
import WeeklyCumulativeStatsTableColDefs from "../models/WeeklyCumulativeStatsTableColDefs"
import { CumulativePlayerStats } from "../models/CumulativePlayerStats"
// import App from "./App"

interface PassedProps {
	className?: string
	playerStats: CumulativePlayerStats[]
}

const StatsTable = (props: PassedProps) => {
	const [gridOptions] = useState<GridOptions>({})

	return (
		<div
			className={props.className + " ag-theme-material"}
			style={{ height: "200px", width: "600px" }}
		>
			<AgGridReact
				gridOptions={gridOptions}
				columnDefs={WeeklyCumulativeStatsTableColDefs}
				rowData={props.playerStats}
			/>
		</div>
	)
}

export default styled(StatsTable)``
