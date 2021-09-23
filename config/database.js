var { Sequelize } = require("sequelize");
var sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./storage/database.sqlite3",
	logging: false
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection established");
	} catch (error) {
		console.error("Unable to connect", error);
	}
}

module.exports = {
	testConnection,
	sequelize
};
