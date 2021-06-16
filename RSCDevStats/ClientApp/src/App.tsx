import React, { Component } from "react"
import { RecoilRoot } from "recoil"

import "./custom.css"
import SignInWrapper from "./components/SignInWrapper"
import "./styles/ag-grid/material.scss"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import type from "@material-ui/lab/themeAugmentation" //dont delete

const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			"@global": {
				html: {
					WebkitFontSmoothing: "auto",
				},
			},
		},
		MuiInputBase: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiFormLabel: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiIconButton: {
			root: {
				color: "#d0d2d6",
			},
		},
		MuiInput: {
			underline: {
				color: "#d0d2d6",
			},
		},
		MuiPaper: {
			root: {
				backgroundColor: "#2a3045",
				color: "#d0d2d6",
			},
		},
		MuiSwitch: {
			colorSecondary: {
				color: "#7267e9",
				"&$checked": {
					color: "#7267e9",
				},
				"&$checked + $track": {
					backgroundColor: "#7267e9",
				},
			},
		},
		// MuiAutocomplete: {
		// 	popper: {
		// 		color: "green",
		// 	},
		// },
	},
})

export default class App extends Component {
	static displayName = App.name

	render() {
		return (
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<SignInWrapper />
				</ThemeProvider>
			</RecoilRoot>
			// <Layout>
			// 	<Route exact path="/" component={Home} />
			// 	<Route path="/upload" component={ReplayUpload} />
			// 	<Route path="/statsstuff" component={StatsCongregate} />
			// 	{/* <Route path="/fetch-data" component={FetchData} /> */}
			// </Layout>
		)
	}
}
