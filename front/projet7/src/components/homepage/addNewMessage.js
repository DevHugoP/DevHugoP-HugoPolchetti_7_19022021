import axios from "axios";
import React from "react";
import { useState } from "react";
import "./addNewMessage.css";

const AddNewMessage = (props) => {
	let userId = props.currentUser;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	//récuperation de l'identité du user
	const handleSubmit = (e) => {
		e.preventDefault();

		if (title && content !== "") {
			axios
				.post("http://localhost:5000/api/messages", {
					userId,
					title,
					content
				})
				.then(function (res) {
					console.log(`message envoyé `);
					setTitle("");
					setContent("");
					alert("Message Envoyé");
					window.location.reload();
				});
		} else console.log("il manque des infos ");
	};

	return (
		<>
			<form className="formNewMessage1" onSubmit={handleSubmit}>
				<div>
					<input
						type="messageTitle"
						name="messageTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Titre du message"
						className="inputBlocTitle"
					/>
				</div>
				<div>
					<textarea
						type="text"
						name="messagecontent"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder=" Tapez votre message"
						className="inputBlocContent"
					/>
				</div>
				<button className="sendBtn" type="submit">
					Envoyer
				</button>
			</form>
		</>
	);
};

export default AddNewMessage;
