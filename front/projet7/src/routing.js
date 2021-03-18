import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Main from "./components/mainPage/Main";
import Home from "./components/homepage/homepage";
import Message from "./components/message/message";
import AuthRoute from "./components/auth/AuthRoute";
import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import jwtDecode from "jwt-decode";

let authenticated;
const token = localStorage.Token;
if (token) {
	const decodedToken = jwtDecode(token);
	console.log(new Date(decodedToken.exp * 1000));
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = "/login";
		authenticated = false;
	} else {
		authenticated = true;
	}
}
const ReactRouterSetup = () => {
	return (
		<Router history={history}>
			<Route exact path="/">
				<Main />
				<Login />
			</Route>
			<AuthRoute path="/login" component={(Main, Login)} authenticated={authenticated}>
				<Main />
				<Login />
			</AuthRoute>
			<AuthRoute path="/signup" component={(Main, Signup)} authenticated={authenticated}>
				<Main />
				<Signup />
			</AuthRoute>
			<AuthRoute path="/home" component={Home} authenticated={authenticated}>
				<Home />
			</AuthRoute>
			<AuthRoute path="/messages" component={Message} authenticated={authenticated}>
				<Message />
			</AuthRoute>
		</Router>
	);
};

export default ReactRouterSetup;

// {`/messages/${message.id}`}
