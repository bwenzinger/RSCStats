import React, { Component } from "react"
import {
	Collapse,
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
} from "reactstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"

type State = {
	collapsed: boolean
}
type Props = {
	className?: string
}

class NavMenu extends Component<Props, State> {
	static displayName = NavMenu.name

	// constructor(props: any) {
	// 	super(props)

	// 	// this.toggleNavbar = this.toggleNavbar.bind(this)
	// 	// this.state = {
	// 	// 	collapsed: true,
	// 	// }
	// }

	// toggleNavbar() {
	// 	this.setState({
	// 		collapsed: !this.state.collapsed,
	// 	})
	// }

	render() {
		return (
			/* <Navbar
					color="dark"
					className="navbar-expand-sm navbar-toggleable-sm ng-dark box-shadow"
					dark={true}
					style={{ backgroundColor: "#f1f1f1" }}
				> */
			<div
				className={
					this.props.className + " navmenu-navbar material-drop-shadow"
				}
			>
				{/* <Container> */}
				{/* <NavbarBrand className="navmenu-brand" tag={Link} to="/">
						RSCStats
					</NavbarBrand> */}
				<NavLink tag={Link} className="navmenu-brand" to="/">
					RSC Stats
				</NavLink>
				{/* <div className="navmenu-brand2">RSCStats</div> */}
				{/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" /> */}
				{/* <Collapse
							className="d-sm-inline-flex flex-sm-row-reverse"
							isOpen={!this.state.collapsed}
							navbar
						> */}
				{/* <ul className="navbar-nav flex-grow"> */}
				{/* <NavItem> */}
				{/* <NavLink tag={Link} className="navmenu-navlink" to="/">
					Home
				</NavLink> */}
				{/* </NavItem>
						<NavItem> */}
				<NavLink tag={Link} className="navmenu-navlink" to="/upload">
					Replay Upload
				</NavLink>
				{/* </NavItem>
						<NavItem> */}
				<NavLink tag={Link} className="navmenu-navlink" to="/statsstuff">
					Stats Processing
				</NavLink>
				{/* </NavItem>
						<NavItem> */}
				<NavLink tag={Link} className="navmenu-navlink" to="/viewstats">
					View Stats
				</NavLink>
				<NavLink tag={Link} className="navmenu-navlink" to="/standings">
					Standings & Results
				</NavLink>
				{/* </NavItem> */}
				{/* </ul> */}
				{/* </Container> */}
			</div>
			/* </Collapse> */
			/* </Navbar> */
		)
	}
}

export default styled(NavMenu)`
	/* background-color: #171d30; */
	background-color: #2a3045;
	color: #fff;
	display: flex;
	flex-direction: row;
	padding-left: 25%;
	height: 56px;
	margin-left: 100px;
	margin-right: 100px;
	border-radius: 0px 0px 10px 10px;

	.navmenu-brand {
		margin-top: auto;
		margin-bottom: auto;
		color: #d0d2d6;
	}

	.navmenu-navlink {
		margin-top: auto;
		margin-bottom: auto;
		color: #d0d2d6;
		:hover {
			color: #54596a;
		}
	}
	.navmenu-brand {
		margin-right: 25%;
	}
`
