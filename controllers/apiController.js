const { PI, TAG } = require('../models/PImodel');

//listar tag especifica sem formatação pelo name
exports.showTagByName = function (req, res, next) {
  TAG.find({ name: req.params.name }).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// listar todas as pessoas mas sem formatação
exports.list = function (req, res, next) {
  PI.find({company: "AEW"}).sort({ name: 1 }).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// listar todas as tags mas sem formatação
exports.listTag = function (req, res, next) {
  TAG.find({}).sort({ name: 1 }).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// listar top 5 junto com o campeao sem formatar
exports.top5 = function (req, res, next) {
  PI.find({ main: req.query.main, genre: req.query.genre, company: "AEW" }).sort({ champion: -1, points: -1 }).limit(6).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// listar top 5 de Tag junto com o campeao sem formatar
exports.top5Tag = function (req, res, next) {
  TAG.find({ genre: req.query.genre }).sort({ champion: -1, points: -1 }).limit(6).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// listar os campeoes sem formatar
exports.champion = function (req, res, next) {
  PI.find({ champion: true }).sort({ genre: -1, main: -1 }).then(function (pi) {
    res.send(pi);
  }).catch(next);
}

// listar os campeoes tag sem formatar
exports.championTag = function (req, res, next) {
  TAG.find({ champion: true }).sort({ genre: -1 }).then(function (pi) {
    res.send(pi);
  }).catch(next);
}