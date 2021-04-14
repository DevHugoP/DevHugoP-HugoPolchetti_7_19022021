//Pages
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/homepage/homepage";
import ModifyMessage from "./components/message/modifyMessage";
import Message from "./components/message/messages";

//TOOLS
import AuthRoute from "./components/auth/AuthRoute";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

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
		console.log(decodedToken);
		localStorage.setItem("currentUser", decodedToken.where.userId);
	} else {
		localStorage.clear();
	}

	let currentUser = localStorage.currentUser;
	const [userIsAdmin, setUserIsAdmin] = useState();

	if (currentUser) {
		axios.get("http://localhost:5000/api/auth/user/" + `${currentUser}`).then(function (res) {
			if (res.data.isAdmin == true) {
				setUserIsAdmin(true);
				localStorage.setItem("userStatus", userIsAdmin);
			}
		});
	}

	return (
		<Router history={history}>
			<Route exact path="/" component={Login} authenticated={authenticated}></Route>
			<Route exact path="/login" component={Login} authenticated={authenticated}></Route>
			<Route exact path="/signup" component={Signup} authenticated={authenticated}></Route>
			<AuthRoute
				exact
				path="/home"
				component={Home}
				authenticated={authenticated}
			></AuthRoute>
			<AuthRoute
				path="/messages"
				component={Message}
				authenticated={authenticated}
			></AuthRoute>
			<AuthRoute
				path="/modifyMessage"
				component={ModifyMessage}
				authenticated={authenticated}
			></AuthRoute>
		</Router>
	);
};

export default ReactRouterSetup;
