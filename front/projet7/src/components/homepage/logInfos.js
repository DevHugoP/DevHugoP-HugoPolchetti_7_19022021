import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./loginfos.css";

export default function LogInfos(props) {
	let token = localStorage.Token;
	console.log(props);
	const deconnexion = () => {
		localStorage.clear();
		window.location.href = "http://localhost:3000/login";
	};

	let currentUser = props.currentUser;
	console.log(currentUser);

	const [username, setUser] = useState();

	const getUser = () => {
		axios.get("http://localhost:5000/api/auth/user/" + `${currentUser}`).then(function (res) {
			console.log(res.data);
			setUser(res.data.username);
		});
	};

	const deleteAccount = () => {
		axios
			.delete("http://localhost:5000/api/auth/user/" + `${currentUser}`, {
				headers: {
					Authorization: token
				},
				params: {
					currentUser
				}
			})
			.then(function (res) {
				console.log(res);
			});
		localStorage.clear();
		window.location.href = "http://localhost:3000/signup";
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div>
			<div className="headerBox">
				<div className="logBox">
					<h4 className="username"> Bonjour {username}</h4>
					<button onClick={() => deleteAccount()} className="btnDelete">
						Supprimer le compte
					</button>
				</div>
				<img src="images/resize.png" className="logo"></img>

				<button className="logOutBtn" onClick={() => deconnexion()}>
					Deconnexion
				</button>
			</div>
		</div>
	);
}
