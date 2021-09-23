var { Asset } = require("../models/models");
var saveFile = require("../services/asset");

async function createSingleAsset(req, res, next) {
	try {
		let file = saveFile(req.files.file);
		let asset = await Asset.create({
			url: "http://localhost:4000/file-bucket/" + file
		});
		res.json(asset);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getAllAssets(req, res, next) {
	try {
		let assets = await Asset.findAll();
		res.json(assets);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getSingleAsset(req, res, next) {
	try {
		let asset = await Asset.findByPk(req.params.id);
		res.json(asset);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleAsset,
	getAllAssets,
	getSingleAsset
};
