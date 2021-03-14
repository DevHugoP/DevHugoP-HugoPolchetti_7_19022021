import Login from "./components/auth/login/Login";
import Test from "./components/auth/login/Test";
import Signup from "./components/auth/signup/Signup";
import Main from "./components/mainPage/Main";
import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";

const ReactRouterSetup = () => {
	return (
		<Router history={history}>
			<Route path="/login">
				<Main />
				<Login />
			</Route>
			{/* <Route path="/test">
				<Test />
			</Route> */}
			<Route path="/signup">
				<Main />
				<Signup />
			</Route>
			<Route path="/signup">
				<Main />
				<Signup />
			</Route>
			<Route path="/test">
				<Test />
			</Route>
		</Router>
	);
};

export default ReactRouterSetup;
