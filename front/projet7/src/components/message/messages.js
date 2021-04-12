import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";
import AddComments from "./../comments/comments";
import "./messages.css";

const Message = () => {
	//récuperation de l'identité du user
	let token = localStorage.Token;
	let currentUser = localStorage.currentUser;
	let isAdmin = localStorage.userStatus;

	const [messages, setMessages] = useState([]);
	const [messageId, setMessageId] = useState("");
	const [user, setUser] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [comments, setComments] = useState([]);

	let urlMessages = window.location.href;
	let recupIdPage = urlMessages.split("messages/");

	const getMessageDetails = () => {
		axios
			.get(`http://localhost:5000/api/messages/${recupIdPage[1]}`, {
				headers: {
					Authorization: token
				},
				params: {
					currentUser
				}
			})
			.then(function (res) {
				console.log(res.data);
				setMessages(res.data);
				setUser(res.data.User.username);
				setTitle(res.data.title);
				setContent(res.data.content);
				setMessageId(res.data.id);
			});
	};

	const getCommentsDetails = () => {
		axios
			.get(`http://localhost:5000/api/comments/from/${recupIdPage[1]}`, {
				headers: {
					Authorization: token
				},
				params: {
					currentUser
				}
			})
			.then(function (res) {
				console.log(res.data);
				setComments(res.data);
			});
	};

	useEffect(() => {
		getMessageDetails();
		getCommentsDetails();
	}, []);

	const booleanSwitch = (varSwitch) => {
		if (varSwitch) {
			setShowCommentForm(false);
		} else setShowCommentForm(true);
	};

	const deleteMyComment = (id) => {
		axios
			.delete("http://localhost:5000/api/comments/" + `${id}`, {
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
				getMessageDetails();
				getCommentsDetails();
			});
	};

	return (
		<>
			<div>
				<div className="hp_container1">
					<div className="backgroundPic2">
						<h1 className="hp_mainTitle">Message </h1>

						<div className="createMessage">
							<button
								onClick={() => booleanSwitch(showCommentForm)}
								className="newBtn"
							>
								Nouveau commentaire
							</button>

							{showCommentForm ? (
								<AddComments messageId={messageId} currentUser={currentUser} />
							) : null}
						</div>
						<div className="homepage_container">
							<div className="hp_messagesBox">
								<div className="hp_blocText">
									<h5 className="hp_username">{user}</h5>
									<h5 className="hp_created">
										Created : {moment(messages.createdAt).fromNow()}
									</h5>
									<h2>{title}</h2>
									<div className="imgBox2">
										<img
											src={messages.attachement}
											className="oldImg"
											id="messageImg"
										></img>
									</div>
									<h4>{messages.content}</h4>
								</div>
							</div>
							<h3 className="commentsTitle">COMMENTAIRES</h3>
							<div className="commentsBox">
								{comments.map((comment) => {
									return (
										<div key={comment.id} className="comments">
											<h4 className="cmt_username">
												{comment.User.username}
											</h4>
											<h3>{comment.content}</h3>
											<h5 className="created">
												Created : {moment(comment.createdAt).fromNow()}
											</h5>
											<div>
												{isAdmin || comment.UserId == currentUser ? (
													<button
														className="cmt_deleteBtn"
														onClick={() => deleteMyComment(comment.id)}
													>
														Supprimer
													</button>
												) : null}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Message;
