var { User } = require("../models/models");
var { compareSync } = require("bcryptjs");
var { sign } = require("jsonwebtoken");

async function createToken(req, res, next) {
	try {
		let user = await User.findOne({ where: { username: req.fields.username } });
		
		if (!user) return res.status(401).end();
			
		if (!compareSync(req.fields.password, user.password))
			return res.status(401).end();
		
		let token = sign({
			data: user
		}, process.env.JWT_SECRET, { expiresIn: "1h" });

		res.json({
			userId: user.id,
			token,
			validUntil: Date.now() + (60*60*1000)
		});
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createToken
};
