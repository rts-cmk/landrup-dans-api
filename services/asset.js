var { readFileSync, writeFileSync } = require("fs");
var { join } = require("path");

function saveFile(file) {
	let tmpFile = readFileSync(file.path);
	let newFileName = Date.now() + file.name;
	let newFile = join(__dirname, "..", "assets", newFileName);
	writeFileSync(newFile, tmpFile);
	return newFileName;
}

module.exports = saveFile;
