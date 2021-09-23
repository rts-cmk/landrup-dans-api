var { createSingleAsset, getAllAssets, getSingleAsset } = require("../controllers/asset.controller");

module.exports = function(router) {
	router.post("/api/v1/assets", createSingleAsset);
	router.get("/api/v1/assets", getAllAssets);
	router.get("/api/v1/assets/:id", getSingleAsset);
};
