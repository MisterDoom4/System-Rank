const { PI, TAG } = require('../models/PImodel');

// entrar na pagina de criação de pessoa
exports.createPagWrestler = function (req, res, next) {
  res.render('WRESTLER', { erro: "" });
};

// entrar na pagina de criação de tag
exports.createPagTag = function (req, res, next) {
  res.render('TAG', { erro: "" });
};

// listar todas as pessoas
exports.listAll = function (req, res, next) {
  PI.find({}).sort({ name: 1 }).then(function (pi) {
    res.render('listPIs', { pis: pi });
  }).catch(next);
};

// listar todas as tags
exports.listAllTag = function (req, res, next) {
  TAG.find({}).then(function (pi) {
    res.render('listTAGS', { pis: pi });
  }).catch(next);
};

// filtrar por genero
exports.filterGenre = function (req, res, next) {
  PI.find({ genre: req.params.genre }).sort({ name: 1 }).then(function (pi) {
    res.render('listPIs', { pis: pi });
  }).catch(next);
};

// ordenar por genero
exports.sortGenre = function (req, res, next) {
  PI.find({}).sort({ genre: 1 }).then(function (pi) {
    res.render('listPIs', { pis: pi });
  }).catch(next);
};

// listar pessoa(s) especifica(s)
exports.show = function (req, res, next) {
  let nm = req.query.name;
  PI.find({ name: { $regex: nm } }).sort({ name: 1 }).then(function (pi) {
    res.render('listPIs', { pis: pi });
  }).catch(next);
};

// listar tags especificas
exports.showTag = function (req, res, next) {
  let nm = req.query.name;
  TAG.find({ name: { $regex: nm } }).sort({ name: 1 }).then(function (pi) {
    res.render('listTAGS', { pis: pi });
  }).catch(next);
};

//listar pela divisão e genero
exports.showRank = function (req, res, next) {
  PI.find({ main: req.query.main, genre: req.query.genre }).sort({ points: -1 }).then(function (pi) {
    res.render('rank', { pis: pi });
  }).catch(next);
};
//listar tag pelo genero
exports.showRankTag = function (req, res, next) {
  TAG.find({ genre: req.query.genre }).sort({ points: -1 }).then(function (pi) {
    res.render('rankTag', { pis: pi });
  }).catch(next);
};
// listar pessoa por id para editar
exports.edit = function (req, res, next) {
  PI.findOne({ _id: req.params.id }).then(function (pi) {
    res.render('editPI', { pi: pi });
  }).catch(next);
};

// listar tag por id para editar
exports.editTag = function (req, res, next) {
  TAG.findOne({ _id: req.params.id }).then(function (pi) {
    res.render('editTAG', { pi: pi });
  }).catch(next);
};

// adicionar pessoa
exports.add = function (req, res, next) {
  let nm = req.body.name;
  PI.find({ name: nm }).then(function (pi) {
    if (pi.length > 0) {
      res.render('WRESTLER', { erro: "ja cadastrado" });
    }
    else {
      PI.create(req.body).then(function (pi) {
        res.redirect('/api/listAll');
      })
    }
  }).catch(next);
};

// adicionar tag
exports.addTag = function (req, res, next) {
  let nm = req.body.name;
  let p1 = req.body.participant0;
  let p2 = req.body.participant1;
  let id;
  let id2;
  TAG.find({ name: nm }).then(function (pi) {
    if (pi.length > 0) {
      res.render('TAG', { erro: "Nome já cadastrado" });
    }
    else {
      TAG.find({ $or: [{ 'participant.name': p1 }, { 'participant.name': p2 }] }).then(function (pi) {
        if (pi.length > 0) {
          res.render('TAG', { erro: "Participante já tem Tag" });
        }
        else {
          PI.findOne({ name: p1 }).then(function (pi) {
            id = pi._id;
          }).then(function (p0) {
            PI.findOne({ name: p2 }).then(function (pi2) {
              id2 = pi2._id;
            }).then(function (pi3) {
              let data = {
                name: nm,
                participant: [{
                  _id: id,
                  name: p1
                },
                {
                  _id: id2,
                  name: p2
                }]
              };
              TAG.create(data).then(function (p4) {
                res.redirect('/api/listAllTags');
              })
            })
          }).catch(next);
        }
      })
    }
  }).catch(next);
};

// atualizar pessoa
exports.update = function (req, res, next) {
  let nm = req.body.name;
  PI.findOne({ _id: req.params.id }).then(function (pi) {
    if (pi.name == nm) {
      PI.findByIdAndUpdate({ _id: req.params.id },
        req.body).then(function () {
          PI.findOne({ _id: req.params.id }).then(function (pi) {
            res.redirect('/api/listAll');
          });
        })
    }
    else {
      PI.find({ name: nm }).then(function (pi2) {
        if (pi2.length > 0) {
          res.redirect('/api/edit/' + req.params.id);
        }
        else {
          TAG.updateOne({ 'participant.0.name': pi.name }, { $set: { 'participant.0.name': nm } }).then(function (pi0) {
            TAG.updateOne({ 'participant.1.name': pi.name }, { $set: { 'participant.1.name': nm } }).then(function (pi0) {
              PI.findByIdAndUpdate({ _id: req.params.id },
                req.body).then(function () {
                  PI.findOne({ _id: req.params.id }).then(function (pi) {
                    res.redirect('/api/listAll');
                  });
                })
            })
          })
        }
      })
    }
  }).catch(next);
};

// atualizar tag
exports.updateTag = function (req, res, next) {
  let nm = req.body.name;
  let p1 = req.body.participant0;
  let p2 = req.body.participant1;
  if (p1 == p2) {
    res.redirect('/api/editTag/' + req.params.id);
  }
  else {
    let id;
    let id2;
    TAG.findOne({ _id: req.params.id }).then(function (pi) {
      if (pi.name == nm) {
        if (pi.participant[0].name == p1 || pi.participant[1].name == p1) { // verificar se p1 está na dupla
          if (pi.participant[0].name == p2 || pi.participant[1].name == p2) { // verificar se p2 está na dupla
            let data = {
              name: nm,
              champion: req.body.champion,
              participant: [{
                name: p1
              },
              {
                name: p2
              }]
            };
            TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
              res.redirect('/api/showTag?name=' + nm);
            })
          }
          else { // se não está, verifica se p2 está em outra dupla
            TAG.find({ 'participant.name': p2 }).then(function (pi) {
              if (pi.length > 0) {
                res.redirect('/api/editTag/' + req.params.id);
              }
              else {
                PI.findOne({ name: p2 }).then(function (pi) {
                  id2 = pi._id;
                }).then(function () {
                  let data = {
                    name: nm,
                    champion: req.body.champion,
                    participant: [{
                      name: p1
                    },
                    {
                      _id: id2,
                      name: p2
                    }]
                  };
                  TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                    res.redirect('/api/showTag?name=' + nm);
                  })
                })
              }
            })
          }
        }
        else {
          TAG.find({ 'participant.name': p1 }).then(function (pi3) {
            if (pi3.length > 0) {
              res.redirect('/api/editTag/' + req.params.id);
            }
            else {
              if (pi.participant[0].name == p2 || pi.participant[1].name == p2) {
                PI.findOne({ name: p1 }).then(function (pi) {
                  id = pi._id;
                }).then(function () {
                  let data = {
                    name: nm,
                    champion: req.body.champion,
                    participant: [{
                      _id: id,
                      name: p1
                    },
                    {
                      name: p2
                    }]
                  };
                  TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                    res.redirect('/api/showTag?name=' + nm);
                  })
                })
              }
              else {
                PI.findOne({ name: p1 }).then(function (pi) {
                  id = pi._id;
                }).then(function () {
                  TAG.find({ 'participant.name': p2 }).then(function (pi) {
                    if (pi.length > 0) {
                      res.redirect('/api/editTag/' + req.params.id);
                    }
                    else {
                      PI.findOne({ name: p2 }).then(function (pi) {
                        id2 = pi._id;
                      }).then(function () {
                        let data = {
                          name: nm,
                          champion: req.body.champion,
                          participant: [{
                            _id: id,
                            name: p1
                          },
                          {
                            _id: id2,
                            name: p2
                          }]
                        };
                        TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                          res.redirect('/api/showTag?name=' + nm);
                        })
                      })
                    }
                  })
                })
              }
            }
          })
        }
      }
      else {
        TAG.find({ name: nm }).then(function (pi2) {
          if (pi2.length > 0) {
            res.redirect('/api/editTag/' + req.params.id);
          }
          else {
            if (pi.participant[0].name == p1 || pi.participant[1].name == p1) { // verificar se p1 está na dupla
              if (pi.participant[0].name == p2 || pi.participant[1].name == p2) { // verificar se p2 está na dupla
                let data = {
                  name: nm,
                  champion: req.body.champion,
                  participant: [{
                    name: p1
                  },
                  {
                    name: p2
                  }]
                };
                TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                  res.redirect('/api/showTag?name=' + nm);
                })
              }
              else { // se não está, verifica se p2 está em outra dupla
                TAG.find({ 'participant.name': p2 }).then(function (pi) {
                  if (pi.length > 0) {
                    res.redirect('/api/editTag/' + req.params.id);
                  }
                  else {
                    PI.findOne({ name: p2 }).then(function (pi) {
                      id2 = pi._id;
                    }).then(function () {
                      let data = {
                        name: nm,
                        champion: req.body.champion,
                        participant: [{
                          name: p1
                        },
                        {
                          _id: id2,
                          name: p2
                        }]
                      };
                      TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                        res.redirect('/api/showTag?name=' + nm);
                      })
                    })
                  }
                })
              }
            }
            else {
              TAG.find({ 'participant.name': p1 }).then(function (pi3) {
                if (pi3.length > 0) {
                  res.redirect('/api/editTag/' + req.params.id);
                }
                else {
                  if (pi.participant[0].name == p2 || pi.participant[1].name == p2) {
                    PI.findOne({ name: p1 }).then(function (pi) {
                      id = pi._id;
                    }).then(function () {
                      let data = {
                        name: nm,
                        champion: req.body.champion,
                        participant: [{
                          _id: id,
                          name: p1
                        },
                        {
                          name: p2
                        }]
                      };
                      TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                        res.redirect('/api/showTag?name=' + nm);
                      })
                    })
                  }
                  else {
                    PI.findOne({ name: p1 }).then(function (pi) {
                      id = pi._id;
                    }).then(function () {
                      TAG.find({ 'participant.name': p2 }).then(function (pi) {
                        if (pi.length > 0) {
                          res.redirect('/api/editTag/' + req.params.id);
                        }
                        else {
                          PI.findOne({ name: p2 }).then(function (pi) {
                            id2 = pi._id;
                          }).then(function () {
                            let data = {
                              name: nm,
                              champion: req.body.champion,
                              participant: [{
                                _id: id,
                                name: p1
                              },
                              {
                                _id: id2,
                                name: p2
                              }]
                            };
                            TAG.findByIdAndUpdate({ _id: req.params.id }, data).then(function () {
                              res.redirect('/api/showTag?name=' + nm);
                            })
                          })
                        }
                      })
                    })
                  }
                }
              })
            }
          }
        })
      }
    }).catch(next);
  }
};

// apagar pessoa
exports.delete = function (req, res, next) {
  PI.findOneAndDelete({ _id: req.params.id }).then(function (pi) {
    TAG.findOneAndDelete({ 'participant._id': req.params.id }).then(function (p2) {
      res.redirect('/api/listAll');
    })
  }).catch(next);
};

// apagar tag
exports.deleteTag = function (req, res, next) {
  TAG.findOneAndDelete({ _id: req.params.id }).then(function (pi) {
    res.redirect('/api/listAllTags');
  }).catch(next);
};

// listar todas as pessoas mas sem formatação
exports.list = function (req, res, next) {
  PI.find({}).sort({ name: 1 }).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

//listar tag especifica sem formatação pelo name
exports.showTagByName = function (req, res, next) {
  TAG.find({ name: req.params.name }).then(function (pi) {
    res.send(pi);
  }).catch(next);
};

// criar match
exports.match = function (req, res, next) {
  let win;
  let los;
  PI.findOne({ name: req.body.winner }).then(function (pi) {
    win = pi;
    PI.findOne({ name: req.body.loser }).then(function (pi) {
      los = pi;
      if (los == null) {
        win.points++;
        PI.findByIdAndUpdate(win._id, { points: win.points }).then(function (pi) {
          res.redirect('/match');
        })
      }
      else {
        if (win.genre == los.genre) {
          if (req.body.champion) {
            if (win.champion) {
              PI.findByIdAndUpdate(los._id, { points: 0 }).then(function (pi) {
                res.redirect('/match');
              })
            }
            if (los.champion) {
              PI.findByIdAndUpdate(los._id, { champion: false }).then(function (pi) {
                PI.findByIdAndUpdate(win._id, { champion: true, points: 0 }).then(function (pi) {
                  res.redirect('/match');
                })
              })
            }
            else {
              res.redirect('/match');
            }
          }
          else {
            if (req.body.event) {
              los.points -= 3;
              win.points += 4;
              PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                  res.redirect('/match');
                })
              })
            }
            else {
              if (win.main && los.main) {
                if (win.points == los.points) {
                  los.points--;
                  win.points += 2;
                  PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                    PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                      res.redirect('/match');
                    })
                  })
                }
                if (win.points > los.points) {
                  los.points--;
                  win.points++;
                  PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                    PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                      res.redirect('/match');
                    })
                  })
                }
                else {
                  los.points -= 2;
                  win.points += 3;
                  PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                    PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                      res.redirect('/match');
                    })
                  })
                }
              }
              else {
                if (win.main) {
                  los.points--;
                  win.points++;
                  PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                    PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                      res.redirect('/match');
                    })
                  })
                }
                if (los.main) {
                  los.points -= 2;
                  win.points += 3;
                  PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                    PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                      res.redirect('/match');
                    })
                  })
                }
                else {
                  if (win.points == los.points) {
                    los.points--;
                    win.points += 2;
                    PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                      PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                        res.redirect('/match');
                      })
                    })
                  }
                  if (win.points > los.points) {
                    los.points--;
                    win.points++;
                    PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                      PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                        res.redirect('/match');
                      })
                    })
                  }
                  else {
                    los.points -= 2;
                    win.points += 3;
                    PI.findByIdAndUpdate(los._id, { points: los.points }).then(function (pi) {
                      PI.findByIdAndUpdate(win._id, { points: win.points }).then(function () {
                        res.redirect('/match');
                      })
                    })
                  }
                }
              }
            }
          }
        }
        else {
          res.redirect('/match');
        }
      }
    })
  }).catch(next);
};