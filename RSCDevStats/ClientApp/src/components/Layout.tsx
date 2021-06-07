import React, { Component } from "react"
import styled from "styled-components"
import { NavMenu } from "./NavMenu"

type Props = {
	className?: string
}

class Layout extends Component<Props> {
	static displayName = Layout.name

	render() {
		return (
			<div className={this.props.className}>
				<NavMenu />
				{this.props.children}
			</div>
		)
	}
}

export default styled(Layout)`
	height: calc(
		100% - 82px
	); //82px is the height of the navmenu + margin for page
`
