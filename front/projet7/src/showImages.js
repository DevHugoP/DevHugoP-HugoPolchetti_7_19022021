import react from "react";

function ShowImages(props) {
	console.log(props.image);
	var preview = document.querySelector("img");
	var file = props.image;
	var reader = new FileReader();

	reader.addEventListener(
		"load",
		function () {
			preview.src = reader.result;
		},
		false
	);

	if (file) {
		reader.readAsDataURL(file);
	}
}

export default ShowImages;
