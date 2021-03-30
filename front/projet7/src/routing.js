//Pages
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/homepage/homepage";
import ModifyMessage from "./components/message/modifyMessage";

//TOOLS
import AuthRoute from "./components/auth/AuthRoute";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import jwtDecode from "jwt-decode";

const ReactRouterSetup = () => {
	//logique AUTHENFICATION// permet de rediriger l'utilisateur si il clique sur login ou signup en etant co ou le rediriger vers les pages de connexions lorsque son token expire
	let authenticated;
	const token = localStorage.Token;
	if (token) {
		const decodedToken = jwtDecode(token);
		console.log(new Date(decodedToken.exp * 1000), decodedToken.where.userId);
		if (decodedToken.exp * 1000 < Date.now()) {
			localStorage.clear();
			window.location.href = "/login";
			authenticated = false;
		} else {
			authenticated = true;
		}
	}

	// Ici on va stocker l'identité du user grace au token qui nous donne le userId afin de donner certaines permissions
	if (token) {
		const decodedToken = jwtDecode(token);
		localStorage.setItem("currentUser", decodedToken.where.userId);
	}
	return (
		<Router history={history}>
			<AuthRoute
				exact
				path="/login"
				component={Login}
				authenticated={authenticated}
			></AuthRoute>
			<AuthRoute
				exact
				path="/signup"
				component={Signup}
				authenticated={authenticated}
			></AuthRoute>
			<Route exact path="/home" component={Home}></Route>
			<Route path="/modifyMessage" component={ModifyMessage}></Route>
		</Router>
	);
};

export default ReactRouterSetup;
