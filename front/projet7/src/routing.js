import Login from "./components/auth/login/Login";
import Test from "./components/auth/login/Test";
import Signup from "./components/auth/signup/Signup";
import Main from "./components/mainPage/Main";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ReactRouterSetup = () => {
	return (
		<Router>
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
