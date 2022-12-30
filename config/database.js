// variavel de acesso ao banco de dados
dbAcess = 'mongodb+srv://<dbuser>:'+ encodeURIComponent('<dbpassword>')+'@cluster0.2wi3voi.mongodb.net/<dbname>?retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbAcess
};