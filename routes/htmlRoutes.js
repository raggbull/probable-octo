var db = require('../models');

module.exports = function (app) {
  app.get('/login', function(req, res) {
    res.render('login');
  });
  app.get('/register', function(req, res) {
    res.render('register');
  });
  // Load index page
  app.get('/', function (req, res) {
    db.Opportunity.findAll({
      include: [db.User]
    }).then(function (dbOpportunities) {
      db.User.findAll({}).then(function (dbUsers) {
        db.Opportunity.findAll({limit: 5}).then(function(dbRecentOp) {
          var hbsObj = {
            opportunities: dbOpportunities,
            recentOpportunities: dbRecentOp,
            users: dbUsers
          };
          console.log(hbsObj);
          res.render('index', hbsObj);
        });
      });
    });
  });

  // Load example page and pass in an example by id
  app.get('/opportunities/new', function (req, res) {
    res.render('add-opportunity');
  });

  // Load example page and pass in an example by id
  app.get('/collections', function (req, res) {
    db.Collection.findAll({
      include: [db.Item]
    }).then(function (dbCollections) {
      var hbsObj = {
        collections: dbCollections
      };
      res.render('collections', hbsObj);
    });
  });
  // details route to get the 'selected' opportunity and display more details
  app.get('/opportunity/:id', function (req, res) {
    db.Opportunity.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbApply) {
      db.Collection.findAll({}).then(function (dbCollections) {
        var hbsObj = {
          opportunity: dbApply,
          collections: dbCollections
        };
        console.log(hbsObj);
        res.render('opportunity-details', hbsObj);
      });
    });
  });
  // apply route to get the 'selected' opportunity and 'your' collections
  app.get('/opportunity/:id/apply', function (req, res) {
    db.Opportunity.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbApply) {
      db.Collection.findAll({}).then(function (dbCollections) {
        var hbsObj = {
          opportunity: dbApply,
          collections: dbCollections
        };
        console.log(hbsObj);
        res.render('apply', hbsObj);
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404');
  });
};
