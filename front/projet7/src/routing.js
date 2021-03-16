import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Main from "./components/mainPage/Main";
import Home from "./components/homepage/homepage";
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
			<Route path="/signup">
				<Main />
				<Signup />
			</Route>
			<Route path="/home">
				<Home />
			</Route>
		</Router>
	);
};

export default ReactRouterSetup;
