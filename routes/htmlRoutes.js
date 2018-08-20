var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render('index', {
        msg: 'Welcome!',
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get('/add/opportunity', function(req, res) {
    res.render('add-opportunity');
  });

  // Load example page and pass in an example by id
  app.get('/collections', function(req, res) {
    res.render('collections');
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
