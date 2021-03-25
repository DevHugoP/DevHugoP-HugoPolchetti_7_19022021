import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";
import "./homepage.css";
import AddnewMessage from "./addNewMessage";

const Home = () => {
	//récuperation de l'identité du user
	let currentUser = localStorage.currentUser;

	const [messages, setMessages] = useState([]);
	const [showNewMessageForm, setShowNewMessageForm] = useState(false);

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

	const deleteMyMessage = (id) => {
		axios.delete("http://localhost:5000/api/messages/" + `${id}`).then(function (res) {
			console.log("suppression réussie");
			alert("suppression réussie");
			getMessages();
		});
	};

	const booleanSwitch = () => {
		if (showNewMessageForm) {
			setShowNewMessageForm(false);
		} else setShowNewMessageForm(true);
	};

	const deconnexion = () => {
		localStorage.clear();
		window.location.href = "http://localhost:3000/login";
	};

	return (
		<>
			<div className="hp_container1">
				<div className="backgroundPic2">
					<button className="logOutBtn" onClick={() => deconnexion()}>
						Deconnexion
					</button>
					<h1 className="hp_mainTitle"> Messages Recents </h1>
					<div className="createMessage">
						<button onClick={() => booleanSwitch()} className="newBtn">
							Créer un nouveau message
						</button>
						{showNewMessageForm ? <AddnewMessage currentUser={currentUser} /> : null}
					</div>
					<div className="homepage_container">
						{messages.map((message) => {
							return (
								<div className="hp_messagesBox" key={message.id}>
									{[message.User].map((user) => {
										return (
											<div key={user.id} className="hp_blocText">
												<h4 className="hp_username"> {user.username}</h4>
												<div className="hp_midContentBox">
													<h4 className="hp_title">{message.title}</h4>
													<h4 className="hp_content">
														{message.content}
													</h4>
												</div>

												<h5>
													Created : {moment(message.createdAt).fromNow()}
												</h5>
												<h6>{message.attachement}</h6>
												<div className="hp_modifiers">
													<button className="hp_linkCommentsBtn">
														<Link
															to={`./messages/${message.id}`}
															className="hp_linkComments"
														>
															Commenter {message.Comments.length}
														</Link>
													</button>

													{user.id == currentUser ? (
														<button
															className="hp_deleteBtn"
															onClick={() =>
																deleteMyMessage(message.id)
															}
														>
															supprimer
														</button>
													) : null}
													{user.id == currentUser ? (
														<button className="hp_modifyBtn">
															<Link
																to={`./modifyMessage/${message.id}`}
																className="hp_linkComments"
															>
																Modifier
															</Link>
														</button>
													) : null}
												</div>
											</div>
										);
									})}
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
