import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";

const Home = () => {
	const [messages, setMessages] = useState([]);

	const getUsers = () => {
		axios.get("http://localhost:5000/api/messages").then(function (res) {
			const messages = res.data;
			console.log(res.data);
			setMessages(messages.messages);
		});
	};
	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			<h1> RECENT POST </h1>

			<ul>
				{messages.map((message) => {
					return (
						<li key={message.id}>
							{/* <h3>{console.log(message.User)}</h3> */}
							<h3> {message.title}</h3>
							<h4>{message.content}</h4>
							<h5>Created : {moment(message.createdAt).fromNow()}</h5>
							<h6>{message.attachement}</h6>

							<ul>
								{[message.User].map((user) => {
									return (
										<li>
											<h4 key={user.id}>{user.username}</h4>
											<h4>{user.password}</h4>
										</li>
									);
								})}
							</ul>
							<Link to="/comments/=?messagesID">Commenter</Link>
							<button>suprimer</button>
							<button>modifier</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Home;
