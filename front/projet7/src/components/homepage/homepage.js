import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./homepage.css";
import AddnewMessage from "./addNewMessage";
import LogInfos from "./logInfos";

const Home = () => {
	//récuperation de l'identité du user
	let currentUser = localStorage.currentUser;
	let isAdmin = localStorage.userStatus;
	let token = localStorage.Token;

	const [messages, setMessages] = useState([]);
	const [showNewMessageForm, setShowNewMessageForm] = useState(false);

	const getMessages = () => {
		axios
			.get("http://localhost:5000/api/messages", {
				headers: {
					Authorization: token
				},
				params: {
					currentUser
				}
			})
			.then(function (res) {
				const messages = res.data;
				console.log(res.data);
				setMessages(messages.messages);
			});
	};

	useEffect(() => {
		getMessages();
	}, []);

	const deleteMyMessage = (id) => {
		axios
			.delete("http://localhost:5000/api/messages/" + `${id}`, {
				headers: {
					Authorization: token
				},
				params: {
					currentUser
				}
			})
			.then(function (res) {
				console.log("suppression réussie");
				alert("suppression réussie");
				getMessages();
			});
	};

	const booleanSwitch = (varSwitch) => {
		if (varSwitch) {
			setShowNewMessageForm(false);
		} else setShowNewMessageForm(true);
	};

	return (
		<>
			<div className="hp_container1">
				<div className="backgroundPic2">
					<LogInfos currentUser={currentUser} />
					<h1 className="hp_mainTitle"> Messages Recents </h1>
					<div className="createMessage">
						<button
							onClick={() => booleanSwitch(showNewMessageForm)}
							className="newBtn"
						>
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
												<h5 className="hp_created">
													Created : {moment(message.createdAt).fromNow()}
												</h5>

												<div className="hp_midContentBox">
													<h3 className="hp_title">{message.title}</h3>
													<div className="hp_imageBox">
														<img
															src={message.attachement}
															className="hp_img"
														></img>
													</div>
													<h4 className="hp_content">
														{message.content}
													</h4>
												</div>

												<div className="hp_modifiers">
													<button className="hp_linkCommentsBtn">
														<Link
															to={`./messages/${message.id}`}
															className="hp_linkComments"
														>
															Commenter {message.Comments.length}
														</Link>
													</button>

													{isAdmin || user.id == currentUser ? (
														<button
															className="hp_deleteBtn"
															onClick={() =>
																deleteMyMessage(message.id)
															}
														>
															Supprimer
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
