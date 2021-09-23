var { createToken } = require("../controllers/token.controller");

module.exports = function(router) {
	router.post("/auth/token", createToken);
};
