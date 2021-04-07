import React from "react";

export default function LogInfos() {
	const deconnexion = () => {
		localStorage.clear();
		window.location.href = "http://localhost:3000/login";
	};

	const deleteAccount = (userId) => {
		axios.delete("http://localhost:5000/api/auth/user/" + `${userId}`).then(function (res) {
			console.log("compte supprimé");
			window.location.href = "http://localhost:3000/signup";
		});
	};
	return (
		<div>
			<div>
				<h4>{username}</h4>
				<button onClick={() => deleteAccount()}> Supprimer le compte </button>
			</div>

			<button className="logOutBtn" onClick={() => deconnexion()}>
				Deconnexion
			</button>
		</div>
	);
}
