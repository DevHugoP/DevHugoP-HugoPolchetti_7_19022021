import React from "react";
import "./main.css";

const Main = () => {
	return (
		<>
			<div>
				<div className="backgroundPic"></div>
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
			</div>
		</>
	);
};

export default Main;
