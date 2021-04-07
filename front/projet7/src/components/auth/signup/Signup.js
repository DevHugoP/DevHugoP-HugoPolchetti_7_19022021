import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import history from "../../../history";
import Main from "../../mainPage/Main";
import jwtDecode from "jwt-decode";
const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password === confirmPassword && username) {
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
					console.log(res.data.token);
					localStorage.setItem("Token", `Bearer ${res.data.token}`);
					const token = localStorage.Token;
					if (token) {
						const decodedToken = jwtDecode(token);
						console.log(decodedToken);
						localStorage.setItem("currentUser", decodedToken.where.userId);
					} else {
					}
					window.location.href = "http://localhost:3000/home";
				});
		} else if (password !== confirmPassword && password !== "" && confirmPassword !== "") {
			console.log("les mots de passe ne sont pas identiques ");
		} else {
			console.log("il manque des informations ");
		}
	};

	return (
		<>
			<Main></Main>
			<div>
				<div className="blockForm2">
					<form className="formLogin2" onSubmit={handleSubmit}>
						<div>
							<input
								type="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Pseudo"
								className="inputBloc"
							/>
						</div>
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
						<div>
							<input
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder=" Confirmer Mot de passe"
								className="inputBloc"
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
