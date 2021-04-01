import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";
import AddComments from "./../comments/comments";

const Message = () => {
	//récuperation de l'identité du user
	let userId = localStorage.currentUser;

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
		axios.get(`http://localhost:5000/api/messages/${recupIdPage[1]}`).then(function (res) {
			console.log(res.data);
			setMessages(res.data);
			setUser(res.data.User.username);
			setTitle(res.data.title);
			setContent(res.data.content);
			setMessageId(res.data.id);
			setComments(res.data.Comments);
		});
	};

	console.log(comments);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	axios
	// 		.post(`http://localhost:5000/api/comments/${recupIdPage[1]}`, {
	// 			messageId: messageId,
	// 			userId: userId,
	// 			content: content
	// 		})
	// 		.then(function (res) {
	// 			console.log(`commentaire envoyé `);
	// 			alert("commentaire envoyé");
	// 			window.location.href = "http://localhost:3000/home";
	// 			console.log(res);
	// 		});
	// };

	useEffect(() => {
		getMessageDetails();
	}, []);

	const booleanSwitch = (varSwitch) => {
		if (varSwitch) {
			setShowCommentForm(false);
		} else setShowCommentForm(true);
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
								<AddComments messageId={messageId} userId={userId} />
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

							<div className="CommentsBox">
								{comments.map((comment) => {
									return (
										<div key={comment.id} className="hp_messagesBox">
											<h3>{comment.content}</h3>
											<h5 className="hp_created">
												Created : {moment(comment.createdAt).fromNow()}
											</h5>
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
