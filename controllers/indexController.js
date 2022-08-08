// exporta f.teste, chamada em /routes/index
exports.index = function (req, res) {
    res.render('welcome');
  };
  // página 'create'
exports.editWrestler = function (req, res) {
   //res.render('WRESTLER',{erro : ""});
   res.redirect('/api/listAll');
  };
exports.editTag = function(req,res){
  res.redirect('/api/listTags');
  };
  exports.list = function(req, res){
    res.render('listPIs');
  };
  exports.match = function(req,res){
    res.render('match');
  }
  exports.matchTag = function(req,res){
    res.redirect('matchTag');
  }
