const express = require ("express");
const router = express.Router();
// importa controlador
const indexController = require("../controllers/indexController");
// importa a propriedade do objeto anónimo de '../config/auth'
const { ensureAuthenticated } = require('../config/auth');

// index-route (Home-page)
router.get("/", indexController.index);

//pagina inicial
router.get('/login',indexController.login);

// entrar na pagina da match
router.get("/pagmatch",ensureAuthenticated,indexController.pagmatch);

// entrar na pagina da match tag
router.get("/pagmatchTag",ensureAuthenticated,indexController.pagmatchTag);

// entrar na pagina de criação de pessoa
router.get('/createPagWrestler',ensureAuthenticated, indexController.createPagWrestler);

// entrar na pagina de criação de tag
router.get('/createPagTag',ensureAuthenticated, indexController.createPagTag);

// listar todas as pessoas
router.get('/listAll',indexController.listAll);

// listar todas as pessoas
router.get('/listAllROH',indexController.listAllROH);

// listar todas as tags
router.get('/listAllTags',indexController.listAllTag);

//listar por nome
router.get('/list',indexController.search)

//listar por nome tag
router.get('/listTag',indexController.searchTag)

// listar por genero
router.get('/listGenre/:genre',indexController.listGenre);

//listar tag por genero
router.get('/listTagGenre/:genre',indexController.listTagGenre);

// mostrar pessoa especifica
router.get('/show',indexController.show);

// mostrar tag especifica
router.get('/showTag',indexController.showTag);

// listar pela divisão e genero
router.get('/showRank',indexController.showRank);

// listar tag pelo genero
router.get('/showRankTag',indexController.showRankTag);

// adicionar pessoa
router.post('/add',ensureAuthenticated,indexController.add);

//  adicionar tag
router.post('/addTag',ensureAuthenticated,indexController.addTag);

// listar pessoa por id para editar
router.get('/edit/:id',ensureAuthenticated,indexController.edit);

// listar tag por id para editar
router.get('/editTag/:id',ensureAuthenticated,indexController.editTag)

// atualizar pessoa
router.post('/update/:id',ensureAuthenticated,indexController.update);

// atualizar tag
router.post('/updateTag/:id',ensureAuthenticated,indexController.updateTag);

// apagar pessoa
router.get('/delete/:id',ensureAuthenticated, indexController.delete);

// apagar tag
router.get('/deleteTag/:id',ensureAuthenticated, indexController.deleteTag);

// criar match
router.post('/match',ensureAuthenticated, indexController.match);

// criar match do tag
router.post('/matchTag',ensureAuthenticated, indexController.matchTag);

//resetar pontos
router.post('/reset',ensureAuthenticated,indexController.reset);

module.exports = router;