import React from "react";
import axios from "axios";

export default class Test extends React.Component {
	componentDidMount() {
		axios.get(`http://localhost:5000/api/messages`).then((res) => {
			console.log(res.data.length);
			console.log(res.data);
			for (let i = 0; i < res.data.length; i++) {
				// console.log(res.data[i].content);
				// console.log(res.data[i].title);
				let messageContent = res.data[i].content;
				console.log(messageContent);
			}
			return <h2>swag</h2>;
		});
		axios
			.put(`http://localhost:5000/api/messages/7e9d6398-1276-4f71-b376-265f2cc9777d`, {
				content: "on test la methode put avec Axios depuis le front",
				likes: 2
			})
			.then((res) => {
				console.log(res.data);
			});
	}
}
