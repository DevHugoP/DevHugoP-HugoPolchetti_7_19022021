import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Test = () => {
	const [data, setData] = useState([]);
	axios.get(`http://localhost:5000/api/comments`).then((res) => {
		console.log(res.data.length);
		console.log(res.data);
		for (let i = 0; i < res.data.length; i++) {
			let messageContent = res.data[i].content;
			console.log(messageContent);
			setData(res.data[1].content);
		}
	});
	return (
		<>
			<h2> TITRE DE TEST {data} </h2>
		</>
	);
};

export default Test;
