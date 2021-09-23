var winston = require("winston");
var expressWinston = require("express-winston");

var requestLogger = expressWinston.logger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.simple(),
	expressFormat: true,
	meta: false,
	colorize: true,
});

module.exports = {
	requestLogger
};
