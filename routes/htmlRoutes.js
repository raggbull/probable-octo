var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    db.Opportunity.findAll({
      include: [db.User]
    }).then(function(dbOpportunities) {
      var hbsObj = {
        opportunities: dbOpportunities
      };
      console.log(hbsObj.opportunities);
      res.render('index', hbsObj);
    });
  });

  // Load example page and pass in an example by id
  app.get('/opportunities/new', function(req, res) {
    res.render('add-opportunity');
  });

  // Load example page and pass in an example by id
  app.get('/collections', function(req, res) {
    db.Collection.findAll({
      include: [db.Item]
    }).then(function(dbCollections) {
      var hbsObj = {
        collections: dbCollections
      };
      res.render('collections', hbsObj);
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
