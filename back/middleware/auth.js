const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		console.log(req.body.userId);
		const token = req.headers.authorization.split(" ")[1];
		console.log(token);
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const userId = decodedToken.where.userId;
		let test = JSON.parse(userId);
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user ID";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!")
		});
	}
};
