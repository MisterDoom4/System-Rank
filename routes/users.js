const express = require ('express');
const router = express.Router();
// importa controlador
const usersController = require('../controllers/usersController');
// Login Page
router.get('/login', usersController.GETlogin);
router.post('/login', usersController.POSTlogin);
// Register Page
router.get('/register', usersController.GETregister);
// registo na BD
router.post('/register', usersController.POSTregister);
module.exports = router;