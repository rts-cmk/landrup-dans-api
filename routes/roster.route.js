var { getRoster } = require("../controllers/roster.controller");
var { isAuthorized, isInstructor} = require("../middleware/auth");

module.exports = function(router) {
	router.get("/api/v1/users/:userId/roster/:activityId", isAuthorized, getRoster);
};
