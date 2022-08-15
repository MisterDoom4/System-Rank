// exporta f.teste, chamada em /routes/index
exports.index = function (req, res) {
    res.render('welcome');
  };
  // exports.list = function(req, res){
  //   res.render('listPIs');
  // };
  exports.match = function(req,res){
    res.render('match');
  }
  exports.matchTag = function(req,res){
    res.redirect('matchTag');
  }
