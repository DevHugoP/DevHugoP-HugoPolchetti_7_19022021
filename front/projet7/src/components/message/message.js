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
			setMessages([
				res.data.id,
				res.data.title,
				res.data.content,
				res.data.attachement,
				res.data.userId,
				res.data.createdAt
			]);
			console.log(res.data.Comments);
			setComments(res.data.Comments);
			console.log(res.data.User);
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
					<h3>Titre : {messages[1]}</h3>
					<p>contenu : {messages[2]}</p>
					<p>Crée il y a : {moment(messages[5]).fromNow()}</p>
					<div className="commentsCard">
						<p>
							{comments.map((test) => {
								return (
									<div key={test.id}>
										<p>{test.content}</p>
									</div>
								);
							})}
						</p>
						{/* <p>{comments[0].content}</p>
						<p>{moment(comments[0].createdAt).fromNow()}</p> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Message;
