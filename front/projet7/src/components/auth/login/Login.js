import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [people, setPeople] = useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			const user = { email, password };
			setPeople((people) => {
				return [...people, user];
			});
			// axios.get("http://localhost:5000/api/messages").then((res) => {
			// 	console.log(res);
			// });
			axios
				.post("http://localhost:5000/api/auth/login", { email, password })
				.then(function (res) {
					console.log(res);
					console.log("you are connected");
				});
			setEmail("");
			setPassword("");
		} else {
			console.log("il manque des informations");
		}
	};

	return (
		<>
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
