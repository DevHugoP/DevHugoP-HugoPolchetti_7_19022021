import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
	return (
		<>
			<div>
				<div className="blockForm">
					<form className="formLogin">
						<div>
							<input type="username" name="username" placeholder="Pseudo" />
						</div>
						<div>
							<input type="email" name="email" placeholder="Adresse e-mail" />
						</div>
						<div>
							<input type="password" name="password" placeholder="Mot de passe" />
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
