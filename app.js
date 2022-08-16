// associar as dependências instaladas
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');


// configuração do db
const db = require('./config/database').mongoURI;
mongoose.connect(db,{useNewUrlParser: true})
.then(() => console.log('Connected to Database '+'test'))
.catch(err => console.log(err));

// inicializar app express
const app = express();

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

const routes = require('./routes/api');
const index = require('./routes/index');
app.use('/', index);
app.use('/api', routes);
  
app.use(function(err, req, res, next){
    console.log(err);
   res.status(422).send({error: err.message});
});

 //FIM MIDDLEWARE
 
let port = 5000;
 // servidor á escuta na porta 5000
 // 'process.env.port': caso usemos Heroku
app.listen(process.env.PORT || port, () =>{
   console.log('Servidor em execução no porto: '+ port);
 });