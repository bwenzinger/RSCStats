import React from "react"
import { NavLink } from "reactstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { UserCredentialsState } from "../recoil/UserCredentialsAtom"
import { useRecoilState } from "recoil"

interface PassedProps {
	className?: string
}

// type State = {
// 	collapsed: boolean
// }
// type Props = {
// 	className?: string
// }

const NavMenu = (props: PassedProps) => {
	// static displayName = NavMenu.name

	const [userCredentials] = useRecoilState(UserCredentialsState)

	return (
		<div className={props.className + " navmenu-navbar material-drop-shadow"}>
			<NavLink tag={Link} className="navmenu-brand" to="/">
				RSC Stats
			</NavLink>
			{/* <NavLink tag={Link} className="navmenu-navlink" to="/upload">
				Replay Upload
			</NavLink> */}
			{userCredentials && (
				<NavLink tag={Link} className="navmenu-navlink" to="/stats-processing">
					Stats Admin
				</NavLink>
			)}
			<NavLink tag={Link} className="navmenu-navlink" to="/playerstats">
				Player Stats
			</NavLink>
			<NavLink tag={Link} className="navmenu-navlink" to="/standings">
				Standings & Results
			</NavLink>
			{!userCredentials && (
				<NavLink tag={Link} className="navmenu-navlink" to="/login">
					Admin Login
				</NavLink>
			)}
		</div>
	)
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
