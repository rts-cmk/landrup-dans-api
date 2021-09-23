var { static } = require("express");

module.exports = function(router) {
	router.use("/file-bucket", static("assets"));
};
