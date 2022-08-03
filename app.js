// associar as dependências instaladas
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
// inicializar app express
const app = express();
// define '/views/layout' como main-layout! (é renderizada na raiz)
app.use(expressLayouts);
app.set('view engine','ejs');
 
//middleware
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

 //FIM middleware
 
let port = 5000;
 // servidor á escuta no porto 5000
 // 'process.env.port': caso usemos Heroku
app.listen(process.env.port || port, () =>{
   console.log('Servidor em execução no porto: '+ port);
 });

mongoose.connect('mongodb+srv://MisterDoom4:Xtsm5KMvBWtBwfk@cluster0.2wi3voi.mongodb.net/AEW?retryWrites=true&w=majority');
  // Confirma ligação na consola
mongoose.connection.on('connected', function () {
console.log('Connected to Database '+'test');
});
  // Mensagem de Erro
mongoose.connection.on('error', (err) => {
console.log('Database error '+err);
});
