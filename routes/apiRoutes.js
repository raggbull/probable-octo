var db = require('../models');

module.exports = function (app) {

  // Delete an example by id
  app.delete('/api/examples/:id', function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // USER API CALLS
  app.get('/api/users', function (req, res) {
    db.User.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  app.get('/api/users/:id', function (req, res) {
    db.User.findById(req.params.id).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.post('/api/users', function (req, res) {
    // expects an object with properties 'name', 'email', 'bio'
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.delete('/api/users/:id', function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get('/api/users/:id/collections', function (req, res) {
    db.Collection
      .findAll({ where: { UserId: req.params.id } })
      .then(function (dbCollection) {
        res.json(dbCollection);
      });
  });

  // COLLECTIONS API CALLS
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

  app.post('/api/collections', function (req, res) {
    // expects an object with properties 'name', 'description', 'UserId'
    db.Collection.create(req.body).then(function (dbCollection) {
      res.json(dbCollection);
    });
  });

  app.get('/api/collections/:id/items', function (req, res) {
    db.Item
      .findAll({ where: { CollectionId: req.params.id } })
      .then(function (dbItem) {
        res.json(dbItem);
      });
  });

  app.delete('/api/collection/:id', function (req, res) {
    db.Collection.destroy({ where: { id: req.params.id } }).then(function (dbCollection) {
      res.json(dbCollection);
    });
  });

  // ITEMS API CALLSK
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

  app.post('/api/items', function (req, res) {
    // expects an object with properties 'name', 'imageUrl', 'description', 'UserId', 'CollectionId'
    db.Item.create(req.body).then(function (dbItem) {
      res.json(dbItem);
    });
  });

  app.delete('/api/items/:id', function (req, res) {
    db.Item.destroy({ where: { id: req.params.id } }).then(function (dbItem) {
      res.json(dbItem);
    });
  });

};
