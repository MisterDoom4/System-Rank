const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController');

// listar tag especifica sem formatação pelo name
router.get('/showTag/:name',apiController.showTagByName);

// listar todos mas sem formatação
router.get('/getAll',apiController.list);

// listar todos as tags  mas sem formatação
router.get('/getAllTag',apiController.listTag);

// listar top 5 junto com o campeao sem formatar
router.get('/top5',apiController.top5);

// listar top 5 junto com o campeao sem formatar
router.get('/top5Tag',apiController.top5Tag);

// listar os campeoes sem formatar
router.get('/champions',apiController.champion);

// listar os campeoes tag sem formatar
router.get('/championsTag',apiController.championTag);

module.exports = router;