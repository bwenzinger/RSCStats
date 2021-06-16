import React from "react"
import { ICellRendererParams } from "ag-grid-community"
import StyledCheckbox from "../../StyledCheckbox"

interface PassedProps {
	className?: string
	field: string
}

type Props = PassedProps & ICellRendererParams

export default (props: Props) => {
	return <StyledCheckbox onChange={onCheckboxChange} />

	function onCheckboxChange(event: object, checked: boolean) {
		if (props.setValue) {
			props.setValue(checked)
		}
	}
}
