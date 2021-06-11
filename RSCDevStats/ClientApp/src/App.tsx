import React, { Component } from "react"
// import { Route } from "react-router"
// import { Layout } from "./components/Layout"
// import { Home } from "./components/Home"
import { RecoilRoot } from "recoil"

import "./custom.css"
// import ReplayUpload from "./components/ReplayUpload"
// import StatsCongregate from "./components/StatsCongregate"
import SignInWrapper from "./components/SignInWrapper"
import "./styles/ag-grid/material.scss"

export default class App extends Component {
	static displayName = App.name

	render() {
		return (
			<RecoilRoot>
				<SignInWrapper />
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
