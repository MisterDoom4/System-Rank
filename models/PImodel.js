const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// PI Schema
const PISchema = new Schema({
  name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  genre: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  champion: {
    type: Boolean,
    default: false
  },
  main:{
    type: Boolean,
    default: false
  },
  points:{
    type: Number
  }
});
const tgSchema = new Schema({
  name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  champion: {
    type: Boolean,
    default: false
  },
  points:{
    type: Number
  },
  // participant :{
  //   type :[String]
  // }
  participant: [{name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },}],
});

// criar Modelo_PI baseado em PISchema: ‘PontosInteresse’->nome da // coleção
const PI = mongoose.model('Wrestlers', PISchema);
const TAG = mongoose.model('Tag', tgSchema);
// exportar Modelo_PI
module.exports = {PI, TAG};