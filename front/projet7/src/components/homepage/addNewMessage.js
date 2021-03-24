import axios from "axios";
import React from "react";
import { useState } from "react";

const AddNewMessage = () => {
	const [userId, setUserId] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:5000/api/auth/messages", {
				userId,
				title,
				content
			})
			.then(function (res) {
				console.log(res);
				console.log(res.data.token);
			});
	};

	return (
		<>
			<form className="formNewMessage" onSubmit={handleSubmit}>
				<div>
					<input
						type="hidden"
						name="userId"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="messageTitle"
						name="messageTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="messageTitle"
					/>
				</div>
				<div>
					<input
						type="messagecontent"
						name="messagecontent"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder=" Messagecontent"
					/>
				</div>
				<button className="sendMessage" type="submit">
					Envoyer le message
				</button>
			</form>
		</>
	);
};

export default AddNewMessage;
