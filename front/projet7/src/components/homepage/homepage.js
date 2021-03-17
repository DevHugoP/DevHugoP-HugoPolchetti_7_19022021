import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";
import "./homepage.css";

const Home = () => {
	const [messages, setMessages] = useState([]);

	const getMessages = () => {
		axios.get("http://localhost:5000/api/messages").then(function (res) {
			const messages = res.data;
			console.log(res.data);
			setMessages(messages.messages);
		});
	};
	useEffect(() => {
		getMessages();
	}, []);

	return (
		<>
			<div className="hp_container1">
				<div className="backgroundPic2">
					<h1 className="hp_mainTitle"> Messages Recents </h1>
					<div className="homepage_container">
						{messages.map((message) => {
							return (
								<div className="hp_messagesBox">
									<div>
										{[message.User].map((user) => {
											return (
												<h4 key={user.id}>
													Nom d'utilisateur : {user.username}
												</h4>
											);
										})}
									</div>
									<h4> Titre : {message.title}</h4>
									<h4>{message.content}</h4>
									<h5>Created : {moment(message.createdAt).fromNow()}</h5>
									<h6>{message.attachement}</h6>
									<div className="hp_modifiers">
										<Link to={`./messages/${message.id}`}>Commentaires x</Link>
										<button>suprimer</button>
										<button>modifier</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
