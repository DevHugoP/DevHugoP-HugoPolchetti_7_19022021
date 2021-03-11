import React from "react";
import "./Login.css";

const Login = () => {
	return (
		<>
			<div className="blockLogin">
				<div className="blockForm">
					<form className="formLogin">
						<div>
							<input type="email" name="email" placeholder="Adresse e-mail" />
						</div>
						<div>
							<input type="password" name="password" placeholder="Mot de passe" />
						</div>
						<button className="loginBtn" type="submit">
							Connexion
						</button>
						<a href="#" className="lostPass">
							Mot de passe oublié ?
						</a>
						<div className="sepLine"></div>
						<button className="signupBtn">Créer un compte</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
