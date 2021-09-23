const { sequelize } = require("../config/database");

async function getRoster(req, res, next) {
	try {
		var sql = `SELECT users.firstname AS firstname, users.lastname AS lastname, activities.name AS activity, activities.weekday AS weekday, activities.time AS time
		FROM roster
		INNER JOIN users
			ON roster.userId = users.id
		INNER JOiN activities
		 ON roster.activityId = activities.id
		WHERE activities.instructorId = ${req.params.userId} AND activities.id = ${req.params.activityId}`;

		var [results] = await sequelize.query(sql);
		res.json(results);
	} catch(error) {
		console.log(error);
		res.status(500).end();
	}
}

module.exports = {
	getRoster
};
