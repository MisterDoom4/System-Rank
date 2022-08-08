const express = require ("express");
const router = express.Router();
// importa controlador
const indexController = require("../controllers/indexController");
// index-route (Home-page)
router.get("/", indexController.index);
// create-route
router.get("/editWrestler", indexController.editWrestler);
router.get("/editTag",indexController.editTag);
router.get("/list",indexController.list);
router.get("/match",indexController.match);
router.get("/matchTag",indexController.matchTag);
module.exports = router;