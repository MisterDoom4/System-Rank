// variavel de acesso ao banco de dados

const dbAcess = process.env.MONGO_USER + encodeURIComponent(process.env.MONGO_PASS) + process.env.MONGO_DB;
console.log(dbAcess);
module.exports = {
    mongoURI: dbAcess
};
