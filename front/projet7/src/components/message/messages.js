import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import moment from "moment";

const Message = () => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	const [showBtn, setShowBtn] = useState();
	const [attachement, setAttachement] = useState(null);
	const [asChanged, setAsChanged] = useState(false);

	let urlMessages = window.location.href;
	let recupIdPage = urlMessages.split("messages/");

	const getMessageDetails = () => {
		axios.get(`http://localhost:5000/api/messages/${recupIdPage[1]}`).then(function (res) {
			console.log(res.data);
			setMessages(res.data);
			setUser(res.data.User.username);
			setTitle(res.data.title);
			setContent(res.data.content);
			if (res.data.attachement == null) {
				setShowBtn(false);
			} else {
				setShowBtn(true);
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (image !== "") {
			formData.append("image", image);
			formData.append("message", JSON.stringify({ title, content }));
		} else if (asChanged == true) {
			formData.append("message", JSON.stringify({ title, content, attachement }));
		} else {
			formData.append("message", JSON.stringify({ title, content }));
		}

		axios
			.put(`http://localhost:5000/api/messages/${recupIdPage[1]}`, formData)
			.then(function (res) {
				console.log(`message modifié `);
				alert("Message modifié");
				window.location.href = "http://localhost:3000/home";
				console.log(res);
			});
	};

	useEffect(() => {
		getMessageDetails();
	}, []);

	function changeImg() {
		var selectId = document.getElementById("messageImg");
		selectId.src = null;
		setAttachement(null);
		setAsChanged(true);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="hp_container1">
					<div className="backgroundPic2">
						<h1 className="hp_mainTitle">Message </h1>

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
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Message;
