import axios from "axios";
import React from "react";
import { useState } from "react";
import "./addComments.css";

const AddComments = (props) => {
	let urlMessages = window.location.href;
	let recupIdPage = urlMessages.split("messages/");
	let userId = props.currentUser;
	let messageId = recupIdPage[1];
	console.log(recupIdPage);
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title && content !== "") {
			axios
				.post("http://localhost:5000/api/comments", {
					userId: userId,
					messageId: messageId,
					content: content
				})
				.then(function (res) {
					console.log(`commentaire envoyé `);
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

export default AddComments;
