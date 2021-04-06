import axios from "axios";
import React from "react";
import { useState } from "react";
import "./addComments.css";

const AddComments = (props) => {
	let userId = props.userId;
	let messageId = props.messageId;
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (content !== "" && messageId !== "" && userId !== "") {
			axios
				.post("http://localhost:5000/api/comments", {
					userId: userId,
					messageId: messageId,
					content: content
				})
				.then(function (res) {
					console.log(`commentaire envoyé `);
					setContent("");
					alert("Commentaire Envoyé");
					window.location.reload();
				});
		} else console.log("il manque des infos ");
	};

	return (
		<>
			<form className="formNewMessage1" onSubmit={handleSubmit}>
				<div>
					<textarea
						type="text"
						name="commentcontent"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder=" Tapez votre commentaire"
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
