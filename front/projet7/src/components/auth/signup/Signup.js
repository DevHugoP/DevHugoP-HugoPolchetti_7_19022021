import React from "react";
import "./Signup.css";

const Signup = () => {
	return (
		<>
			<div>
				<div className="blockForm">
					<form className="formLogin">
						<div>
							<input type="username" name="username" placeholder="SupermanxXx59000" />
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
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
