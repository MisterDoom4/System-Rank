const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController');

// entrar na pagina de criação de pessoa
router.get('/createPagWrestler',apiController.createPagWrestler);

// entrar na pagina de criação de tag
router.get('/createPagTag',apiController.createPagTag);

// listar todas as pessoas
router.get('/listAll',apiController.listAll);

// listar todas as tags
router.get('/listTags',apiController.listTag);

// listar por genero
router.get('/filterGenre/:genre',apiController.filterGenre);

// ordenar por genero
router.get('/sortGenre',apiController.sortGenre);

// listar pessoa(s) especifica(s)
router.get('/show',apiController.show);

// listar pela divisão e genero
router.get('/showRank',apiController.showRank);

// listar tag especifica
router.get('/showTag',apiController.showTag);

// listar pessoa por id para editar
router.get('/edit/:id',apiController.edit);

// listar tag por id para editar
router.get('/editTag/:id',apiController.editTag)

// adicionar pessoa
router.post('/add',apiController.add);

//  adicionar tag
router.post('/addTag',apiController.addTag);

// atualizar pessoa
router.post('/update/:id',apiController.update);

// atualizar tag
router.post('/updateTag/:id',apiController.updateTag);

// apagar pessoa
router.get('/delete/:id',apiController.delete);

// apagar tag
router.get('/deleteTag/:id',apiController.deleteTag);

// listar todos mas sem formatação
router.get('/list',apiController.list);

// listar tag especifica sem formatação pelo name
router.get('/showTag/:name',apiController.showTagByName);

// criar match
router.post('/match',apiController.match);

module.exports = router;