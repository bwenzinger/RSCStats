import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import BackendApi from "../BackendApi"
import { UserCredentialsState } from "../recoil/UserCredentialsAtom"
import CssTextField from "./common/CssTextField"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import { withRouter, RouteComponentProps } from "react-router-dom"

interface PassedProps {
	className?: string
}

type Props = PassedProps & RouteComponentProps

const backendApi = new BackendApi()

const LoginPage = (props: Props) => {
	const [username, setUsername] = React.useState<string>()
	const [password, setPassword] = React.useState<string>()

	const [loginFailed, setLoginFailed] = React.useState<boolean>(false)

	const [userCredentials, setUserCredentials] =
		useRecoilState(UserCredentialsState)

	// const { persistAtom } = recoilPersist({
	// 	key: 'recoil-persist', // this key is using to store data in local storage
	// 	storage: localStorage, // configurate which stroage will be used to store the data
	// })

	return (
		<div className={props.className + " Login"}>
			<div className="login-content-area material-drop-shadow">
				<Form>
					<FormGroup>
						<Label for="username">Username</Label>
						<Input name="username" id="username" onChange={onUsernameChange} />
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							onChange={onPasswordChange}
						/>
					</FormGroup>
					<Button
						className="submit-button action-button-color material-drop-shadow"
						onClick={tryLogin}
					>
						Login
					</Button>
				</Form>

				{loginFailed && <div>Login failed</div>}
			</div>
		</div>
	)

	function onUsernameChange(event: any) {
		setUsername(event.target.value)
	}
	function onPasswordChange(event: any) {
		setPassword(event.target.value)
	}

	function tryLogin() {
		// console.log(username)
		// console.log(password)

		const userPassEncoded = btoa(username + ":" + password)

		const authHeader = "Basic " + userPassEncoded

		backendApi.instance
			.get(`BallChasingApi/AuthCheck`, {
				headers: { Authorization: authHeader },
			})
			.then(function (response) {
				console.log(response)
				setUserCredentials(userPassEncoded)
				props.history.push("/stats-processing")
				// 				HttpCookie authCookie = new HttpCookie("authCookie", "cookieValue")
				// {
				//     Expires = DateTime.Now.AddDays(5)
				// };
				// handle success
			})
			.catch(function (error) {
				// handle error
				console.log(error)
				setLoginFailed(true)
			})
			.then(function () {
				// always executed
			})
	}
	// 	backendApi.instance
	// 		.post(`GoogleSheets/RefreshDatabaseFromSheets`, {}, { timeout: 0 })
	// 		.then(function (response) {
	// 			setIsRefreshingStats(false)
	// 			// handle success
	// 		})
	// 		.catch(function (error) {
	// 			// handle error
	// 			console.log(error)
	// 		})
	// 		.then(function () {
	// 			// always executed
	// 		})
	// }
}

const routedLoginPage = withRouter(LoginPage)

export default styled(routedLoginPage)`
	display: flex;
	height: calc(100% - 56px);

	.login-content-area {
		background-color: #2a3045;
		/* height: 350px; */
		width: 500px;
		margin: auto;
		border-radius: 20px;
		padding: 50px;
		/* padding-top: 50px;
		padding-left: 50px;
		padding-right: 50px; */
	}

	.submit-button {
		margin-top: 40px;
		width: 100%;
	}
`
