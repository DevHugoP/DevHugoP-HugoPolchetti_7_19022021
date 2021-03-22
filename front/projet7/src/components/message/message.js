import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";

const Message = () => {
	const [messages, setMessages] = useState([]);
	const [comments, setComments] = useState([]);
	const [users, setUsers] = useState([]);
	let urlMessages = window.location.href;
	let recupIdPage = urlMessages.split("messages/");

	const getMessageDetails = () => {
		axios.get(`http://localhost:5000/api/messages/${recupIdPage[1]}`).then(function (res) {
			console.log(res.data);
			setMessages(res.data);
			setComments(res.data.Comments);
			setUsers(res.data.User);
		});
	};
	useEffect(() => {
		getMessageDetails();
	}, []);

	return (
		<>
			<div className="messageContainer">
				<h1>Message + commentaires</h1>
				<div className="messageCard">
					<h3>Titre : {messages.title}</h3>
					<p>contenu : {messages.content}</p>
					<p>Crée il y a : {moment(messages.createdAt).fromNow()}</p>
					<div className="commentsCard">
						<div>
							{comments.map((comment) => {
								return (
									<div key={comment.id}>
										<p>{comment.content}</p>
									</div>
								);
							})}
						</div>
						{/* <p>{comments[0].content}</p>
						<p>{moment(comments[0].createdAt).fromNow()}</p> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Message;
