import React from "react";
import "./Signup.css";

const Signup = () => {
	return (
		<>
			<div>
				<div className="acceuilContainer">
					<div className="blockLogo">
						<div>
							<img
								src="images/icon-left-font-monochrome-black.png"
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
								Créer le compte
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
