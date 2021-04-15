import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
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
					window.location.href = "http://localhost:3000/home";
				});
		} else {
			console.log("il manque des informations");
		}
	};

	return (
		<>
			<div className="backgroundPic"></div>
			<div className="container">
				<div className="logo_text">
					<img
						src="images/resize.png"
						alt="logo de Groupomania"
						className="logoPageAcceuil"
					/>
					<h2 className="acceuilTitle">
						Avec Groupomania, partagez et restez en contact avec vos collègues
					</h2>
				</div>
				<div className="blockForm">
					<form className="formLogin" onSubmit={handleSubmit}>
						<div>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Adresse e-mail"
								className="inputBloc"
							/>
						</div>
						<div>
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Mot de passe"
								className="inputBloc"
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
