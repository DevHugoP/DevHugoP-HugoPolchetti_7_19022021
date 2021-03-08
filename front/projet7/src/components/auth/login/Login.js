import React from "react";
import "./Login.css";

const Login = () => {
	return (
		<>
			<div>
				<img src="./images/mac.jpg" className="backgroundPic" />
				<div className="acceuilContainer">
					<div className="blockLogo">
						<div>
							<img
								src="images/resize.png"
								alt="logo de Groupomania"
								className="logoPageAcceuil"
							/>
							<h2 className="acceuilTitle">
								Avec Groupomania, partagez et restez en contact avec vos collègues
							</h2>
						</div>
					</div>
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
			</div>
		</>
	);
};

export default Login;
