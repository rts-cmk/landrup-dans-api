var { createSingleActivity, getSingleActivity, getAllActivities } = require("../controllers/activity.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/activities", createSingleActivity);
	router.get("/api/v1/activities/:id", getSingleActivity);
	router.get("/api/v1/activities", getAllActivities);
};
