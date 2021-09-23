var { verify } = require("jsonwebtoken");
var { User } = require("../models/models");

function isAuthorized(req, res, next) {
	if (!req.headers.authorization)
		return res.status(401).end();

	if (req.headers.authorization.split(" ")[0] !== "Bearer")
		return res.status(403).end();

	if (!verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET))
		return res.status(403).end();

	next();
}

function isRelevantUser(req, res, next) {
	let reqId = req.params.id;
	let token = req.headers.authorization.split(" ")[1];
	let decodedToken = verify(token, process.env.JWT_SECRET);
	
	if (decodedToken.data.id !== parseInt(reqId)) return res.status(403).end();

	if (decodedToken.data.exp < Date.now()) return res.status(403).end();

	next();
}

async function isInstructor(req, res, next) {
	let reqId = req.params.id;
	let token = req.headers.authorization.split(" ")[1];
	let decodedToken = verify(token, process.env.JWT_SECRET);

	if (decodedToken.data.id !== parseInt(reqId)) return res.status(403).end();

	if (decodedToken.data.exp < Date.now()) return res.status(403).end();

	try {
		let user = await User.findByPk(parseInt(reqId));
		if (user.role !== "instructor") return res.status(403).end();
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}

	next();
}

module.exports = {
	isAuthorized,
	isRelevantUser,
	isInstructor
};
