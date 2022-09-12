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
router.get('/listAllTags',apiController.listAllTag);

// listar por genero
router.get('/listGenre/:genre',apiController.listGenre);

//listar tag por genero
router.get('/listTagGenre/:genre',apiController.listTagGenre);

// listar pessoa(s) especifica(s)
router.get('/show',apiController.show);

// listar tag especifica
router.get('/showTag',apiController.showTag);

// listar pela divisão e genero
router.get('/showRank',apiController.showRank);

// listar tag pelo genero
router.get('/showRankTag',apiController.showRankTag);

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

// listar todos as tags  mas sem formatação
router.get('/listTag',apiController.listTag);

// listar tag especifica sem formatação pelo name
router.get('/showTag/:name',apiController.showTagByName);

// criar match
router.post('/match',apiController.match);

// criar match do tag
router.post('/matchTag',apiController.matchTag);

// listar top 5 junto com o campeao sem formatar
router.get('/top5',apiController.top5);

// listar top 5 junto com o campeao sem formatar
router.get('/top5Tag',apiController.top5Tag);

//resetar pontos
router.post('/reset',apiController.reset);


module.exports = router;