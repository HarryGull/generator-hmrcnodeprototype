module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('start');
    });

   app.get('/first', function (req, res) {
      res.render('first');
    });

   app.post('/first', function(req, res){
        res.redirect(301, 'first');
    });

    app.post('/summary', function(req, res){
        res.redirect(301, 'summary');
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });

    // add your routes here

  }
};
