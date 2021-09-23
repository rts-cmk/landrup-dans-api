var { DataTypes, Model } = require("sequelize");
var { sequelize } = require("../config/database");

class Activity extends Model {};
class User extends Model {};
class Asset extends Model {};

Activity.init({
	name: DataTypes.TEXT,
	description: DataTypes.TEXT,
	weekday: DataTypes.TEXT,
	time: DataTypes.TEXT,
	maxParticipants: DataTypes.INTEGER,
	minAge: DataTypes.INTEGER,
	maxAge: DataTypes.INTEGER
}, { sequelize, modelName: "activity" });

User.init({
	username: DataTypes.TEXT,
	password: DataTypes.TEXT,
	firstname: DataTypes.TEXT,
	lastname: DataTypes.TEXT,
	age: DataTypes.INTEGER,
	role: DataTypes.TEXT
}, { sequelize, modelName: "user" });

Asset.init({
	url: DataTypes.TEXT
}, { sequelize, modelName: "asset" });

User.belongsToMany(Activity, { through: "roster" });
Activity.belongsToMany(User, { through: "roster" });

Activity.belongsTo(User, { foreignKey: "instructorId" });
User.hasOne(Activity, { foreignKey: "instructorId" });

Activity.belongsTo(Asset, { foreignKey: "assetId" });
Asset.hasOne(Activity, { foreignKey: "assetId" });

sequelize.sync({ force: false })
	.then(function() {
		console.log("Tabels created");
	})
	.catch(function(error) {
		console.error(error);
	});

module.exports = {
	Activity,
	User,
	Asset
};
