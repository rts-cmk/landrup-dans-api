var router = require("express").Router();
var { readdir } = require("fs");
var { join } = require("path");
var { requestLogger } = require("./config/winston");

router.use(requestLogger);

readdir(join(__dirname, "routes"), routesIterator);

function routesIterator(err, files) {
	if (err) {
		throw err;
	}

	files.forEach(file => requireRoute(file));
}

function requireRoute(file) {
	require(join(__dirname, "routes", file))(router);
}

module.exports = router;
