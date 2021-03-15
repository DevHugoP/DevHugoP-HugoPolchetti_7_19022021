import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import history from "../../../history";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password && username) {
			axios
				.post("http://localhost:5000/api/auth/signup", {
					username,
					email,
					password,
					isAdmin: 0
				})
				.then(function (res) {
					console.log(res);
					console.log(`bienvenue ${username}`);
					history.push("/home");
				});
			setEmail("");
			setPassword("");
			setUsername("");
		} else {
			console.log("il manque des informations");
		}
	};

	return (
		<>
			<div>
				<div className="blockForm">
					<form className="formLogin" onSubmit={handleSubmit}>
						<div>
							<input
								type="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Pseudo"
							/>
						</div>
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
							Créer le compte
						</button>
						<div className="sepLine"></div>
						<Link to="/login" className="signupBtn">
							Déjà inscrit
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
