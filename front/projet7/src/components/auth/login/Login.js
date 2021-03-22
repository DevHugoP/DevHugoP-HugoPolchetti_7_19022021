import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import history from "../../../history";
import Main from "../../mainPage/Main";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			axios
				.post("http://localhost:5000/api/auth/login", { email, password })
				.then(function (res) {
					localStorage.setItem("Token", `Bearer ${res.data.token}`);
					console.log("you are connected");
					history.push("/home");
				});
		} else {
			console.log("il manque des informations");
		}
	};

	return (
		<>
			<Main />
			<div className="blockLogin">
				<div className="blockForm">
					<form className="formLogin" onSubmit={handleSubmit}>
						<div>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Adresse e-mail"
							/>
						</div>
						<div>
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Mot de passe"
							/>
						</div>
						<button className="loginBtn" type="submit">
							Connexion
						</button>
						<div className="sepLine"></div>
						<Link to="/signup" className="signupBtn">
							Créer un compte
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
