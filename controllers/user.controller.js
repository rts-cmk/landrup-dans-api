var { User, Activity } = require("../models/models");
var { hashSync } = require("bcryptjs");

async function getSingleUser(req, res, next) {
	try {
		let user = await User.findByPk(parseInt(req.params.id), { include: [ Activity ] });
		user.getActivities();
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function createSingleUser(req, res, next) {
	try {
		let user = await User.create({
			username: req.fields.username,
			password: hashSync(req.fields.password, 15),
			firstname: req.fields.firstname,
			lastname: req.fields.lastname,
			age: req.fields.age,
			role: req.fields.role
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function addToActivity(req, res, next) {
	try {
		let activityInstance = await Activity.findByPk(req.params.classId);
		activityInstance.addUser(req.params.id);
		res.json(activityInstance);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function removeFromActivity(req, res, next) {
	try {
		let activityInstance = await Activity.findByPk(req.params.classId);
		activityInstance.removeUser(req.params.id);
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleUser,
	getSingleUser,
	addToActivity,
	removeFromActivity
};
