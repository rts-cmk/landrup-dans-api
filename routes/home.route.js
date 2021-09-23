var express = require("express");

module.exports = function(router) {
	router.use(express.static("docs"));
}
