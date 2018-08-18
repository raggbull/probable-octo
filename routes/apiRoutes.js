var db = require('../models');

module.exports = function (app) {
  // Get all examples
  app.get('/api/examples', function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post('/api/examples', function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/examples/:id', function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.get('/api/users', function (req, res) {
    db.User.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  app.get('/api/users/:id', function (req, res) {
    db.User.findById(req.params.id).then( function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get('/api/collections', function (req, res) {
    db.Collection.findAll({}).then(function (dbCollections) {
      res.json(dbCollections);
    });
  });

  app.get('/api/collections/:id', function (req, res) {
    db.Collection.findById(req.params.id).then(function (dbCollection) {
      res.json(dbCollection);
    });
  });

  app.get('/api/items', function (req, res) {
    db.Item.findAll({}).then(function (dbItems) {
      res.json(dbItems);
    });
  });

  app.get('/api/items/:id', function (req, res) {
    db.Item.findById(req.params.id).then(function (dbItem) {
      res.json(dbItem);
    });
  });
};
