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
			setMessages(messages);
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
					const { id, title, content, createdAt, likes, attachement } = message;
					return (
						<li key={id}>
							<h3> {title}</h3>
							<h4>{content}</h4>
							<h5>Created : {moment(createdAt).fromNow()}</h5>
							<h6>like : {likes}</h6>
							<h6>{attachement}</h6>
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
