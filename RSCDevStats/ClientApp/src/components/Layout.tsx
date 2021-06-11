import React, { Component } from "react"
import styled from "styled-components"
import NavMenu from "./NavMenu"

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
	height: 100%;
	background-color: #171d30;
	color: #d0d2d6;
	/* background-color: #343a40; */
	/* height: calc(
		100% - 56px
	); //56px is the height of the navmenu + margin for page */
`
