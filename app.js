// associar as dependências instaladas
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


// configuração do db
const db = require('./config/database').mongoURI;
mongoose.connect(db,{useNewUrlParser: true})
.then(() => console.log('Connected to Database '+'test'))
.catch(err => console.log(err));

// inicializar app express
const app = express();

require('./config/passport')(passport);

// define '/views/layout' como main-layout! (é renderizada na raiz)
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(function(req,res,next){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin,X-Request-With, Content-Type, Accept');
   next();
})
 

//MIDDLEWARE
// todo o url começado por ‘/api’ chama as rotas em ‘./routes/api’
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables middleware
app.use(function(req, res, next) {
   // ‘res.locals’->é a forma de criar variáveis ou funções globais
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   // passport tem as suas próprias flash-msgs
   // que passa em ‘flash(‘error’)’, assim faço overwrite
   res.locals.error = req.flash('error');
   next();
 });

const api = require('./routes/api');
const users = require('./routes/users');
const index = require('./routes/index');
app.use('/', index);
app.use('/api', api);
app.use('/users',users);
 //FIM MIDDLEWARE
 
let port = 5000;
 // servidor á escuta na porta 5000
 // 'process.env.port': caso usemos Heroku
app.listen(process.env.PORT || port, () =>{
   console.log('Servidor em execução no porto: '+ port);
 });